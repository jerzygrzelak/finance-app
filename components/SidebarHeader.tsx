'use client';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';

import { cn } from '@/lib';
import Link from 'next/link';
import useScroll from '@/app/hooks/use-scroll';

export default function SidebarHeader() {
    const scrolled = useScroll(5);
    const selectedLayout = useSelectedLayoutSegment();
    const pathname = usePathname();
    return ( pathname !== '/auth/login' &&
        <div
            className={cn(
                `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
                {
                    'border-b border-gray-200 bg-white/75 backdrop-blur-lg':
                        scrolled,
                    'border-b border-gray-200 bg-white': selectedLayout,
                },
            )}
        >
            <div className="flex h-[47px] items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className="flex flex-row space-x-3 items-center justify-center"
                    >
                        <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
                        <span className="font-bold text-xl flex ">Logo</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}