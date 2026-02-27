import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "David's Dashboard | Vibe v2",
    description: "Advanced agentic bookmarks & workspace management.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} font-sans antialiased text-white`}>
                {children}
            </body>
        </html>
    );
}
