import { toggle_error } from "@/redux/feature/error";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CheckCategory } from "./Admin_CheckCategory";

export function InputComp() {
    const [inputValue, setInputValue] = useState("");
    const [response, setResponse] = useState<string[]>([]);
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
        fetch(`/api/admin?query=${inputValue}`, {
            method: 'GET',
        }).then(response => {
            if (!response.ok) {
                dispatch(toggle_error({ type: "alert", data: "Server error Try after some time" }));
            }
            return response.json();

        }).then(data => {
            if (data.status == "alert") {
                dispatch(toggle_error({ type: data.status, data: data.message }));
            }
            setResponse(data.data);
        });
    };


    return (
        <>
            <div className="py-10">
                <div className="rounded-full bg-indigo-800/50 w-3/4 mx-auto">
                    <form className="flex justify-center w-full p-3 space-x-3 transition-colors rounded-full h-14 bg-indigo-800/50" onSubmit={onFormSubmit}>
                        <input
                            onChange={(e) => setInputValue(e.target.value)}
                            value={inputValue}
                            placeholder="Enter your Query"
                            name="chat-text"
                            type="text"
                            className="w-full tracking-wider transition-colors rounded-md bg-indigo-800/50 [word-spacing:5px] px-3"
                        />
                        <input
                            type="submit"
                            value="&uarr;"
                            className="mx-3 text-2xl hover:text-white"
                        />
                    </form>
                </div>
            </div>
            <CheckCategory keyValues={response} />
        </>
    )
}