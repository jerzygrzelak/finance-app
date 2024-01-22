import type { Metadata } from 'next';
import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import { cn } from '@/lib';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
    title: 'Finance App',
};

const fontSans: NextFontWithVariable = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});
export { fontSans };

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable,
                )}
            >
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <AuthProvider>
                    {children}
                </AuthProvider>
            </ThemeProvider>
            </body>
        </html>
    );
}
