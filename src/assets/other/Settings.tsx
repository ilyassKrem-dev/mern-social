"use client"
import { useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";


export default function Settings({authUserId}:{authUserId:string}) {
    const [show,setShow] = useState<boolean>(false)
    const router = useRouter()
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
  
    useEffect(() => {
        const handleBodyClick = (event:any) => {
          if (show && !event.target.closest('.modal-container')) {
            // Enable scrolling if the modal is open and the click is outside the modal
            document.body.style.overflow = 'visible';
          }
        };
    
        const handleWindowResize = () => {
          // Enable scrolling if the window width is greater than or equal to 640px (adjust as needed)
          if (!show || window.innerWidth >= 640) {
            document.body.style.overflow = 'visible';
          } else {
            document.body.style.overflow = 'hidden';
          }
        };
    
        if (show) {
          // Disable scrolling when the modal is open
          handleWindowResize();
          // Add event listeners to handle clicks outside the modal and window resize
          document.body.addEventListener('click', handleBodyClick);
          window.addEventListener('resize', handleWindowResize);
        } else {
          // Enable scrolling when the modal is closed
          document.body.style.overflow = 'visible';
          // Remove event listeners when the modal is closed
          document.body.removeEventListener('click', handleBodyClick);
          window.removeEventListener('resize', handleWindowResize);
        }
    
        // Cleanup on unmount
        return () => {
          document.body.style.overflow = 'visible';
          document.body.removeEventListener('click', handleBodyClick);
          window.removeEventListener('resize', handleWindowResize);
        };
      }, [show]);
      
    const handleDelete = async () => {
      try {
        const response = await fetch("https://mern-social-beta.vercel.app/api/webhook/clerk",{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            eventType:"user.deleted",
            data:{
              userId:authUserId
            }
          })
        })
        if(!response.ok) {
          throw new Error('Failed to delete account')
        }
        const resonseData = await response.json()
        console.log('Response: ', resonseData)
        router.push('/')
      } catch (error:any) {
        throw new Error(`Failed to delete: ${error.message}`)
      } 
    }
    
    return (
        <div className="relative">
            <IoMdSettings className={`text-white text-heading3-bold cursor-pointer hover:opacity-60 transition-all duration-300 ${show && "sm:hidden"}`} onClick={() => setShow(true)} />
            {show&&
            <div className={`fixed bg-black/40 top-0 bottom-0 right-0 left-0  flex justify-center items-end z-40 sm:absolute sm:top-auto sm:left-auto sm:right-0 sm:bottom-auto sm:px-2  sm:w-[16rem] `}>
                <div className="bg-[rgba(0,0,0,1.00)] flex flex-col w-full text-light-1  gap-5 rounded-t-2xl p-6 background shadow-[0_0px_20px_2px_rgba(255,255,255,1)] sm:rounded-xl sm:shadow-[0_0px_7px_1px_rgba(255,255,255,1)]"  >
                    <div className=" cursor-pointer hover:opacity-60 transition-all duration-300 flex items-center gap-4" onClick={() => router.push('/profile/edit')}>
                        <CiEdit />
                        <p className=" cursor-pointer">Edit profile</p>
                    </div>
                    <div className="text-accent cursor-pointer hover:opacity-60 transition-all duration-300 flex  items-center gap-x-4" onClick={handleDelete}>
                        <MdDeleteForever />  
                        <p className=" cursor-pointer">Delete account</p>
                    </div>
                    <button className="text-white cursor-pointer hover:opacity-60 transition-all duration-300 sm:hidden border rounded-full border-white p-2" onClick={() => setShow(false)}>
                        Cancel
                    </button>
                </div>
            </div>}
        </div>
    )
}