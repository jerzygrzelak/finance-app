'use client';
import React, { useState } from 'react';
import useSWR from 'swr';
import PageHeader from '@/components/PageHeader';
import BanksContainer from '@/app/(pages)/accounts/components/BanksContainer';
import { fetcher } from '@/lib';
import AddBankDialog from '@/app/(pages)/accounts/dialogs/AddBankDialog';

export default function AccountsPage() {
    // const [data, setData] = useState(null)
    const [bankDialogOpen, setBankDialogOpen] = useState(false);
    const handleBankFormSubmitSuccess = () => {
        setBankDialogOpen(false);
    };

    return (
        <div className="ml-5 md:ml-64 mr-5 mb-5">
            <PageHeader headerText="Accounts" />
            <AddBankDialog />
            <BanksContainer />
        </div>
    );
}
