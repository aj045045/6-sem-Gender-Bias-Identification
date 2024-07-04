
'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal"
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { remove_error } from "@/redux/feature/error";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


export default function ErrorTag() {
    const error = useSelector((state: RootState) => state.error);
    const dispatch = useDispatch<AppDispatch>();

    interface ErrorData {
        [key: string]: {
            type: string;
            image: string;
            text: string;
            textColor: string;
            bgColor: string;
            modal: string;
        };
    }
    const { isOpen, onOpen, onClose } = useDisclosure();
    const errorData: ErrorData = {
        "success": {
            type: "Success",
            image: "success.svg",
            text: "Congratulations !",
            textColor: "text-emerald-600",
            bgColor: "bg-emerald-200",
            modal: "bg-emerald-50"
        },
        "warning": {
            type: "Warning",
            image: "warning.svg",
            text: "Warning",
            textColor: "text-yellow-600",
            bgColor: "bg-yellow-200",
            modal: "bg-yellow-50"
        },
        "alert": {
            type: "Alert",
            image: "error.svg",
            text: "Something went wrong !",
            textColor: "text-rose-600",
            bgColor: "bg-rose-200",
            modal: "bg-rose-50"
        },
    };
    const dataToggle = errorData[error.type];
    useEffect(() => {
        if (error.setError) {
            const openModel = () => {
                setTimeout(() => {
                    if (error.setError) {
                        onOpen();
                    }
                    setTimeout(() => {
                        dispatch(remove_error());
                        onClose();
                    }, 3000);
                }, 1000);
            }
            openModel();
        }
    });
    return (
        <>
            <Modal
                size="md"
                backdrop="opaque"
                isOpen={isOpen}
                onClose={onClose}
                isDismissable={false}
                className={`flex self-start mt-5 ${dataToggle?.modal}`}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader
                                className={`flex select-none flex-col gap-1 font-sans ${dataToggle?.bgColor} capitalize text-xl tracking-wider`}
                            >
                                <div className={dataToggle?.textColor}>
                                    {dataToggle?.type}
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <Image
                                    src={`/icons/${dataToggle?.image}`}
                                    alt="denied"
                                    className="w-80 select-none mx-auto mt-5 h-40"
                                    width={1}
                                    height={1}
                                    unoptimized={true}
                                />
                                <div
                                    className={`font-bold text-xl select-none my-3 md:text-2xl text-center ${dataToggle?.textColor}`}
                                >
                                    {dataToggle?.text}
                                </div>
                                <div className="text-center text-stone-500 tracking-wide md:text-lg text-base md:font-semibold select-none">
                                    {error.data}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    className="text-lg font-semibold text-white w-24 rounded-lg bg-orange-600 hover:bg-orange-500 shadow-md shadow-orange-400 border-b-4 border-b-orange-700 mx-auto"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}