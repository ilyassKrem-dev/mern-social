import { fetchCommunityPosts } from "@/lib/actions/community.actions"
import { fetchUserPost,getTaggedPosts,getThreadsRepliedto} from "@/lib/actions/user.action"
import { redirect } from "next/navigation"
import ThreadCard from "../cards/ThreadCard"
import { threadLikedByUser } from "@/lib/actions/thread.action"
interface Props{
    currentUserId:string;
    accountId:string;
    accountType:string;
    tabType?:string;
}

const ThreadsTab = async ({
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
        }else if (tabType=="replies") {
            result = await getThreadsRepliedto(accountId)
        } else {
            result = await fetchUserPost(accountId)

        }
        
    }
    if(!result) redirect('/')
    const checkLike = async (threadId:string) => {
        try {
           return await threadLikedByUser(threadId,currentUserId)
        } catch (error:any) {
            throw new Error(`Failed checking: ${error.message}`)
        }
      }
      const checkLikePromises = result.threads.map((thread:any) => checkLike(thread._id));
      const likes = await Promise.all(checkLikePromises);
    return (
        <section className="mt-9 flex flex-col gap-10">
            {result.threads.map((thread:any,index:any) => {
                
                return (
                    <ThreadCard 
                    key={thread._id} 
                    id={thread._id}
                    checkLike={likes[index]}
                    likes={thread.likedBy.length}
                    currentUserId={currentUserId|| ""}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={
                        accountType === "User"&&tabType=="tagged" || tabType=="replies"
                        ?
                        {name:thread.author.name,image:thread.author.image,id:thread.author.id}
                        :
                        accountType === "User"
                        ? 
                        {name:result.name,image:result.image,id:result.id}
                        :
                        {name:thread.author.name,image:thread.author.image,id:thread.author.id}
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