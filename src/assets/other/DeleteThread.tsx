"use client"
import {usePathname , useRouter} from "next/navigation";

import { MdDelete  } from "react-icons/md";
import { deleteThread } from "@/lib/actions/thread.action";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
interface Props {
    threadId:string
    author:string;
    currentUserId:string;
    parentId:string| null;
    isComment?:boolean 
}

export default function DeleteThread({
    threadId,
    currentUserId,
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
            <div className="fixed z-10 inset-0 overflow-y-auto" onClick={() => setShow(false)}>
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center ">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-black opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <button className=" text-accent text-heading3-bold hover:opacity-50 transition-all duration-300" onClick={() => setShow(false)}>X</button>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg font-medium text-gray-200" id="modal-title">
                          Confirm Delete
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-400">
                            Are you sure you want to delete this item? This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    
                    <button
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-accent text-base font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
          </div>}
        </>
        
    )
} 