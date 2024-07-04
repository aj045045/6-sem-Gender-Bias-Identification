import HeroHeader from "@/components/Hero";
import LogoNavbar from "@/components/Navbar";
import Service from "@/components/Service";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaUsersViewfinder } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { CgPerformance } from "react-icons/cg";
import Pill from "@/components/Pill";
import Welcome from "@/components/Welcome";

function Home() {
    return (
        <>
            <LogoNavbar />
            <HeroHeader />
            <Welcome />
            <ServiceData />
        </>
    )
}

function ServiceData() {
    interface IconInterface {
        icon: React.ReactElement;
        data: string;
    };
    const iconData: IconInterface[] = [
        { icon: <IoAnalyticsSharp />, data: "Text Analysis" },
        { icon: <FaUsersViewfinder />, data: "Gender Bias Detection  " },
        { icon: <BiSolidCategoryAlt />, data: "Bias Category" },
        { icon: <CgPerformance />, data: "Scalability and Performance" },
    ]

    return (<div className="md:mt-0 mt-40" id="service">
        <Pill text="Product Feature" />
        <div className="md:flex-row flex-col flex md:justify-evenly space-y-10 md:space-y-0 items-center ">
            {iconData.map((value, index) => (
                <Service icon={value.icon} data={value.data} key={index} />
            ))}
        </div >
    </div>)
}

export default Home;