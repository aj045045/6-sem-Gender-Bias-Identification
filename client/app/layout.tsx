import type { Metadata } from "next";
import RootLayout from "./providers";
import "@/css/style.css";

export const metadata: Metadata = {
    title: "Gender Bias Project ",
    description: "Identify Gender Bias in Content",
    icons: "/icons/loading.png",
    authors: [
        {
            name: "Ansh Yadav",
        }
    ]
};

export default RootLayout;
