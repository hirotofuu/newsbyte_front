import React, {useState} from 'react'
import {timee} from "./../../libs/helper"
import {Comment} from "./../../types/article"
import {useUserState, useTokenState} from "./../../hooks/useUser"
import {deletee} from '@/libs/deleteFunc'
import {textToUser} from "./../../libs/helper"
import Link from 'next/link';
import { Box } from '@mui/material'

// コメントのコンポーネント


type Props ={
  comment: Comment | null
  onReply?: (id_name: string) => void 
}



const CommentChoice: React.FC<Props> =React.memo(({comment, onReply})=>{
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
      <Box  className=" bg-white pt-3 pb-3 pl-3" key={comment?.id}>
        <Box className="flex w-full">

        <Box className ="">
            <div className="flex mt-1 text-xs">
              <p className="text-sm font-medium mr-6"> <Link href={userState?.id!=comment?.user_id ? `/user/${comment?.name}` : `/mypage/${userState?.id}`} className="font-semibold">@{comment?.name}</Link>  <span className="font-normal text-gray-500">| {timee(comment ? comment.created_at : "")}</span></p>
              {userState && (userState.id == comment?.user_id) ? <button className=" text-gray-500" onClick={deleteComment}>削除</button> : ""}

            </div>
            <p dangerouslySetInnerHTML={{
                  __html: textToUser(comment?.comment ? `${comment?.comment}` : '')
            }} className="text-sm break-words whitespace-pre-wrap"></p>
          </Box>
        </Box>
        { onReply ? <button onClick={()=>{onReply(comment?.name  ? comment.name : "")}} className="mt-2 text-xs text-gray-500">返信</button> : ""}
      </Box>

    </>
  )
})

export default CommentChoice