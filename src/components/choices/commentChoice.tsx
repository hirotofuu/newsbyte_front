import {useState, useEffect, ChangeEvent, useCallback} from 'react'
import {timee} from "./../../libs/helper"
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
        <div className="flex w-full">

        <div className="ml-4">
          
              <p className="pt-1  text-sm font-medium mr-6"> <Link href={`/user/${comment?.name}`} className="font-semibold">{comment?.name}</Link>  <span className="text-1 font-normal text-gray-500">| {timee(comment ? comment.created_at : "")}</span></p>
            
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