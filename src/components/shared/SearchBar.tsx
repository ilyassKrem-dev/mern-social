"use client"

import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
export default function SearchBar({routeType}:{routeType:string}) {

    const [search,setSearch] = useState("")
    const router = useRouter()
    useEffect(() => {
        const idTime = setTimeout(() => {
            if(search) {
                router.push(`${routeType}?q=${search}`)
            } else {
                router.push(`${routeType}`)
            }
        },200)

        return function() {
            clearTimeout(idTime)
        }
        
    },[search])
    return (
        <div className="searchbar">
            <FiSearch className=" text-heading1-bold text-gray-1"/>
            <Input 
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`${routeType === "/search"?"Search people":"Search communities"}`}
            className="no-focus searchbar_input"/>
        </div>

    )
}