'use client';
import React from 'react';
import { signOut } from 'next-auth/react';
import { LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LogOut() {
    async function handleLogout() {
        await signOut({
            redirect: true,
            callbackUrl: '/auth/login',
        });
    }

    return (
        <Button
            onClick={handleLogout}
            variant='outline'
        >
            <LogOutIcon className="mr-2 h-4 w-4" />
            Log out
        </Button>
    );
}
