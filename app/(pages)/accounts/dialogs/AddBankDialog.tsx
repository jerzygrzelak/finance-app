import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LandmarkIcon, ListPlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import BankForm from '../forms/BankForm';

export default function AddBankDialog() {
    const [bankDialogOpen, setBankDialogOpen] = useState(false);
    const handleBankFormSubmitSuccess = () => {
        setBankDialogOpen(false);
    };

    return (
        <Dialog open={bankDialogOpen} onOpenChange={setBankDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="mt-2" size="sm">
                    {' '}
                    <LandmarkIcon className="mr-2 h-4 w-4" />
                    Add a bank
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[320px]">
                <BankForm onSubmitSuccess={handleBankFormSubmitSuccess} />
            </DialogContent>
        </Dialog>
    );
}