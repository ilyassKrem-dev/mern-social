

import UserCard from "@/components/cards/UserCard";
import {fetchUsers } from "@/lib/actions/user.action";

import SearchBar from "@/components/shared/SearchBar";
import Pagination from "@/components/shared/Pagination";
export default async function Page({searchParams}:{
    searchParams:{[key:string]:string|undefined}
}) {
    


    const result = await fetchUsers({
        searchString:searchParams.q||'',
        pageNumber:searchParams.page ? +searchParams.page : 1,
        pageSize:10
    })
    

    return (
        <>
            {result?
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
                <Pagination 
                    path='/'
                    isNext={result.isNext}
                    pageNumber={searchParams?.page ? +searchParams.page : 1}
                />
            </section>
            :
            <p className=" text-gray-1 text-heading4-medium text-center">Loading...</p>}
        </>
    )
}