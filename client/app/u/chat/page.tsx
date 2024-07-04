'use client'
import { ChatCompo } from "@/components/ChatComponent";
import { InputBoxCompo } from "@/components/InputBox";
import { useState } from "react";

export interface ChatMapCompoInterface {
    query: string;
    response: string;
}
export default function ChatPage() {
    const [chatMap, setChatMap] = useState<ChatMapCompoInterface[]>([]);
    const getPaddingTopClass = () => {
        if (chatMap.length === 1) {
            return "pt-80";
        } else if (chatMap.length === 2) {
            return "pt-40";
        } else if (chatMap.length >= 3) {
            return "pt-20"
        } else {
            return "[padding-top:440px]";
        }
    };


    return (<div className={getPaddingTopClass()}>
        <ChatMapCompo chatMap={chatMap} />
        <InputBoxCompo chatMap={chatMap} setChatMap={setChatMap} />
    </div>)
}

function ChatMapCompo({ chatMap }: { chatMap: { query: string; response: string }[]; }) {
    return (
        <div className="w-3/4 pb-10 mx-auto md:w-1/2">
            {chatMap.map((data, index) => (
                <ChatCompo response={data.response} query={data.query} key={index} />
            ))}
        </div>
    )
}