
import ThreadCard from "@/components/cards/ThreadCard"
import { fetchThreadById, threadLikedByUser } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Comment from "@/components/forms/Comment";

const Page =  async ({params}:{params:{id:string}}) => {
        if (!params.id) return null;

        const user = await currentUser();

        const userInfo = user ? await fetchUser(user.id) : null;
        if (userInfo && !userInfo.onboarded) redirect('/onboarding');

        const thread = await fetchThreadById(params.id);

        const checkLike = user ? await threadLikedByUser(thread._id, user.id) : false;

        const checkLikefunc = async (threadId: string) => {
            try {
                if (user) return await threadLikedByUser(threadId, user.id);
            } catch (error: any) {
                throw new Error(`Failed checking: ${error.message}`);
            }
        };
        const checkLikePromises = thread.children.map((childItem: any) => checkLikefunc(childItem._id));
        
        const likes = user ? await Promise.all(checkLikePromises) : [];
        
        return (    
            <section className="relative">
                <div>
                    <ThreadCard 
                    key={thread._id} 
                    id={thread._id}
                    checkLike={checkLike}
                    likes={thread.likedBy.length}
                    currentUserId={user?.id || ""}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={thread.author}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}/>
                </div>
                <div className="mt-7">
                    {user&&<Comment
                        threadId={thread.id}
                        currentUserImg={userInfo.image || user.imageUrl}
                        currentUserId={JSON.stringify(userInfo._id)} />}
                </div>

                <div className="mt-10 flex flex-col gap-2">
                    {thread.children.map((childItem:any,index:any) => {
                        
                        return (
                            <ThreadCard 
                            key={childItem._id} 
                            id={childItem._id}
                            checkLike={likes[index]}
                            likes={childItem.likedBy.length}
                            currentUserId={user?.id || ""}
                            parentId={childItem.parentId}
                            content={childItem.text}
                            author={childItem.author}
                            community={childItem.community}
                            createdAt={childItem.createdAt}
                            comments={childItem.children}
                            isComment/>
                        )
                    })}
                </div>
            </section>
        )
}


export default Page