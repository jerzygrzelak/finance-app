'use client';

import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import {redirect, useRouter} from 'next/navigation';

export default function LogInForm() {
    const router = useRouter();

    const { status } = useSession();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        setMessage('Logging in...');

        try {

            const signInResponse = await signIn('credentials', {
                username,
                password,
                redirect: false,
            })
            console.log(signInResponse);
            if(!signInResponse || signInResponse.ok !== true) {
                setMessage("Invalid credentials");
            } else {
                router.refresh();
            }

        } catch(err) {
            console.log(err);
        }

        setMessage(message);
    };

    useEffect(() => {
        console.log(status)
        if (status === 'authenticated') {
            router.refresh();
            router.push('/');
            redirect('/');
        }
    }, [router, status]);

    return (
        <div className='flex flex-col gap-4 bg-gray-400 p-4'>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleSubmit}>Sign in</button>

            <p>{message}</p>
        </div>
    );
};
