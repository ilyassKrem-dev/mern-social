"use client"
import {usePathname , useRouter} from "next/navigation";

import { MdDelete  } from "react-icons/md";
import { deleteThread } from "@/lib/actions/thread.action";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Doverlay from "./Doverlay";
interface Props {
    threadId:string
    author:string;
    parentId:string| null;
    isComment?:boolean 
}

export default function DeleteThread({
    threadId,
    author,
    parentId,
    isComment
}:Props) {
    
    const [show,setShow] = useState<boolean>(false)
    const pathname = usePathname()
    const router = useRouter()
    const {userId} = useAuth()
    if(!userId) return null
    if(author !== userId || pathname==="/") return null
    const handleDelete = async() => {
        await deleteThread(threadId,pathname)
        if(!parentId || !isComment) {
            router.push('/')
        }
    }
   
    return (
        <>
            <MdDelete className="text-accent cursor-pointer hover:opacity-50 transition-all duration-300 text-heading4-medium" onClick={() => setShow(true)}/>
            {show&&
            <Doverlay setShow={setShow} type="post" handleDelete={handleDelete} />}
        </>
        
    )
} 