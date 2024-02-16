"use client"
import { sidebarLinks } from "@/assets/tabs-info/Sidebarlinks"
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Bottombar() {
    const pathname = usePathname()
    return (
        <section className="bottombar">
            <div className="bottombar_container">
                {sidebarLinks.map(link => {
                        const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

                        return (
                            <Link href={link.route} key={link.label} className={`bottombar_link items-center  ${isActive && "bg-accent"} hover:opacity-60 transition-all duration-300`}>
                                <div className={`text-white text-heading4-medium`}>
                                    {link.logo}
                                </div>
                                
                                <p className="text-light-1 max-sm:hidden cursor-pointer text-subtle-medium ">
                                    {link.label.split(/\s+/)[0]}
                                </p>
                            </Link>
                        )
                    })}
            </div>
        </section>
    )
}