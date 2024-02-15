"use client"
import { sidebarLinks } from "@/assets/tabs-info/Sidebarlinks"
import { SignOutButton,SignedIn } from "@clerk/nextjs"
import { RiLogoutBoxLine } from "react-icons/ri";
import Link from "next/link"
import { usePathname , useRouter } from "next/navigation"
export default function LeftSidebar() {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                {sidebarLinks.map(link => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

                    return (
                        <Link href={link.route} key={link.label} className={`leftsidebar_link items-center  ${isActive && "bg-accent"} hover:opacity-60 transition-all duration-300`}>
                            <div className={`text-white text-heading4-medium`}>
                                {link.logo}
                            </div>
                            
                            <p className="text-light-1 max-lg:hidden cursor-pointer ">{link.label}</p>
                        </Link>
                    )
                })}
            </div>
            <div className="mt-10 px-6">
                <SignedIn>
                    <SignOutButton signOutCallback={() => router.push('/')}>
                        <div className=" cursor-pointer flex gap-4 p-4 items-center group">
                            <RiLogoutBoxLine className="text-white text-heading2-semibold group-hover:text-accent transition-all duration-300"/>
                            <p className="text-light-2 max-lg:hidden group-hover:text-accent transition-all duration-300 cursor-pointer">Logout</p>
                        </div>

                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    )
}