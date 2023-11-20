import Link from "next/link";
import {
  Avatar,
} from "@mui/material";
import {User} from "./../../types/user"

type Props ={
  user: User | null
}


const UserChoice:React.FC<Props> =({user})=>{
  


  return(
    <>
        <div className="flex border-b w-full bg-white">
        <Link href={`/user/${user?.id_name}`} className="py-3 flex justify-between bg-white w-full ">
            <div className="flex">
              <div className="">
                <h1 className="pt-1 font-semibold">{user?.user_name}</h1>
                <h2 className="text-xs">@{user?.id_name}</h2>
                <p className="mt-1 w-full text-xs line-clamp-3 text-gray-500">{user?.profile}</p>
              </div>
            </div>
        </Link>
        <button className="block border-2 m-3 mt-4 text-blue-500  text-sm h-8 font-semibold px-2   rounded-l-full rounded-r-full "> Following</button>
        </div>


    </>
  )
}

export default UserChoice