import {useState, useEffect, ChangeEvent, useCallback} from 'react'

import {Comment} from "./../../types/article"
import {
  Avatar,
} from "@mui/material";
import Link from 'next/link';

type Props ={
  comment: Comment | null
}



const CommentChoice: React.FC<Props> =({comment})=>{

  return(
    <>
      <div  className=" bg-white pt-3 pb-3 pl-3" key={comment?.id}>
        <div className="flex">
        <Link href={`/`}>
        <Avatar alt="Remy Sharp" src="https://storage.googleapis.com/zenn-user-upload/34de97ca0e3b-20231016.jpeg" />
        </Link>

        <div className="ml-4 w-full">
          
              <p className="pt-1  text-sm font-medium mr-6"> <Link href={`/user/${comment?.id_name}`} className="font-semibold">{comment?.id_name}</Link>  <span className="text-1 font-normal text-gray-500">| 2012/2/3</span></p>
            
            <div className="mt-2 text-sm ">
              <p>{comment?.comment}</p>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default CommentChoice