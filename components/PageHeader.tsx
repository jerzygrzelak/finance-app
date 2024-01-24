import React from 'react';
import { Separator } from '@/components/ui/separator';

interface PageHeaderProps {
    widthClass?: string;
    headerText: string;
}

export default function PageHeader({ widthClass = 'w-fit', headerText }: PageHeaderProps) {
    return (
        <div className={widthClass}>
            <h1 className="font-bold text-3xl">{headerText}</h1>
            <Separator />
        </div>
    );
}
