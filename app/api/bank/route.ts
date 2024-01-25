import prisma from '@/lib/prisma/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (session) {
        try {
            const body = await req.json();
            const { name } = body;
            const existingBank = await prisma.bank.findFirst({
                where: {
                    name,
                    userId: session.user.id,
                },
            });

            if (existingBank) {
                return NextResponse.json(
                    {
                        bank: null,
                        message: 'Bank with such a name already exists.',
                    },
                    { status: 409 },
                );
            }

            const newBank = await prisma.bank.create({
                data: {
                    name,
                    userId: session.user.id,
                },
            });

            return NextResponse.json(
                { bank: newBank, message: 'Bank created successfully!' },
                { status: 201 },
            );
        } catch (error) {
            return NextResponse.json(
                { message: 'Something went wrong!' },
                { status: 500 },
            );
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
                include: {
                    accounts: {
                        include: {
                            currency: {
                                select: {
                                    code: true,
                                },
                            },
                            balances: {
                                orderBy: {
                                    createdAt: 'desc',
                                },
                                take: 1,
                            },
                        },
                    },
                },
            });
            const currencyBalances = [];

            const formatNumberWithSpaces = (number: number) => {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            };

            banks.forEach((bank) => {
                bank.accounts.forEach((account) => {
                    if (account.balances.length > 0) {
                        const code = account.currency.code;
                        const balance = account.balances[0].balance;

                        const existingCurrencyIndex = currencyBalances.findIndex((item) => item.code === code);

                        if (existingCurrencyIndex === -1) {
                            currencyBalances.push({ code, balance });
                        } else {
                            currencyBalances[existingCurrencyIndex].balance += balance;
                        }
                    }
                });
            });
            
            const formattedBalances = currencyBalances.map((balance) => {
                return {
                    ...balance,
                    balance: formatNumberWithSpaces(balance.balance),
                };
            });

            return NextResponse.json({ banks, currencyBalances: formattedBalances }, { status: 200 });
        } catch (error) {
            console.log(error)
            return NextResponse.json(
                {
                    error,
                },
                { status: 500 },
            );
        }
    }
}
