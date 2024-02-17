"use server"

import { connectDB } from "../mongoose"
import Thread from "../modules/thread.module"
import User from "../modules/user.module"
import { revalidatePath } from "next/cache"

interface Params {
    text:string,
    author:string,
    communityId:string | null,
    path:string
}

export async function createThread({
    text,author,communityId,path
}:Params) {
    try {
        connectDB()

        const createdThread = await Thread.create({
            text,
            author,
            community: null
        })
    
        // Update
    
        await User.findByIdAndUpdate(author,{
            $push:{threads: createdThread._id}
        })
        revalidatePath(path )
    } catch (error:any) {
        throw new Error(`Error creating thread: ${error.message}`)
    }
   
}