import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
    manifest: "./manifest.json",
    title: "Gender-Bias",
    description: "Gender Bias in Content",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="dark">
            <body className="pb-10">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
