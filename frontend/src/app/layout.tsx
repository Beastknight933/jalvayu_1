import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/Providers';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Climate Digital Twin | India',
    description: 'AI-Powered Digital Twin of India’s Climate',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
            <body className={`${inter.className} antialiased bg-background text-foreground min-h-screen`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
