import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib';
import BankCard from '@/app/(pages)/accounts/components/BankCard';

export default function BanksContainer() {
    const banks = useSWR('/api/bank', fetcher);
    const bankSkeletons: number[] = Array.from(Array(7).keys());

    return (
        <div className="mt-5 grid md:grid-cols-5 sm:grid-cols-2 gap-5">
            {banks.data
                ? banks.data.banks.map((bank: any) => (
                      <BankCard
                          bank={bank}
                          key={bank.id}
                      />
                  ))
                : bankSkeletons.map((_, index) => (
                      <Skeleton
                          key={index}
                          className='w-80 h-56'
                      />
                  ))}
        </div>
    );
}
