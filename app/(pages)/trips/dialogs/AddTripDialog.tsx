import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { PlaneTakeoffIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TripForm from '@/app/(pages)/trips/forms/TripForm';

export default function AddTripDialog() {
    const [tripDialogOpen, setTripDialogOpen] = useState(false);
    const handleTripSubmitSuccess = () => {
        setTripDialogOpen(false);
    };

    return (
        <Dialog open={tripDialogOpen} onOpenChange={setTripDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="mt-2" size="sm">
                    {' '}
                    <PlaneTakeoffIcon className="mr-2 h-4 w-4" />
                    Add a trip
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[350px]">
                <TripForm onSubmitSuccess={handleTripSubmitSuccess} />
            </DialogContent>
        </Dialog>
    );
}
