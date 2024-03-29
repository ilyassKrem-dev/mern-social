import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs"
import PostThread from "@/components/forms/PostThread";
import { redirect } from "next/navigation"
export default async function Page() {
    const user = await currentUser()
    if(!user) return null;

    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) redirect('/onboarding');

    return(
        <>
            <h1 className="head-text">Create Thread</h1>

            <PostThread userId={userInfo._id.toString()}/>
        </>

    )
}