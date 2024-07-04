"use client";

import { toggle_error } from "@/redux/feature/error";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ULayout({
    children,
}: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    useEffect(() => {
        fetch('/api/user/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            if (!response.ok) {
                dispatch(toggle_error({ type: "alert", data: "Server error Try after some time" }));
            }
            return response.json();
        }).then(data => {
            if (data.status == "alert") {
                dispatch(toggle_error({ type: data.status, data: data.message }));
            }
            if (data.data.login == false || data.data.user.user_type !== 0) {
                router.push('/');
            }
        })
    }, [router, dispatch]);

    const signOut = () => {
        fetch('/api/user/', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            if (!response.ok) {
                dispatch(toggle_error({ type: "alert", data: "Server error Try after some time" }));
            }
            return response.json();
        }).then(data => {
            if (data.status == "alert") {
                dispatch(toggle_error({ type: data.status, data: data.message }));
            }
            if (data.data == false) {
                router.back();
            }
        })
    }

    const goToChat = () => {
        router.push("chat");
    }
    return (
        <>
            <div onClick={goToChat} className="fixed  px-4 py-0 mt-5 mx-5 text-lg capitalize bg-green-400 shadow-xl x-4 start-0 text-stone-800 shadow-green-600 rounded-full">Chat</div>
            <div onClick={signOut} className="fixed px-4 py-2 mt-5 mx-5 text-lg capitalize bg-green-400 rounded-md shadow-xl x-4 p end-0 text-stone-800 shadow-green-600">sign out</div>
            {children}
        </>
    );
}

