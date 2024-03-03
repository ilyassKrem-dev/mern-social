

import Link from "next/link";


export default function NotFound({err}:{err?:string}) {

    
    return (
        <div className="flex flex-col items-center justify-center text-center  gap-y-12 py-32 text-light-1 bg-dark-3 w-[80%] sm:w-[500px] rounded-xl h-[300px]">
                <h1 className=" text-heading2-bold">404</h1>
                <p className="text-center">{err || "We couldn't find the page"}</p>

                <Link href={"/"}>
                    <button className="bg-accent p-3 px-6 text-heading4-medium rounded-full hover:opacity-40 transition-all duration-200">
                        Home
                    </button>
                </Link>
        </div>
    )

}