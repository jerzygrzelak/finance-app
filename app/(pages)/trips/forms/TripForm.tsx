'use client';

import * as z from 'zod';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface AddTripFormProps {
    onSubmitSuccess: () => void;
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Name must be filled.',
    }),
    startDate: z.date({
        required_error: "Start date must be filled.",
    }),
    endDate: z.date({
        required_error: "End date must be filled.",
    }),
});

export default function TripForm({ onSubmitSuccess }: Readonly<AddTripFormProps>) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    });

    const onSubmit = async (formValue: z.infer<typeof formSchema>) => {
        // setLoading(true);
        // const response = await fetch('/api/bank', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         name: formValue.name,
        //     }),
        // });
        // if (response.ok) {
        //     setLoading(false);
        //     toast({
        //         description: 'Bank added successfully!',
        //         variant: 'success',
        //     });
        //     onSubmitSuccess();
        // } else {
        //     console.log(response);
        //     if (response.status === 409) {
        //         form.setError('root', {
        //             message: 'You already have a bank with such a name.',
        //         });
        //     }
        //     setLoading(false);
        // }
    };

    return (<div></div>);
}
