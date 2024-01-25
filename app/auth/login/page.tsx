import React from 'react';
import LogInForm from '@/app/auth/login/forms/LogInForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LogInPage() {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <Card className="flex flex-col w-fit ">
                <CardHeader>
                    <CardTitle>Log in</CardTitle>
                </CardHeader>
                <CardContent>
                    <LogInForm />
                </CardContent>
            </Card>
        </div>
    );
}
