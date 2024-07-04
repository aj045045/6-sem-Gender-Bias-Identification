'use client'
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { AppDispatch } from "@/redux/store";
import { toggle_error } from "@/redux/feature/error";
import { useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOffSharp } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Register() {

    const router = useRouter();

    interface formDataInterface {
        user_name: string;
        full_name: string;
        email_id: string;
        password: string;
        user_type: number;
    }

    const [userName, setUserName] = useState(false);
    const [fullName, setFullName] = useState(false);
    const [emailId, setEmailId] = useState(false);
    const [password, setPassword] = useState(false);
    const [isHide, setIsHide] = useState(false);

    const [formData, setFormData] = useState<formDataInterface>({
        user_name: "", email_id: "", password: "", full_name: "", user_type: 1
    })


    const dispatch = useDispatch<AppDispatch>();

    const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.user_name || !formData.email_id || !formData.password || !formData.full_name) {
            dispatch(toggle_error({ type: "alert", data: "Please Enter all Fields" }));
            return;
        }
        fetch('/api/user/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        }).then(response => {
            if (!response.ok) {
                dispatch(toggle_error({ type: "alert", data: "Server error Try after some time" }));
            }
            return response.json();
        }).then(data => {
            dispatch(toggle_error({ type: data.status, data: data.message }));
            if (data.status == "success") {
                router.back()
            }
        });
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case "user_name":
                const userNameInvalid = /^\w{6}/.test(value);
                setUserName(!userNameInvalid);
                break;

            case "full_name":
                const nameInvalid = /^[a-zA-Z\s]+$/.test(value);
                setFullName(!nameInvalid);
                break;

            case "email_id":
                const emailInvalid = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(value);
                setEmailId(!emailInvalid);
                break;

            case "password":
                const passwordInvalid = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s: ])([^\s]){8,}$/.test(value);
                setPassword(!passwordInvalid);
                break;
        }
        setFormData({ ...formData, [name]: value });
    }

    const handleHide = () => {
        setIsHide(!isHide);
    }
    const handleGoBack = () => {
        router.back();
    }
    return (<>
        <div className="mx-auto w-full px-5 pt-20 flex flex-row items-center justify-center">
            <div className="flex items-center bg-indigo-900/50 rounded-xl p-10 md:flex-row flex-col ">
                <Image width={0} className="w-3/5 h-auto md:rounded-l-2xl rounded-2xl md:rounded-r-none select-none" unoptimized height={0} alt="Image Sign up" src='/icons/image-1.png' />
                <form className="space-y-10 w-full items-center flex-col flex min-w-10" onSubmit={handleSubmitForm}>
                    <div className="text-4xl font-bold select-none text-green-400 mt-20 md:mt-0">SIGN UP</div>
                    <div className="space-y-10 flex items-center flex-col">
                        <Input startContent={<FaHashtag className="mb-1  text-blue-500  pointer-events-none flex-shrink-0" />} name="user_name" type="text" label="User Name" value={formData.user_name} onChange={handleChange} color="primary" variant="flat" errorMessage={userName ? "The Name must be at least 6 character" : ""} />
                        <Input name="full_name" type="text" label="Full Name" value={formData.full_name} onChange={handleChange} color="primary" variant="flat" errorMessage={fullName ? "The full name of the user must only be string" : ""} />
                        <Input name="email_id" type="email" label="E-mail Id" color="primary" value={formData.email_id} onChange={handleChange} variant="flat" errorMessage={emailId ? "The Email ID must be Correct" : ""} />
                        <Input endContent={<div onClick={handleHide}>{isHide ? <IoEyeOffSharp className="text-2xl self-center text-blue-500   pointer-events-none flex-shrink-0" /> : <MdRemoveRedEye className="text-2xl  text-blue-700 self-center pointer-events-none flex-shrink-0" />}</div>} className="w-80" name="password" type={isHide ? "text" : "password"} label="Password" color="primary" value={formData.password} onChange={handleChange} variant="flat" errorMessage={password ? "The Password must be at least 8 characters long and include a combination of alphabetic characters, numbers, and special characters ( E.g. U$er123Jorge )" : ""} />
                        <Button className="text-lg" type="submit" variant="shadow" color="primary">Submit</Button>
                        <p className="text-indigo-300 text-md hover:underline hover:underline-offset-2" onClick={handleGoBack}>Do you want to go back?</p>
                    </div>
                </form>
            </div>
        </div>
    </>)
}
export default Register;