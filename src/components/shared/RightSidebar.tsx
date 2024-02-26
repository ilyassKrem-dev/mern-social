"use client"
import { fetchSuggestedUsers } from "@/lib/actions/user.action"
import { fetchSuggestedCommuntity } from "@/lib/actions/community.actions"
import { useEffect, useState } from "react"
import UserCard from "../cards/UserCard"
import CommunityCard from "../cards/CommunityCard"
export default  function  RightSidebar() {
    const [usersResults,setUsersResults] = useState<any[]>([])
    const [communitiesResults,setCommunitiesResults] = useState<any[]>([])
    const fetchUsersAndCommunities = async () => {
        try {
            const usersData = await fetchSuggestedUsers();
            const communitiesData = await fetchSuggestedCommuntity()
            setUsersResults(usersData);
            setCommunitiesResults(communitiesData)
           
        } catch (error:any) {
            throw new Error(`Failed to fetch:${error.message}`)
        }
    };

    useEffect(() => {
        
        fetchUsersAndCommunities()

        const interval = setInterval(fetchUsersAndCommunities, 3 * 60 * 60 * 1000);

        return () => clearInterval(interval)
    },[])
    
    
    return (
        <section className="custom-scrollbar rightsidebar">
            <div className="flex flex-1 flex-col justify-start gap-3">
                <h3 className=" text-heading4-medium text-light-1">Suggested Communities</h3>
                <div className="flex flex-col gap-y-6 mt-5">
                    {communitiesResults.map(community => {
                        return (
                            <CommunityCard
                            key={community.id}
                            id={community.id}
                            name={community.name}
                            username={community.username}
                            imgUrl={community.image}
                            bio={community.bio}
                            members={community.members}
                            suggest="bar"
                            />
                        )
                    })}

                </div>
            </div>
            <div className="flex flex-1 flex-col justify-start gap-3">
                <h3 className=" text-heading4-medium text-light-1">Suggested Users</h3>
                <div className="flex flex-col gap-y-6 mt-5">
                    {usersResults.map((result) => {
                        return (
                            <UserCard
                                key={result.id}
                                id={result.id}
                                name={result.name}
                                username={result.username}
                                imgUrl={result.image}
                            />
                        )
                    })}

                </div>
            </div>
        </section>
    )
}