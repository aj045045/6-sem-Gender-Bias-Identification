function Pill({ text }: { text: string }) {
    return (<div className="md:text-xl text-lg my-10 ml-5 bg-blue-300 shadow-lg shadow-blue-500 mt-10 select-none text-blue-900 font-bold  w-fit px-5 rounded-full py-1.5 ">
        {text}
    </div>)
}

export default Pill;