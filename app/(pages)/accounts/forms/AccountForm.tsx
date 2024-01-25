'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import { ZodTypeAny } from 'zod';
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
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, fetcher } from '@/lib';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import useSWR from 'swr';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

type OnSubmitSuccessCallback = () => void;

interface AccountFormProps {
    onSubmitSuccess: OnSubmitSuccessCallback;
    bankId: string;
}

export const zodInputStringPipe = (zodPipe: ZodTypeAny) =>
    z
        .string()
        .transform((value) => (value === '' ? null : value))
        .nullable()
        .refine((value) => value === null || !isNaN(Number(value)), {
            message: 'Invalid number',
        })
        .transform((value) => (value === null ? 0 : Number(value)))
        .pipe(zodPipe);

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Name must be filled.',
    }),
    balance: zodInputStringPipe(z.number()).nullish().or(z.string().max(0)),
    currency: z.string({
        required_error: "Currency must be selected.",
    }),
});

export default function AccountForm({ onSubmitSuccess, bankId }: AccountFormProps) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { data } = useSWR('/api/currency', fetcher);
    const currencies = data?.currencies
        .sort((a: any, b: any) => {
            const order = ['PLN', 'EUR', 'THB', 'MYR', 'JPY', 'HKD', 'SGD', 'USD'];

            const indexA = order.indexOf(a.code);
            const indexB = order.indexOf(b.code);

            if (indexA !== -1 && indexB !== -1) {
                return indexA - indexB;
            }

            if (indexA !== -1) {
                return -1;
            }

            if (indexB !== -1) {
                return 1;
            }

            return a.code.localeCompare(b.code);
        })
        .map((currency: any) => ({
            label: currency.code,
            value: currency.id,
        }));

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            balance: '0',
            currency: undefined,
        },
    });

    function handleBalanceBlur()  {
        const balance = form.getValues('balance');
        if (balance === '') {
            form.setValue('balance', '0');
        }

        if (balance[0] === '0' && balance.length > 1) {
            form.setValue('balance', '0.' + parseFloat(balance));
        }
    }

    const onSubmit = async (formValue: z.infer<typeof formSchema>) => {
        console.log(formValue);
        setLoading(true);
        const response = await fetch('/api/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bankId,
                name: formValue.name,
                balance: formValue.balance,
                currency: formValue.currency,
            }),
        });
        if (response.ok) {
            setLoading(false);
            toast({
                description: 'Account added successfully!',
                variant: 'success',
            });
            onSubmitSuccess();
        } else {
            if (response.status === 409) {
                form.setError('root', { message: 'You already have an account with such a name in this bank' });
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
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="balance"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Balance</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="any"
                                    {...field}
                                    {...form.register('balance', {
                                        onBlur: () => {handleBalanceBlur()},
                                    })}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {currencies
                ? <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Currency</FormLabel>
                            <Popover modal={true}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? currencies.find(
                                                    (currency: any) => currency.value === field.value
                                                )?.label
                                                : "Select a currency"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search..." />
                                        <CommandEmpty>No language found.</CommandEmpty>

                                            <CommandGroup>
                                                <ScrollArea className='h-56 w-48'>
                                                {currencies.map((currency: any) => (
                                                    <CommandItem
                                                        value={currency.label}
                                                        key={currency.value}
                                                        onSelect={() => {
                                                            form.setValue("currency", currency.value)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                currency.value === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {currency.label}
                                                    </CommandItem>
                                                ))}
                                                </ScrollArea>
                                            </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                : <Skeleton className='w-48 h-11'/>}
                {form.formState.errors.root && (
                    <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.root.message}
                    </p>
                )}
                <Button
                    disabled={loading}
                    type="submit"
                >
                    {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Add
                </Button>
            </form>
        </Form>
    );
}
