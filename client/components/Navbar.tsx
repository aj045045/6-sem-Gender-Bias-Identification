"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import Image from "next/image";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { BiLogoGmail } from "react-icons/bi";
import { AppDispatch } from "@/redux/store";
import { toggle_error } from "@/redux/feature/error";
import { useDispatch } from "react-redux";
import { IoEyeOffSharp } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import { useRouter } from "next/navigation";
export default function LogoNavbar() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    interface menuItemInterface {
        name: string,
        link: string
    };
    const menuItems: menuItemInterface[] = [
        { name: "Home", link: "home" },
        { name: "Sign up", link: "sign-up" },
        { name: "Service", link: "service" }
    ]

    const handleOpenSignIn = () => {
        onOpen();
    }
    const handleClose = () => {
        onClose();
    }

    interface formDataInterface {
        user_name: string;
        password: string;
    }

    const [formData, setFormData] = useState<formDataInterface>({ user_name: "", password: "" });
    const dispatch = useDispatch<AppDispatch>();

    const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.user_name || !formData.password) {
            dispatch(toggle_error({ type: "alert", data: "Please Enter all Fields" }));
            return;
        }

        fetch(`/api/user/`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(formData)
        }).then(response => {
            if (!response.ok) {
                dispatch(toggle_error({ type: "alert", data: "Server error Try after some time" }));
            }
            return response.json();
        }).then(data => {
            dispatch(toggle_error({ type: data.status, data: data.message }));
            if (data.status == "success") {
                if (data.data.user_type == 1) {
                    router.push('/u/chat');
                }
                if (data.data.user_type == 0) {
                    router.push('/u/admin');
                }
            }
        });
    }


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleHide = () => {
        setIsHide(!isHide);
    }
    const [isHide, setIsHide] = useState(true);
    const [activeSection, setActiveSection] = useState("home");
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (<>
        <Navbar onMenuOpenChange={setIsMenuOpen} position="sticky">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Image alt="Logo Image" src={'/icons/loading.png'} className="max-w-14 w-full select-none" unoptimized width={0} height={0} />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4 select-none" justify="center">
                {menuItems.map((item, index) => (
                    <NavbarItem key={index}>
                        <motion.div
                            whileHover={{ scale: 1.3 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <Link
                                onClick={() => setActiveSection(item.link)}
                                activeClass="active"
                                to={item.link}
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={500}
                                className={`w-full capitalize  select-none ${item.link === activeSection
                                    ? " dark:text-green-300 text-green-700  underline-offset-8 underline"
                                    : "dark:hover:text-white text-slate-500 hover:text-black"
                                    }`}
                                size={2}
                            >
                                {item.name}
                            </Link>
                        </motion.div>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button onClick={handleOpenSignIn} color="primary" variant="ghost" className="md:text-medium text-sm" id="sign-up">Sign In</Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem className="select-none" key={`${item}-${index}`}>
                        <Link
                            onClick={() => setActiveSection(item.link)}
                            activeClass="active"
                            to={item.link}
                            spy={true}
                            smooth={true}
                            offset={-100}
                            duration={500}
                            className={`w-full capitalize  select-none ${item.link === activeSection
                                ? " dark:text-green-300 text-green-700  underline-offset-8 underline"
                                : "dark:hover:text-white text-slate-500 hover:text-black"
                                }`}
                            size={2}
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar >
        {/* TODO : Modal */}
        <Modal
            isOpen={isOpen}
            placement="top-center"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <form onSubmit={handleSignIn}>
                            <ModalHeader className="flex flex-col gap-1 text-indigo-800 bg-indigo-300 uppercase">Log in</ModalHeader>
                            <ModalBody className="bg-indigo-200">
                                <Input
                                    onChange={handleChange}
                                    name="user_name"
                                    value={formData.user_name}
                                    autoFocus
                                    endContent={
                                        <BiLogoGmail className="text-2xl self-center text-blue-500   pointer-events-none flex-shrink-0" />
                                    }
                                    label="User Name / E-mail"
                                    variant="flat"
                                />
                                <Input
                                    onChange={handleChange}
                                    name="password"
                                    value={formData.password}

                                    endContent={<div onClick={handleHide}>{isHide ? <IoEyeOffSharp className="text-2xl self-center text-blue-500   pointer-events-none flex-shrink-0" /> : <MdRemoveRedEye className="text-2xl  text-blue-700 self-center pointer-events-none flex-shrink-0" />}</div>}
                                    label="Password"
                                    type={isHide ? "password" : "text"}
                                    variant="flat"
                                />
                            </ModalBody>
                            <ModalFooter className="bg-indigo-200">
                                <Button color="danger" variant="flat" onPress={handleClose}>
                                    Close
                                </Button>
                                <Button color="primary" type="submit">
                                    Sign in
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>
    );
}
