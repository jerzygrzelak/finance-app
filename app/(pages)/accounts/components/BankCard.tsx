import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddAccountDialog from '@/app/(pages)/accounts/dialogs/AddAccountDialog';
import React from 'react';

interface BankCardProps {
    bank: any
}
export default function BankCard({bank}: BankCardProps) {
    return (
        <Card className="w-80 h-auto" key={bank.id}>
            <CardHeader className='flex flex-row justify-between space-y-0'>
                <CardTitle>{bank.name}</CardTitle>
                <AddAccountDialog bank={bank}/>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
        </Card>
    );
}