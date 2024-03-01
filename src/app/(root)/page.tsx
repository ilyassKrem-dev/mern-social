
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts,threadLikedByUser } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs";
import Pagination from "@/components/shared/Pagination";
export default async function Home({
  searchParams,
}:{searchParams:{[key:string]:string|undefined}}) {
  const results = await fetchPosts(searchParams.page? +searchParams : 1,10);
  const user = await currentUser()
  const checkLike = async (threadId:string) => {
    try {
      if(!user) return false
      return await threadLikedByUser(threadId,user?.id)
    } catch (error:any) {
        throw new Error(`Failed checking: ${error.message}`)
    }
  }
  const checkLikePromises = results.posts.map((post) => checkLike(post._id));
  const likes = await Promise.all(checkLikePromises);
  
  
  return (
    <div >
        <h1 className="head-text text-left">Home</h1>
        <section className="mt-9 flex flex-col gap-10">
            {results.posts.length === 0 ? (
              <p className="no-result">No threads found</p>
            ): (
              <>
                {results.posts.map((post,index) => {
                 
                  
                  return (
                    <ThreadCard 
                      key={post._id} 
                      id={post._id}
                      checkLike={likes[index]}
                      likes={post.likedBy.length}
                      currentUserId={user?.id || ""}
                      parentId={post.parentId}
                      content={post.content}
                      author={post.author}
                      community={post.community}
                      createdAt={post.createdAt}
                      comments={post.children}/>
                      )            
                })}
              </>
            )}
        </section>
        <Pagination 
          path="/"
          isNext={results.isNext}
          pageNumber={searchParams?.page ? +searchParams.page:1}
        />
    </div>
  ) 
}