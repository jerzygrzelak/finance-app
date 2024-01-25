import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddAccountDialog from '@/app/(pages)/accounts/dialogs/AddAccountDialog';
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface BankCardProps {
    bank: any;
}

export default function BankCard({ bank }: Readonly<BankCardProps>) {
    return (
        <Card className="w-80 h-fit min-h-[150px]" key={bank.id}>
            <CardHeader className="flex flex-row justify-between space-y-0">
                <CardTitle>{bank.name}</CardTitle>
                <AddAccountDialog bank={bank} />
            </CardHeader>
            <CardContent>
                {bank.accounts.length > 0 ? (
                    bank.accounts.map((account: any) => (
                        <div className="mb-4" key={account.id}>
                            <div
                                className="flex flex-row justify-between"
                                key={account.id}
                            >
                                <p className="text-lg font-semibold">
                                    {account.name}
                                </p>
                                <div className="text-lg font-medium flex flex-row gap-1 items-baseline">
                                    <p>{account.balances[0].balance}</p>
                                    <p className="text-base">
                                        {account.currency.code}
                                    </p>
                                </div>
                            </div>
                            <Separator className="w-full" />
                        </div>
                    ))
                ) : (
                    <p className="text-lg font-medium">
                        No accounts added yet.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
