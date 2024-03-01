
import { SignIn } from "@clerk/nextjs";
import BackHome from "@/assets/other/BackHome";

export default function Page() {
  return (
  <div className="flex flex-col items-center justify-center gap-y-6">
    <SignIn />
    <BackHome />
  </div>
  );
}