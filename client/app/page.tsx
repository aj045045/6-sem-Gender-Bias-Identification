'use client'
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function LoginPage() {
    const path = usePathname();
    const router = useRouter();
    useEffect(() => {
        if (path === "/") {
            router.prefetch('/home');
            router.push('/home');
        }
    })
}
export default LoginPage;