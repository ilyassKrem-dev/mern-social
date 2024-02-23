"use client"
import { fetchSuggetedUsers } from "@/lib/actions/user.action"
import { useEffect, useState } from "react"
import UserCard from "../cards/UserCard"

export default  function RightSidebar() {
    const [userResults,setUserResults] = useState<any[]>([])
    const fetchUsers = async () => {
        try {
            const usersData = await fetchSuggetedUsers();
            // Ensure each user object is converted to plain JavaScript object
            const plainUsers = usersData.map(user => {
                // Check if user object has toJSON method, if yes, convert to plain object
                if (user && typeof user.toJSON === 'function') {
                    return user.toJSON();
                }
                return user;
            });
            setUserResults(plainUsers);
        } catch (error) {
            console.error("Error fetching suggested users:", error);
        }
    };

    useEffect(() => {
        fetchUsers()

        const interval = setInterval(fetchUsers, 3 * 60 * 60 * 1000);

        return () => clearInterval(interval)
    },[])


    return (
        <section className="custom-scrollbar rightsidebar">
            <div className="flex flex-1 flex-col justify-start">
                <h3 className=" text-heading4-medium text-light-1">Suggested Communities</h3>

            </div><div className="flex flex-1 flex-col justify-start gap-3">
                <h3 className=" text-heading4-medium text-light-1">Suggested Users</h3>
                <div className="flex flex-col gap-y-6 mt-5">
                    {userResults.map((result) => {
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