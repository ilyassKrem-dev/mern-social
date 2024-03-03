"use client"

import { RiHeartLine,RiHeartFill  } from "react-icons/ri"
import { likeThread } from "@/lib/actions/thread.action"
import { usePathname } from "next/navigation"
import {  useState } from "react";
import { motion,AnimatePresence } from "framer-motion";

export default function LikeButton({id,userId,checkLike,share}:{id:string,userId:string,checkLike:boolean| undefined,share?:boolean}) {
   
    const [previousLiked, setPreviousLiked] = useState<boolean | undefined>(checkLike);
    const pathname = usePathname()
    
    const handleClick= async ()  => {
        if(share) return
        if(!userId) return
        await likeThread(id,userId,pathname)
    }
   
    return (
        <> 
            <AnimatePresence mode="wait">
                {checkLike ? (
                    <motion.div
                    whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                    animate={{ scale: previousLiked ? 1.1 : 1 }} 
                    transition={{ duration: 0.2 }}
                    >
                    <RiHeartFill
                        className="text-red-600 text-heading3-bold cursor-pointer hover:text-accent"
                        onClick={handleClick}
                    />
                    </motion.div>
                ) : (
                    <motion.div
                    animate={{ scale: previousLiked ? 1.1 : 1 }}
                    whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    >
                    <RiHeartLine
                        className="text-gray-600 text-heading3-bold cursor-pointer hover:text-accent"
                        onClick={handleClick}
                    />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
