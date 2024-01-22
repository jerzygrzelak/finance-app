import React from 'react';
import LogInForm from '@/components/LogInForm';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';

export default function LogInPage() {
    return (
        <>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl">Log in</h1>
                <LogInForm />
            </div>
            <Button>Click me!</Button>
            <ModeToggle/>
        </>
    );
}
