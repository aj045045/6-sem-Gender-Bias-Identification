"use client";
import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import Image from "next/image";

export default function LogoNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    interface menuItemInterface {
        name: string,
        link: string
    };
    const menuItems: menuItemInterface[] = [
        { name: "Profile", link: "#" },
        { name: "Dashboard", link: "#" },
        { name: "Activity", link: "#" }
    ]

    const handleSignUp = () => {
    }
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} position="sticky" >
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
                        <Link color="foreground" href={item.link}>
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button onClick={handleSignUp} color="primary" variant="flat">
                        Sign In
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem className="select-none" key={`${item}-${index}`}>
                        <Link
                            color="foreground"
                            className="w-full"
                            href={item.link}
                            size="lg"
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar >
    );
}
