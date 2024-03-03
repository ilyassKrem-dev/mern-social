"use client"
import { useEffect, useState } from "react";
import { RiShareLine } from "react-icons/ri";
import SocialMedia from "@/assets/other/SocialMedia";


export default function ShareThread({threadId}:{threadId:string}) {
    const [show,setShow] = useState(false)
    const Url = process.env.NEXT_PUBLIC_BASE_URL || '';
    const fullUrl = `${Url}/thread/${threadId}`
    
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".background");
          if (overlay && !overlay.contains(event.target)) {
            
            setShow(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    
    return (
        <>
            <RiShareLine className=" text-gray-600 text-heading3-bold cursor-pointer hover:text-purple-500 transition-all duration-300" onClick={() => setShow(true)}/>
            {show&&
            <div className="fixed top-0 bg-dark-4/10 bottom-0 right-0 left-0 z-40 flex justify-center items-center">
                <div className="bg-dark-4 text-light-1 flex flex-col gap-y-4 items-center p-2 rounded-lg relative background">
                    <h4 className=" text-heading3-bold my-6">Share</h4>
                    
                    <div className="bg-white text-black overflow-x-scroll w-64 [&::-webkit-scrollbar]:hidden rounded-md p-2 font-bold">
                        {fullUrl}
                    </div>
                    <SocialMedia url={fullUrl}/>
                    <div className="absolute top-2 right-2 cursor-pointer text-body-medium hover:bg-accent rounded-full px-2 py-1 hover:bg-opacity-30 transition-all duration-300" onClick={() => setShow(false)}>
                        X
                    </div>
                </div>
            </div>}
        </>
    )
}