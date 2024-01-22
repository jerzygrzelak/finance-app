'use client';

import * as React from 'react';

import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function ModeToggle() {
    const { setTheme } = useTheme();

    function handleSwitch(checked: boolean) {
        setTimeout(() => (checked ? setTheme('dark') : setTheme('light')), 150);
    }

    return (
        <div className="flex items-center space-x-2">
            <Switch
                id="dark-mode"
                onCheckedChange={(checked) => handleSwitch(checked)}
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
    );
}
