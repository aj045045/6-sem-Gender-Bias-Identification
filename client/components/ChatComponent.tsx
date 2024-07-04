import { poppins } from "@/lang";

export  function ChatCompo({ query, response }: { query: string, response: string; }) {
    return (
        <div className={`${poppins.className} flex flex-col md:space-y-5 text-lg tracking-wide [word-spacing:5px] p-5 w-full space-y-2`}>
            <div className="flex justify-end items-center flex-row  w-full group">
                <div className=" bg-indigo-900/50 px-10 py-4 rounded-full max-w-[75%] ">{query}</div>
            </div>
            <div>{response}</div>
        </div>
    );
}