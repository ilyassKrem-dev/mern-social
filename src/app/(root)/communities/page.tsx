

import CommunityCard from "@/components/cards/CommunityCard";
import UserCard from "@/components/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function Page() {
    const user = await currentUser()
    if(!user) return null
    const userInfo = await fetchUser(user.id)
    if(!userInfo?.onboarded) redirect('/onboarding')
    //fetching
    const result = await fetchCommunities({
        searchString:'',
        pageNumber:1,
        pageSize:25
    })
    

    return (
        <section>
            <h1 className="head-text mb-10">Search</h1>

            {/*Search bar */}
            <div className="mt-14 flex flex-col gap-9">
                {result.communities.length === 0 ? (
                    <p className="no-result">No users</p>
                ):(
                    <>
                        {result.communities.map(communitie => {
                            return (
                            <CommunityCard 
                                key={communitie.id}
                                id={communitie.id}
                                name={communitie.name}
                                username={communitie.username}
                                imgUrl={communitie.image}
                                bio={communitie.bio}
                                members={communitie.members}
                                
                            />)
                        })}
                    </>
                )}

            </div>
        </section>
    )
}