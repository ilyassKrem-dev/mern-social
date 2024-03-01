"use client"
import Image from "next/image"
import { useEffect, useState } from "react";
export default function ContentImages({images}:{images:string[]}) {
    if(images.length ===0) return null;
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

    const handleClick = (image: string) => {
        setEnlargedImage(image);
      };
    
    const handleClose = () => {
        setEnlargedImage(null);
      };
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".background");
          if (overlay && !overlay.contains(event.target)) {
            
            handleClose()
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, [enlargedImage]);

    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {images.map((image,index) => {
                return (
                    <div className="w-[100px] sm:w-[150px] max-[300px]:w-[60px]" key={index}>
                        <Image src={image} alt={`image ${index}`} width={200} height={200} className="w-full h-full object-cover rounded-xl cursor-pointer hover:opacity-50 transition-all duration-200"
                        onClick={() => handleClick(image)}/>
                    </div>
                )
            })}
            {enlargedImage && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center bottom-0 right-0 z-50 no-doc-scroll">
            <div className=" p-4 rounded-lg w-[80%] sm:w-[60%] sm:h-[70%] flex flex-col gap-2 items-center justify-center relative background">
                <button className=" hover:bg-gray-400 hover:bg-opacity-40  text-light-1 transition-all duration-300 text-heading4-medium px-3 py-1 rounded-full absolute -top-10 sm:-top-16 left-0" onClick={handleClose}>
                    X
                </button>
                <Image src={enlargedImage} width={600} height={600} alt="Enlarged" className="max-w-full max-h-full rounded-lg " />
                <div className="flex mt-2">
                    {images.map((image, index) => (
                        <div className="w-[90px] h-[90px] mr-2" key={index}>
                            <Image 
                                src={image} 
                                alt={`image ${index}`} 
                                width={200} 
                                height={200} 
                                className="w-full h-full object-cover cursor-pointer hover:opacity-50 transition-all duration-200 rounded-xl"
                                onClick={() => setEnlargedImage(image)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            </div>
        )}
        </div>
    )
}