"use client"
import { MdDeleteForever } from "react-icons/md";
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import Doverlay from "./Doverlay";
export default function DeleteAccount({authUserId}:{authUserId:string}) {

    const [show,setShow] = useState<boolean>(false)
    const {signOut} = useClerk()
    const handleDelete = async () => {
        try {
          signOut();
          const response = await fetch('/api/private', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId:authUserId }),
          });
          if (response.ok) {
            console.log('Deleted');
          } else {
            // Handle error
            const responseData = await response.json();
            console.error('Failed to delete user:', responseData.error);
          }
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }

    return (
        <>
            <div className="text-accent cursor-pointer hover:opacity-60 transition-all duration-300 flex  items-center gap-x-4" onClick={() => setShow(true)}>
                <MdDeleteForever />  
                <p className=" cursor-pointer">Delete account</p>
            </div>
            {show&&
            <Doverlay setShow={setShow} type="account" handleDelete={handleDelete}/>}
        </>
    )
}