import prisma from '@/lib/prisma/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (session) {
        try {
            const body = await req.json();
            const {bankId, name, balance, currency} = body;
            const existingAccount = await prisma.account.findFirst({
                where: {
                    name,
                    userId: session.user.id,
                },
            });

            if (existingAccount) {
                return NextResponse.json({bank: null, message: 'Account with such a name already exists in this bank.'}, {status: 409})
            }

            const newAccount = await prisma.account.create({
                data: {
                    name,
                    currencyId: currency,
                    bankId,
                    userId: session.user.id
                }
            });

            if (newAccount) {
                await prisma.accountBalance.create({
                   data: {
                       balance,
                       accountId: newAccount.id,
                   }
                });
            }

            return NextResponse.json({account: newAccount, message: 'Account created successfully!'}, {status: 201});
        } catch (error) {
            console.log(error)
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