'use client';

import * as React from 'react';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function ModeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <Skeleton className="w-[120px] h-[35px] rounded-full" />;
    }

    function handleSwitch(checked: boolean) {
        setTimeout(() => (checked ? setTheme('dark') : setTheme('light')), 150);
    }

    return (
        // <Skeleton className="w-[120px] h-[35px] rounded-full" />
        <div className="flex items-center space-x-2">
            <SunIcon />
            <Switch
                defaultChecked={theme === 'dark'}
                onCheckedChange={(checked: boolean) => handleSwitch(checked)}
            />
            <MoonIcon />
        </div>
    );
}
