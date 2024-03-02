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
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc"
}:{
    searchString?:string;
    pageNumber?:number;
    pageSize?:number;
    sortBy?:SortOrder;
}) {
    try {
        connectDB()

        const skipAmount = (pageNumber-1)* pageSize

        const regex = new RegExp(searchString,"i")

        const query: FilterQuery<typeof User> = {}
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
            "content.text": { $regex: `@${user.username}` },
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
            select: 'name image id username'
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

export async function getThreadsLikedto(userId:string) {
    try {
        connectDB()
        const user = await User.findOne({id:userId})
        const threads = await Thread.find({
            likedBy:{$in:user._id},
            author:{$ne:user._id}
        })
            .populate({
                path:'author',
                model:User,
                select:"name image id username"
            })
            .populate({
                path:'community',
                model:Community,
                select:'name id image _id'
            })
            .populate({
                path: 'children',
                model: Thread,
                populate: {
                    path: 'author',
                    model: User,
                    select: 'name image id username'
                }
                })
            
    return {threads}
    
    } catch (error:any) {
        throw new Error(`Failes fetching:${error.message}`)
    }
}

export async function fetchSuggestedUsers() {
    try {
        connectDB()
        const allusers = await User.find({})
            .select('-_id id name username image').lean();
        const numberOfUsers = 3
        const shuffleUsers = allusers.sort(() => Math.random()-0.5)
        
        const user = shuffleUsers.slice(0,numberOfUsers)

        return user
    } catch (error:any) {
        throw new Error(`Failed to fetch seggested users: ${error.message}`)
    }
}

export async function fetchUserByUsername(username:string) {
    try {
        connectDB()
        
        
        return User
            .findOne({username:username})
            .populate({
                path:'communities',
                model: Community
            })

    } catch (error:any) {
        throw new Error(`Failed to fetch user: ${error.message}`)
    }

}

export async function DeleteUser(userId:string) {
    try {
        const user = await User.findOne({id:userId})
        if(!user) return 

        const threads = await Thread.find({ author: user._id })

        const communities = await Community.find({ members: user._id });

        await Promise.all(communities.map(async (community) => {
            // Remove user from members list
            community.members = community.members.filter((member:any) => member.toString() !== user._id.toString());
            
            // Remove user's threads from community's threads array
            community.threads = community.threads.filter((thread:any)=> !user.threads.includes(thread.toString()));
            
            await community.save();
        }));

        const threadIds = threads.map(thread => thread._id);

        //delte user Threads
        await Thread.deleteMany({author:user._id})

        //remove User likes
        await Thread.updateMany(
            {likedBy:user._id},
            {$pull:{likedBy:user._id}}
        )

        // remove comments of user
        await Thread.updateMany(
            {children:{$in:threadIds}},
            {$pull:{children:{$in:threadIds}}}
        )

        // delete user
        const deletedUser = await User.findByIdAndDelete(user._id);
        
        return deletedUser
    } catch (error:any) {
        throw new Error(`Failed to delete account: ${error.message}`)
    }

}
