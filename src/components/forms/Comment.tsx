"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation"
import { CommentValidation } from "@/lib/validation/thread";
import { addCommentToThread } from "@/lib/actions/thread.action"
import { FaImage } from "react-icons/fa6";
import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"
import { ChangeEvent,useState } from "react"
interface Props {
    threadId:string,
    currentUserImg:string,
    currentUserId:string
}

export default function Comment({
    threadId,
    currentUserImg,
    currentUserId}:Props) {
    const [images,setImages] = useState<any[]>([])
    const [files,setFiles] = useState<File[]>([])
    const {startUpload} = useUploadThing('media')
    const pathname = usePathname();
    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues:{
            thread:"",
            images:[]
            
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

    const onSubmit = async (values:z.infer<typeof CommentValidation>) => {
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
        await addCommentToThread(
            threadId,
            values.thread,
            uploadedUrls,
            JSON.parse(currentUserId),
            pathname
        )
        setImages([])
        form.reset()
    }    
    return (
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)} className="comment-form flex-col">
                <FormField
                control={form.control}
                name="thread"
                render={({ field }) => (
                    <FormItem className="flex items-center  gap-3 w-full ">
                        <FormLabel>
                            <Image 
                            src={currentUserImg} alt="Profile image" 
                            width={48} 
                            height={48} className="rounded-full object-cover" />
                        </FormLabel>
                        <FormControl className="border-none bg-transparent">
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Comment..."
                                className="no-focus text-light-1 outline-none"
                                {...field} />
                        </FormControl>

                    </FormItem>
                )}
                />
                <div className="flex flex-wrap gap-3 w-full">
                    {images.map((image,index) => {
                        return (
                            <div key={index} className=" w-[100px]">
                                <Image src={image} alt={`Uploaded ${index}`} width={200} height={200} className="w-full h-full object-cover rounded-lg" />
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-col w-full justify-between items-start sm:items-center sm:flex-row gap-y-6 sm:gap-y-0">
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
                            
                            
                        </FormItem>
                    )}
                
                    />
                    <Button type="submit" className=" comment-form_btn">
                        Reply
                    </Button>
                </div>
            </form >
        </Form >
    )
}