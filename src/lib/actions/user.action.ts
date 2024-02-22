"use server"
import Community from "../models/community.model";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

import { connectDB } from "../mongoose"

import mongoose, { FilterQuery, SortOrder } from "mongoose";

interface Params {
    userId:string,
    username:string,
    name:string,
    bio:string,
    image:string,
    path:string,
}

export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path,
    }:Params):Promise<void> {
    connectDB();
    
    try {
        await User.findOneAndUpdate(
            {id:userId},
            {username:username.toLowerCase(),
            name,
            bio,
            image,
            onboarded:true},
            {upsert:true});
            if(path === "/profile/edit") {
                revalidatePath(path)
            }
    } catch (error:any) {
        throw new Error(`Failed to update/create user ${error.message}`)
    }
}

export async function fetchUser(userId:string) {
    try {
        connectDB()
        return User
            .findOne({id:userId})
            .populate({
                path:'communities',
                model: Community
            })
    } catch (error:any) {
        throw new Error(`Failed to fetch user: ${error.message}`)
    }
}

export async function fetchUserPost(userId:string) {
    try {
        connectDB()
        // Community later
        const threads = await User.findOne({id:userId})
            .populate({
                path:'threads',
                model: Thread,
                populate:[
                    {
                        path:"community",
                        model: Community,
                        select:"name id image _id"
                    },
                    {
                    path:'children',
                    model:Thread,
                    populate:{
                        path:'author',
                        model:User,
                        select:"name image id"
                    }
                }
            ]
            })
            return threads
            
    } catch (error:any) {
        throw new Error(`Error fetching User Posts: ${error.message}`)
    }
}

export async function fetchUsers({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc"
}:{
    userId:string;
    searchString?:string;
    pageNumber?:number;
    pageSize?:number;
    sortBy?:SortOrder;
}) {
    try {
        connectDB()

        const skipAmount = (pageNumber-1)* pageSize

        const regex = new RegExp(searchString,"i")

        const query: FilterQuery<typeof User> = {
            id:{$ne:userId}
        }
        if(searchString.trim() !== '' ) {
            query.$or = [
                {username:{ $regex:regex}},
                {name:{ $regex:regex}}
            ]
        }

        const sortOptions = {
            createdAt: sortBy
        }
        const usersQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize)

        const totalUserCount = await User.countDocuments(query)
        
        const users = await usersQuery.exec()
      
        const isNext = totalUserCount > skipAmount + users.length
        
        return {users,isNext}
    } catch (error:any) {
        throw new Error(`Error fetching Users: ${error.message}`)
    }
}

export async function getActivity(userId:string) {

    try {
        connectDB();
        const userThreads = await Thread.find({author:userId})
        
        
        const childThreadIds:mongoose.Types.ObjectId[] = userThreads.reduce((acc,userThread) => {
            return acc.concat(userThread.children)
        } , [])
        const replies = await Thread.find({
            _id:{$in: childThreadIds},
            author:{$ne:userId}
        }).populate({
            path:'author',
            model:User,
            select:'name image _id'
        })
        
        return replies
    } catch (error:any) {
         throw new Error(`Error fetching activity: ${error.message}`)
    }

}

export async function getTaggedPosts(userId:string) {
    try {
        connectDB()
        const user = await User.findOne({id:userId})
        const threads = await Thread.find({
            text: { $regex: `@${user.username}` },
            author: { $ne: user._id } 
        })
        .populate({
            path: 'community',
            model: Community,
            select: 'name id image _id'
        })
        .populate({
            path: 'author',
            model: User,
            select: 'name image id'
        })
        .populate({
            path: 'children',
            model: Thread,
            populate: {
            path: 'author',
            model: User,
            select: 'name image id'
            }
        });
        
        return {threads}
    } catch (error:any) {
        throw new Error(`Failes fetching:${error.message}`)
    }

}

export async function getThreadsRepliedto(userId:string) {
    try {
        connectDB()
        const user = await User.findOne({id:userId})

        const threadsSearch = await Thread.find({ parentId: { $exists: true }, author: user._id })

        const parentIds = threadsSearch.map(thread => thread.parentId); 

        const parentObjectIds = parentIds.map(id => {
            const newId = new mongoose.Types.ObjectId(id)
            return newId
        });
        
        const threads = await Thread.find({
            _id: { $in: parentObjectIds },
            author: { $ne: user._id } 
            })
            .populate({
            path: 'community',
            model: Community,
            select: 'name id image _id'
            })
            .populate({
            path: 'author',
            model: User,
            select: 'name image id'
            })
            .populate({
            path: 'children',
            model: Thread,
            populate: {
                path: 'author',
                model: User,
                select: 'name image id'
            }
            })
            
    return {threads}
    
    } catch (error:any) {
        throw new Error(`Failes fetching:${error.message}`)
    }
}