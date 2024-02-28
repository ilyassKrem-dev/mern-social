"use client"

import { RiHeartLine,RiHeartFill  } from "react-icons/ri"
import { likeThread } from "@/lib/actions/thread.action"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { motion,AnimatePresence } from "framer-motion";

export default function LikeButton({id,userId,checkLike}:{id:string,userId:string,checkLike:boolean| undefined}) {
   
    const [previousLiked, setPreviousLiked] = useState<boolean| undefined>(false);
    const pathname = usePathname()
    
    useEffect(() => {
        setPreviousLiked(checkLike);
    }, [checkLike]);
    const handleClick= async ()  => {
        if(!userId) return
        await likeThread(id,userId,pathname)
    }
   
    return (
        <> 
            <AnimatePresence mode="popLayout">
                {checkLike ? (
                    <motion.div
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
