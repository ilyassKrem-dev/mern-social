import { fetchUserPost } from "@/lib/actions/user.action"
import { redirect } from "next/navigation"
import ThreadCard from "../cards/ThreadCard"

interface Props{
    currentUserId:string,
    accountId:string,
    accountType:string
}

const ThreadsTab = async ({
    currentUserId,
    accountId,
    accountType
}: Props) => {

    let result = await fetchUserPost(accountId)
    if(!result) redirect('/')

    return (
        <section className="mt-9 flex flex-col gap-10">
            {result.threads.map((thread:any) => {
                return (
                    <ThreadCard 
                    key={thread._id} 
                    id={thread._id}
                    currentUserId={currentUserId|| ""}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={
                        accountType === "User"
                        ? {name:result.name,image:result.image,id:result.id}
                        :
                        {name:thread.author.name,image:thread.author.image,id:thread.author.id}
                    } // update later
                    community={thread.community} //update later
                    createdAt={thread.createdAt}
                    comments={thread.children}
                    />
                )
            })}
        </section>
    )
}

export default ThreadsTab