"use client";
import ErrorTag from "@/components/Error";
import store from "@/redux/store";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { inter } from "@/lang";

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} pb-10 min-h-screen`} >
                <Provider store={store}>
                    <NextUIProvider>
                        <ErrorTag />
                        {children}
                    </NextUIProvider>
                </Provider>
            </body>
        </html >
    );
}

