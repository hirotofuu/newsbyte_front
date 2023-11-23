import {useState, useEffect, ChangeEvent, useCallback} from 'react'
import {timee} from "./../../libs/helper"
import {Comment} from "./../../types/article"
import {useUserState, useTokenState} from "./../../hooks/useUser"
import {deletee} from '@/libs/deleteFunc'
import {
  Avatar,
} from "@mui/material";
import Link from 'next/link';

type Props ={
  comment: Comment | null
}



const CommentChoice: React.FC<Props> =({comment})=>{
  const {userState} = useUserState()
  const {TokenState} = useTokenState()
  const [isLive, setIsLive] = useState(true)

  const deleteComment = async() => {
    if(!userState)return
    let res: number = await deletee(`/user/delete_comment/${comment?.id}`, TokenState ? TokenState : " ")
    if (res==1){
      console.log("deleted")
      setIsLive(false)
    }
  }

  if(!isLive){
    return (
      <>
      <p className="text-sm text-gray-500">削除ずみ</p>
      </>
    )
  }

  return(
    <>
      <div  className=" bg-white pt-3 pb-3 pl-3" key={comment?.id}>
        <div className="flex w-full">

        <div className ="">
              <div className="flex mt-1 mb-4 text-xs">
                <p className="text-sm font-medium mr-6"> <Link href={userState?.id!=comment?.user_id ? `/user/${comment?.name}` : `/mypage/${userState?.id}`} className="font-semibold">@{comment?.name}</Link>  <span className="font-normal text-gray-500">| {timee(comment ? comment.created_at : "")}</span></p>
                {userState && userState.id == comment?.user_id ? <button className=" text-gray-500" onClick={deleteComment}>削除</button> : ""}

              </div>
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