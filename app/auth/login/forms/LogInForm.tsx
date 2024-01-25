'use client';

import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ReCAPTCHA from 'react-google-recaptcha';

const formSchema = z.object({
    username: z.string().min(1, {
        message: 'Username must be filled.',
    }),
    password: z.string().min(1, {
        message: 'Password must be filled.',
    }),
});

export default function LogInForm() {
    const router = useRouter();
    const [captcha, setCaptcha] = useState<string | null>();
    const { status } = useSession();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (formValue: z.infer<typeof formSchema>) => {
        try {
            const signInResponse = await signIn('credentials', {
                username: formValue.username,
                password: formValue.password,
                redirect: false,
            });

            if (signInResponse?.ok) {
                router.refresh();
            } else {
                form.setError('root', { message: 'Invalid credentials.' });
            }
        } catch (err) {}
    };

    useEffect(() => {
        if (status === 'authenticated') {
            router.refresh();
            router.push('/');
        }
    }, [router, status]);

    function clearRootError() {
        form.formState.errors.root && form.clearErrors('root');
    }

    return (
        // <div className="flex flex-col w-auto border-2 border-slate-600 dark:border-white m-2 py-4 px-5 rounded-lg">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        onInput={clearRootError}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        onInput={clearRootError}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.root && (
                        <p className="text-sm font-medium text-destructive">
                            {form.formState.errors.root.message}
                        </p>
                    )}
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        onChange={setCaptcha}
                    />
                    <div className="mt-2 flex items-center justify-between">
                        <Button type="submit" disabled={!captcha}>
                            Log in
                        </Button>
                    </div>
                </form>
            </Form>
        // </div>
    );
}
