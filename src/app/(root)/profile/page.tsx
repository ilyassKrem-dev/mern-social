import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

import { redirect } from "next/navigation";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { profileTabs } from "@/assets/tabs-info/Profiletabs";
export default async function Page( ) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  
  
  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
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
                  currentUserId={user.id}
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
