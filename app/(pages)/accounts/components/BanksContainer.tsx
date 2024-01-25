import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import BankCard from '@/app/(pages)/accounts/components/BankCard';

interface BanksContainerProps {
    banks: any;
}

export default function BanksContainer({
    banks,
}: Readonly<BanksContainerProps>) {
    const bankSkeletons: number[] = Array.from(Array(7).keys());
    const desiredOrder = [
        'Revolut',
        'Gotówka',
        'Alior',
        'mBank',
        'Nest',
        'Velo',
        'Skarbonka',
        'ING',
    ];
    const sortedBanks = banks
        ? banks.sort((a: any, b: any) => {
              const indexA = desiredOrder.indexOf(a.name);
              const indexB = desiredOrder.indexOf(b.name);
              if (indexA === -1 && indexB === -1) {
                  return 0;
              } else if (indexA === -1) {
                  return 1;
              } else if (indexB === -1) {
                  return -1;
              } else {
                  return indexA - indexB;
              }
          })
        : null;

    return (
        <div className="mt-5 grid md:grid-cols-5 sm:grid-cols-2 gap-5">
            {sortedBanks
                ? sortedBanks.map((bank: any) => (
                      <BankCard bank={bank} key={bank.id} />
                  ))
                : bankSkeletons.map((_, index) => (
                      <Skeleton key={index} className="w-80 h-56" />
                  ))}
        </div>
    );
}
