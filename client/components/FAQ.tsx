'use client'

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Pill from "./Pill";
import { FaQuestion } from "react-icons/fa";
import { LuPanelTopClose } from "react-icons/lu";
function FAQ() {
    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    return (<>
        <Pill text="FAQs" />
        <Accordion variant="splitted">
            <AccordionItem key="1" aria-label="accordion-1" indicator={(({ isOpen }) => (isOpen ? <LuPanelTopClose /> : <FaQuestion />))} title="What is the Usage" className="w-1/2 mx-auto">
                {defaultContent}
            </AccordionItem>
        </Accordion>
    </>)
}

export default FAQ;