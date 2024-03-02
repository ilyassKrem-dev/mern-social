import { communityTabs } from "@/assets/tabs-info/Communitytabs";
import { currentUser } from "@clerk/nextjs";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import UserCard from "@/components/cards/UserCard";
export default async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const communityDetails = await fetchCommunityDetails(params.id)

  const threadsTabContent = await ThreadsTab({
    currentUserId: user.id,
    accountId: communityDetails._id,
    accountType: "Community",
  });
  return (
    <section>
      <ProfileHeader
        accountId={communityDetails.id}
        authUserId={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image}
        bio={communityDetails.bio}
        type="Community"
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {communityTabs.map((tab) => {
              return (
                <TabsTrigger key={tab.label} value={tab.value} className="tab">
                  <div>{tab.icon}</div>
                  <p className="max-sm:hidden cursor-pointer ">{tab.label}</p>
                  {tab.label === "Threads" && (
                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2 cursor-pointer">
                      {communityDetails?.threads?.length}
                    </p>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
            <TabsContent
            value="threads"
            className="w-full text-light-1"
            >
            {threadsTabContent}
            </TabsContent>
            <TabsContent
            value="members"
            className="w-full text-light-1"
            >
                <section className="mt-9 flex flex-col gap-10">
                    {communityDetails?.members.map((member:any) => {
                        return (
                            <UserCard
                            key={member.id}
                            id={member.id}
                            name={member.name}
                            username={member.username}
                            imgUrl={member.image}
                            personType="User"
                            />
                        )
                    })}
                </section>
            </TabsContent>
            <TabsContent
            value="requests"
            className="w-full text-light-1"
            >
            
            </TabsContent>
           
        </Tabs>
      </div>
    </section>
  );
}
