import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (session) {
        try {
            const currencies = await prisma.currency.findMany();
            return NextResponse.json({currencies}, {status: 200});
        } catch (error) {
            return NextResponse.json({message: 'Something went wrong!'}, {status: 500});
        }
    }
}