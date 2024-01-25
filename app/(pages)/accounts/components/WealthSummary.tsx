import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface WealthSummaryProps {
    currencyBalances: any[];
}

export default function WealthSummary({
    currencyBalances,
}: WealthSummaryProps) {
    const groupBalancesIntoColumns = (currencyBalances: any) => {
        const columns = [];
        for (let i = 0; i < currencyBalances.length; i += 4) {
            columns.push(currencyBalances.slice(i, i + 4));
        }
        return columns;
    };

    if (currencyBalances) {
        return (
            <div className="h-36 mt-2 mb-2 text-xl flex flex-row gap-10">
                {groupBalancesIntoColumns(currencyBalances).map(
                    (column, columnIndex) => (
                        <div key={columnIndex} className="flex flex-col gap-2">
                            {column.map((balance: any, index: any) => (
                                <div
                                    key={index}
                                    className="flex flex-row gap-1 items-baseline"
                                >
                                    <p className="text-base font-medium">
                                        {balance.code}
                                    </p>
                                    <p className="font-bold">
                                        {balance.balance}{' '}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ),
                )}
            </div>
        );
    } else {
        return <Skeleton className="mt-2 mb-2 w-72 h-36" />;
    }
}