'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type OnSubmitSuccessCallback = () => void;

interface BankFormProps {
    onSubmitSuccess: OnSubmitSuccessCallback;
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Name must be filled.',
    }),
});

export default function BankForm({ onSubmitSuccess }: BankFormProps) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    });

    const onSubmit = async (formValue: z.infer<typeof formSchema>) => {
        setLoading(true);
        const response = await fetch('/api/bank', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formValue.name,
            }),
        });
        if (response.ok) {
            setLoading(false);
            toast({
                description: 'Bank added successfully!',
                variant: 'success',
            });
            onSubmitSuccess();
        } else {
            console.log(response);
            if (response.status === 409) {
                form.setError('root', { message: 'You already have a bank with such a name.' });
            }
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bank&apos;s name</FormLabel>
                            <FormControl>
                                <Input {...field} />
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
                <Button disabled={loading} type="submit">
                    {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Add
                </Button>
            </form>
        </Form>
    );
}
