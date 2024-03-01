"use client"
import { useRouter } from "next/navigation";
import { FaArrowCircleLeft } from "react-icons/fa";
import { motion } from "framer-motion";
export default function BackHome() {
    const router = useRouter()


    return (
        <motion.div
        initial={{opacity:0}} 
        animate={{opacity:1}}
        transition={{duration:1,ease:"easeInOut"}}
        className=" bg-[#103fef] p-3 text-light-1 flex justify-center items-center gap-4 rounded-xl text-heading3-bold cursor-pointer hover:text-blue transition-all duration-200 group" onClick={() => router.push('/')}> 
            <FaArrowCircleLeft />
            <p className=" hidden group-hover:block cursor-pointer ">Home</p>
            
        </motion.div>
    )
}