//REVIEW - Hero Image for signIn page
'use client';
import Image from "next/image";

function HeroHeader() {
    return (
        <div className="flex flex-col md:flex-row h-96 select-none">
            <div className="text-justify self-center items-center md:w-3/5 w-4/5 md:px-10 px-0  md:mt-10 mt-5">
                <div className="text-4xl  font-semibold uppercase text-shadow-md">
                    Men of quality respect women equality
                </div>
                <div className="text-lg mt-5 text-indigo-400">&#34;Empowering equality through unbiased identification. Our AI sees beyond gender, fostering inclusively and understanding.&#34;</div>
            </div>
            <div className="md:mx-20 ml-40 select-none">
                <Image unoptimized src={'/icons/blob.png'} alt="Blob Background" width={0} height={0} className="w-80 md:w-96 absolute" />
                <Image unoptimized src={'/icons/hero_icon.png'} alt="User Image" width={0} height={0} className="w-60 mt-10 ml-10 z-10 md:w-80 absolute" />
            </div>
        </div>
    );
}

export default HeroHeader;
