"use client"
import { useEffect, useState } from "react";
import { RiShareLine } from "react-icons/ri";
import SocialMedia from "@/assets/other/SocialMedia";
import { IoCopy } from "react-icons/io5";


export default function ShareThread({threadId}:{threadId:string}) {
    const [show,setShow] = useState(false)
    const Url = process.env.NEXT_PUBLIC_BASE_URL || '';
    const fullUrl = `${Url}/thread/${threadId}`
    const [showText,setShowText] = useState(false)
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
    function handleClick() {
        navigator.clipboard.writeText(fullUrl)
        
        setShowText(true)
    }
    useEffect(() => {
        let id:any
        if(showText) {
            id = setTimeout(() => {
                setShowText(false)
            },2000)
        }

        return () => clearTimeout(id)
    },[showText])
    return (
        <>
            <RiShareLine className=" text-gray-600 text-heading3-bold cursor-pointer hover:text-purple-500 transition-all duration-300" onClick={() => setShow(true)}/>
            {show&&
            <div className="fixed top-0 bg-dark-4/10 bottom-0 right-0 left-0 z-40 flex justify-center items-end sm:items-center">
                <div className="bg-black/90 text-light-1 flex flex-col gap-y-6 items-center p-2 rounded-t-lg sm:rounded-lg relative background w-full   shadow-[0_0px_20px_2px_rgba(255,255,255,1)]  sm:shadow-[0_0px_7px_1px_rgba(255,255,255,1)] sm:w-96 no-doc-scroll">
                    <h4 className=" text-heading3-bold my-3">Share</h4>
                    <div className=" bg-gray-1 w-full h-px"/>
                    <div className="flex items-center gap-3 text-heading3-bold cursor-pointer hover:opacity-50 transition-all duration-300" onClick={handleClick}>
                        <IoCopy />
                        <p className="cursor-pointer">Copy link</p>
                    </div>
                    {showText&&<p className=" text-green-500">Link Copied</p>}
                    <div className=" bg-gray-1 w-full h-px"/>
                    <SocialMedia url={fullUrl}/>
                    <div className="absolute top-2 right-2 cursor-pointer text-body-medium hover:bg-accent rounded-full px-2 py-1 hover:bg-opacity-30 transition-all duration-300" onClick={() => setShow(false)}>
                        X
                    </div>
                </div>
            </div>}
        </>
    )
}