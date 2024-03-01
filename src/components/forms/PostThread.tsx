"use client"
import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useOrganization } from "@clerk/nextjs"
import { z } from "zod"
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { usePathname , useRouter} from "next/navigation"
import { FaImage } from "react-icons/fa6";
import Image from "next/image"
import { threadValidation } from "@/lib/validation/thread";
import { createThread } from "@/lib/actions/thread.action";
import { Input } from "@/components/ui/input"
import { ChangeEvent, useState } from "react"
import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"


export default function PostThread({userId}:{userId:string}) {
    const [images,setImages] = useState<any[]>([])
    const [files,setFiles] = useState<File[]>([])
    const router = useRouter();
    const {startUpload} = useUploadThing('media')
    const pathname = usePathname();
    const {organization} = useOrganization()
    const form = useForm({
        resolver: zodResolver(threadValidation),
        defaultValues:{
            thread:"",
            images:[],
            accountId:userId
        }
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
    
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            const remainingFiles = newFiles.slice(0, 4 - files.length); // Limit to at most 4 new files
    
            const readNextFile = (files: File[]) => {
                if (files.length === 0) return;
    
                const file = files.shift();
                const fileReader = new FileReader();
    
                fileReader.onload = (e) => {
                    // Check if the file type is an image
                    if (file && file.type.includes('image')) {
                        setImages(prevImages => [...prevImages, fileReader.result]);
                        setFiles(prevFiles => [...prevFiles, file]);
                        
                        
                    }
    
                    // Continue to read the next file
                    readNextFile(files);
                };
    
                fileReader.readAsDataURL(file as File);
            };
    
            readNextFile(remainingFiles);
        }
    };
    
    
    const onSubmit = async (values:z.infer<typeof threadValidation>) => {
        const uploadedUrls: string[] = [];

        // Use Promise.all to wait for all uploads to complete
        await Promise.all(images.map(async (image, index) => {
            const blob = image;
            const hasImageChanged = isBase64Image(blob);
    
            if (hasImageChanged) {
                const imgRes = await startUpload([files[index]]);
                
                if (imgRes && imgRes[0].url) {
                    uploadedUrls.push(imgRes[0].url);
                }
            }
        }));
        
       await createThread({
        text:values.thread,
        images:uploadedUrls,
        author:userId,
        communityId:organization ? organization.id:null,
        path:pathname
       })

       router.push('/')
    }
    
    return (
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col justify-start gap-6">
                <FormField
                control={form.control}
                name="thread"
                render={({ field }) => (
                    <FormItem className="flex flex-col  gap-3 w-full ">
                        <FormLabel className="text-base-semibold text-light-2">
                            Content
                        </FormLabel>
                        <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                            <Textarea
                                rows={10} 
                                className=" resize-none"
                                {...field} />
                        </FormControl>
                        <FormMessage />
                        
                    </FormItem>
                )}
                
                />
                <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                    <FormItem className=" w-0">
                        <FormLabel className=" text-light-2 cursor-pointer group  ">
                            <FaImage className="text-heading3-bold text-blue group-hover:opacity-50 transition-all duration-300"/>
                        </FormLabel>
                        <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                            <Input
                                type="file"
                                multiple
                                accept='image/*'
                                className=" hidden"
                                onChange={handleChange}
                                 />
                        </FormControl>
                        <FormMessage />
                        
                    </FormItem>
                )}
            
                />
                <div className="flex flex-wrap gap-3">
                    {images.map((image,index) => {
                        return (
                            <div key={index} className=" w-[190px]">
                                <Image src={image} alt={`Uploaded ${index}`} width={100} height={100} className="w-full h-full object-cover" />
                            </div>
                        )
                    })}
                </div>
                <Button type="submit" className="bg-accent">
                    Post Thread
                </Button>
            </form >
        </Form >
    )
}