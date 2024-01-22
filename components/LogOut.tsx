'use client';
import React from 'react';
import { signOut } from 'next-auth/react';

export default function LogOut() {
    async function handleLogout() {
        await signOut({
            redirect: true,
            callbackUrl: '/auth/login',
        });
    }

    return <button onClick={handleLogout}>Log out!</button>;
}
