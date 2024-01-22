'use client';

import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LoginFormInput {
    username: string;
    password: string;
}

export default function LogInForm() {
    const router = useRouter();
    const { status } = useSession();
    const form = useForm<LoginFormInput>({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const handleSubmit = async (formValue: LoginFormInput) => {
        try {
            const signInResponse = await signIn('credentials', {
                username: formValue.username,
                password: formValue.password,
                redirect: false,
            });
            console.log(formValue)
            console.log(signInResponse)
            if (signInResponse?.ok) {
                router.refresh();
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        console.log(status);
        if (status === 'authenticated') {
            router.refresh();
            router.push('/');
        }
    }, [router, status]);

    return (
        <div className="flex flex-col w-48 border-2 border-black dark:border-white">
            {/*<input*/}
            {/*    type="text"*/}
            {/*    value={username}*/}
            {/*    onChange={(e) => setUsername(e.target.value)}*/}
            {/*/>*/}
            {/*<input*/}
            {/*    type="password"*/}
            {/*    value={password}*/}
            {/*    onChange={(e) => setPassword(e.target.value)}*/}
            {/*/>*/}

            {/*<button onClick={handleSubmit()}>Sign in</button>*/}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Log in</Button>
                </form>
            </Form>
        </div>
    );
}
