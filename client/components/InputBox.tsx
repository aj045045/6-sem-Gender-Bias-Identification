import { ChatMapCompoInterface } from "@/app/u/chat/page";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { AppDispatch } from "@/redux/store";
import { toggle_error } from "@/redux/feature/error";
import { useDispatch } from "react-redux";

export function InputBoxCompo({
    chatMap,
    setChatMap,
}: {
    chatMap: { query: string; response: string }[];
    setChatMap: React.Dispatch<React.SetStateAction<ChatMapCompoInterface[]>>;
}) {
    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue) {
            dispatch(toggle_error({ type: "alert", data: "Please Enter all Fields" }));
            return;
        }
        if (inputValue.length < 10) {
            dispatch(toggle_error({ type: "alert", data: "Please Enter the long text input" }));
            return
        }
        fetch('/api/chat/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputValue),
        }).then(response => {
            if (!response.ok) {
                dispatch(toggle_error({ type: "alert", data: "Server error Try after some time" }));
            }
            return response.json();

        }).then(data => {
            if (data.status == "alert") {
                dispatch(toggle_error({ type: data.status, data: data.message }));
            }
            if (inputValue.trim()) {
                const newChat = { query: inputValue, response: data.data };
                setChatMap((prevChatMap) => [...prevChatMap, newChat]);
                setInputValue("");
            }
        });
    };

    const getPaddingTopClass = () => {
        if (chatMap.length >= 4) {
            return "fixed";
        }
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const arrowButton = () => {
        if (chatMap.length <= 3) {
            return "hidden";
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMap]);

    return (
        <div className={`${getPaddingTopClass()} inset-x-0 bottom-0 z-10 flex flex-col items-center justify-center w-3/4 p-3 pt-20 mx-auto space-y-2`}>
            <button
                onClick={scrollToTop}
                className={`${arrowButton()} text-xl text-white hover:text-indigo-300 animate-bounce hover:bg-indigo-900/50 p-2 rounded-full`}
            >
                <FaArrowUp />
            </button>
            <div className="w-full rounded-full bg-indigo-800/50">
                <form
                    onSubmit={onFormSubmit}
                    className="flex justify-center w-full p-3 space-x-3 transition-colors rounded-full h-14 bg-indigo-800/50"
                >
                    <input
                        name="chat-text"
                        type="text"
                        className="w-full tracking-wider transition-colors rounded-md bg-indigo-800/50 [word-spacing:5px]"
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                    />
                    <input
                        type="submit"
                        value="&uarr;"
                        className="mx-3 text-2xl hover:text-white"
                    />
                </form>
            </div>
        </div>
    );
}
