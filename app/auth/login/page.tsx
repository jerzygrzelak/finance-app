import React from 'react'
import LogInForm from "@/app/components/LogInForm";

export default function LogInPage() {
    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-3xl'>
                Log in
            </h1>
            <LogInForm />
        </div>
    )
}
