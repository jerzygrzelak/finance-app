import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (session) {
        try {
            const body = await req.json();
            const { bankId, name, balance, currency } = body;
            const existingTrip = await prisma.trip.findFirst({
                where: {
                    name,
                    userId: session.user.id,
                },
            });

            if (existingTrip) {
                return NextResponse.json(
                    {
                        trip: null,
                        message: 'Trip with such a name already exists.',
                    },
                    { status: 409 },
                );
            }

            const newTrip = await prisma.trip.create({
                data: {
                    name,
                    currencyId: currency,
                    bankId,
                    userId: session.user.id,
                },
            });
            // console.log(newTrip);
            // if (newTrip) {
            //     await prisma.trip.create({
            //         data: {
            //             balance,
            //             accountId: newAccount.id,
            //         }
            //     });
            // }

            return NextResponse.json(
                { trip: newTrip, message: 'Srip created successfully!' },
                { status: 201 },
            );
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error }, { status: 500 });
        }
    }
}

export async function GET() {
    const session = await getServerSession(authOptions);
    if (session) {
        try {
            const trips = await prisma.trip.findMany({
                where: {
                    userId: session.user.id,
                },
            });
            return NextResponse.json({ trips }, { status: 200 });
        } catch (error) {
            return NextResponse.json(
                { error },
                { status: 500 },
            );
        }
    }
}