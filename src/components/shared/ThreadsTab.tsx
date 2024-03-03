import { fetchCommunityPosts } from "@/lib/actions/community.actions"
import { fetchUserPost,getTaggedPosts,getThreadsLikedto} from "@/lib/actions/user.action"
import { redirect } from "next/navigation"
import ThreadCard from "../cards/ThreadCard"
import { threadLikedByUser } from "@/lib/actions/thread.action"
interface Props{
    userId?:string;
    currentUserId:string|undefined;
    accountId:string;
    accountType:string;
    tabType?:string;
}

const ThreadsTab = async ({
    userId,
    currentUserId,
    accountId,
    accountType,
    tabType
}: Props) => {

    let result:any
    if(accountType==="Community") {
        result = await fetchCommunityPosts(accountId)
    } else {
        if(tabType=="tagged") {
            result = await getTaggedPosts(accountId)
        }else if (tabType=="likes") {
            result = await getThreadsLikedto(accountId)
        } else {
            result = await fetchUserPost(accountId)

        }
        
    }
    if(!result) redirect('/')
    
    const checkLike = async (threadId:string) => {
        try {
           if(!currentUserId) return
           return await threadLikedByUser(threadId,currentUserId)
        } catch (error:any) {
            throw new Error(`Failed checking: ${error.message}`)
        }
      }
      const checkLikePromises = result.threads.map((thread:any) => checkLike(thread._id));
      const likes = await Promise.all(checkLikePromises);
    return (
        <section className="mt-9 flex flex-col gap-10">
            {accountType === "User" 
            ?
            result.threads.map((thread:any,index:any) => {
                
                return (
                    <ThreadCard 
                    key={thread._id} 
                    id={thread._id}
                    checkLike={likes[index]}
                    likes={thread.likedBy.length}
                    currentUserId={currentUserId|| ""}
                    parentId={thread.parentId}
                    content={thread.content}
                    author={
                        tabType=="tagged" || tabType=="likes"
                        ?
                        {name:thread.author.name,image:thread.author.image,id:thread.author.id,username:thread.author.username}
                        :
                        {name:result.name,image:result.image,id:result.id,username:result.username}
                        
                    } 
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                    />
                )
            })
            :
            result.threads.map((thread:any,index:any) => {
                
                return (
                    <ThreadCard 
                    key={thread._id} 
                    id={thread._id}
                    checkLike={likes[index]}
                    likes={thread.likedBy.length}
                    currentUserId={currentUserId|| ""}
                    parentId={thread.parentId}
                    content={thread.content}
                    author={
                        {name:thread.author.name,image:thread.author.image,id:thread.author.id,username:thread.author.username}
                    } 
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                    />
                )
            })}
        </section>
    )
}

export default ThreadsTab