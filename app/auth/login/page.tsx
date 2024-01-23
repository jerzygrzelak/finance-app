import React from 'react';
import LogInForm from '@/components/LogInForm';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';

export default function LogInPage() {
    return (
        <>
            <div className="flex h-screen flex-col items-center justify-center">
                <LogInForm />
            </div>
        </>
    );
}
