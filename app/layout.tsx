import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Provider from "@/app/components/Provider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Finance App",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Provider>
                    {children}
                </Provider>
            </body>
        </html>
    );
}
