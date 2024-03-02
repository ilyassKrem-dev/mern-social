import { fetchUserByUsername } from "@/lib/actions/user.action";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { profileTabs } from "@/assets/tabs-info/Profiletabs";
import { currentUser } from "@clerk/nextjs";
export default async function Page({ params }: { params: { username: string } }) {
  
  const userInfo = await fetchUserByUsername(params.username);
  if(!userInfo) {
    return (
      <p className=" text-gray-1 text-heading3-bold text-center">User not found</p>
    )
  }
  const user = await currentUser()
  
  
  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => {
              return (
                <TabsTrigger key={tab.label} value={tab.value} className="tab">
                  <div>{tab.icon}</div>
                  <p className="max-sm:hidden cursor-pointer ">{tab.label}</p>
                  {tab.label === "Threads" && (
                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2 cursor-pointer">
                      {userInfo?.threads?.length}
                    </p>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {profileTabs.map((tab) => {
            
            
            return (
              <TabsContent
                key={`content-${tab.label}`}
                value={tab.value}
                className="w-full text-light-1"
              >
                {/*typeScript warning ignore */}
                <ThreadsTab
                  userId={userInfo.id}
                  currentUserId={user?.id}
                  accountId={userInfo.id}
                  accountType= "User"
                  tabType={tab.value}
                />
                
              </TabsContent>
              
            );
          })}
          <TabsContent
                key={`content-`}
                value={"hello"}
                className="w-full text-light-1"
              >
                hello
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
