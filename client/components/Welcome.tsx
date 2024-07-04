'use client';
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

function Welcome() {
    const router = useRouter();
    const handleSignUp = () => {
        router.prefetch("/register");
        router.push("/register");
    }
    return (<>
        <div className="flex flex-col bg-green-200 border-4 rounded-lg md:px-14 md:py-5 px-7 py-2 border-green-500 w-fit mx-auto my-40 md:my-20 select-none">
            <div className="text-gray-600  md:text-2xl text-lg font-bold uppercase tracking-wide [word-spacing:10px]">Welcome to Gender Bias Detection System</div>
            <div className="mx-auto md:mt-6 mt-3 flex flex-row space-x-5 items-center">
                <div className="text-gray-600 md:text-lg text-sm bg-gray-300 md:px-3 md:py-2 px-1.5 py-1 rounded-lg border-3 font-semibold border-gray-400">Start Your Chat now</div>
                <Button onClick={handleSignUp} color="primary" variant="shadow" className="md:text-xl text-lg">Sign Up</Button>
            </div>
        </div>
    </>)
}

export default Welcome;