

import UserCard from "@/components/cards/UserCard";
import {fetchUsers } from "@/lib/actions/user.action";

import SearchBar from "@/components/shared/SearchBar";

export default async function Page({searchParams}:{
    searchParams:{[key:string]:string|undefined}
}) {
    


    const result = await fetchUsers({
        searchString:searchParams.q||'',
        pageNumber:1,
        pageSize:25
    })
    

    return (
        <section>
            <h1 className="head-text mb-10">Search</h1>

            {/*Search bar */}
            <SearchBar
            routeType="/search" 
            />
            <div className="mt-14 flex flex-col gap-9">
                {result.users.length === 0 ? (
                    <p className="no-result">No users</p>
                ):(
                    <>
                        {result.users.map(person => {
                            return (
                            <UserCard 
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                username={person.username}
                                imgUrl={person.image}
                                personType="User"
                            />)
                        })}
                    </>
                )}

            </div>
        </section>
    )
}