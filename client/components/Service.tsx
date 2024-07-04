import { Card, CardBody } from "@nextui-org/react";

function Service({ icon, data }: { icon: React.ReactElement; data: string; }) {
    return (
        <>
            <Card
                isPressable
                isBlurred
                className="border-none shadow-lg shadow-green-400 md:mt-0  h-44 md:h-56 w-56"
                shadow="sm"

            >
                <CardBody className="items-center flex bg-green-200">
                    <div className="text-green-700 border-3 md:mt-10 mt-5 bg-green-200 shadow-lg shadow-green-600 md:p-2 p-1 md:text-4xl text-3xl rounded-full border-green-500">{icon}</div>
                    <div className="md:text-xl text-lg hyphens-auto text-center font-sans font-bold mt-8 text-gray-700 capitalize tracking-wide">{data}</div>
                </CardBody>
            </Card>
        </>
    )
}

export default Service;