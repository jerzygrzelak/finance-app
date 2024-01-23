import type { Metadata } from 'next';
import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import { cn } from '@/lib';
import { ThemeProvider } from '@/components/ThemeProvider';
import SidebarHeader from '@/components/SidebarHeader';
import SidebarHeaderMobile from '@/components/SidebarHeaderMobile';
import { usePathname } from 'next/navigation';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import SidebarNav from '@/components/SidebarNav';

export const metadata: Metadata = {
    title: 'Finance App',
};

export function middleware(request: Request) {
    // Store current request url in a custom header, which you can read later
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-url', request.url);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

const fontSans: NextFontWithVariable = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});
export { fontSans };

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable,
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <div className="flex w-full h-full">
                            <SidebarNav />
                            <main className='flex-grow mt-10'>
                                {/*<SidebarHeader />*/}
                                <SidebarHeaderMobile />
                                {children}
                            </main>
                        </div>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
