'use client';
import PageHeader from '@/components/PageHeader';
import React from 'react';
import AddTripDialog from '@/app/(pages)/trips/dialogs/AddTripDialog';

export default function TripsPage() {
    return (
        <div className="sm:ml-5 md:ml-64 mr-5">
            <PageHeader headerText="Trips" />
            <AddTripDialog/>
        </div>
    );
}