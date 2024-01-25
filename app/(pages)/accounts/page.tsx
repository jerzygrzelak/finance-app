'use client';
import React from 'react';
import PageHeader from '@/components/PageHeader';
import BanksContainer from '@/app/(pages)/accounts/components/BanksContainer';
import AddBankDialog from '@/app/(pages)/accounts/dialogs/AddBankDialog';
import useSWR from 'swr';
import { fetcher } from '@/lib';
import WealthSummary from '@/app/(pages)/accounts/components/WealthSummary';

export default function AccountsPage() {
    const banks = useSWR('/api/bank', fetcher);
    const currencyBalances = banks.data?.currencyBalances;

    return (
        <div className="ml-5 md:ml-64 mr-5 mb-5">
            <PageHeader headerText="Your wealth" />
            <WealthSummary currencyBalances={currencyBalances}/>
            <PageHeader headerText="Accounts" />
            <AddBankDialog />
            <BanksContainer banks={banks.data ? banks.data.banks : null} />
        </div>
    );
}
