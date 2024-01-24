import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog';
import { ListPlusIcon } from 'lucide-react';
import AccountForm from '@/app/(pages)/accounts/forms/AccountForm';

interface AddAccountDialogProps {
    bank: any;
}

export default function AddAccountDialog({ bank }: AddAccountDialogProps) {
    const [accountDialogOpen, setAccountDialogOpen] = useState(false);
    const handleAccountSubmitSuccess = () => {
        setAccountDialogOpen(false);
    };

    return (
        <Dialog open={accountDialogOpen} onOpenChange={setAccountDialogOpen}>
            <DialogTrigger asChild>
                <ListPlusIcon className="cursor-pointer" />
            </DialogTrigger>

            <DialogContent className="max-w-[350px]">
                <DialogHeader>
                    <p>Adding account to <b> {bank.name}</b></p>
                </DialogHeader>
                <AccountForm
                    onSubmitSuccess={handleAccountSubmitSuccess}
                    bankId={bank.id}
                />
            </DialogContent>
        </Dialog>
    );
}