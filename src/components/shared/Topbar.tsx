import Link from "next/link"
import Image from "next/image"
import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs"
import { RiLogoutBoxLine } from "react-icons/ri";
import { dark } from "@clerk/themes";

export default function Topbar() {

    return (
        <nav className="topbar">
            <Link href={"/"} className="flex items-center gap-4">
                <Image priority src={"logos/logo.svg"} alt="logo" width={50} height={50}/>
                <p className="text-heading3-bold text-light-1 max-xs:hidden">Socials</p>
            </Link>

            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <RiLogoutBoxLine className="text-white text-heading2-semibold"/>
                                
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                <OrganizationSwitcher
                appearance={{
                    baseTheme: dark,
                    elements:{
                    organizationSwitcherTrigger:"py-2 px-4"
                }}} 
                />
            </div>
            
        </nav>
    )
}