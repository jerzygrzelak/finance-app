import prisma from '@/lib/prisma/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (session) {
        try {
            const body = await req.json();
            const {name} = body;
            const existingBank = await prisma.bank.findFirst({
                where: {
                    name,
                    userId: session.user.id,
                },
            });

            if (existingBank) {
                return NextResponse.json({bank: null, message: 'Bank with such a name already exists.'}, {status: 409})
            }

            const newBank = await prisma.bank.create({
                data: {
                    name,
                    userId: session.user.id
                }
            });

            return NextResponse.json({bank: newBank, message: 'Bank created successfully!'}, {status: 201});
        } catch (error) {
            return NextResponse.json({message: 'Something went wrong!'}, {status: 500});
        }
    }
}

export async function GET() {
    const session = await getServerSession(authOptions);
    if (session) {
        try {
            const banks = await prisma.bank.findMany({
                where: {
                    userId: session.user.id,
                },
            });
            return NextResponse.json({banks: banks}, {status: 200});
        } catch (error) {
            return NextResponse.json({message: 'Something went wrong!'}, {status: 500});
        }
    }
}