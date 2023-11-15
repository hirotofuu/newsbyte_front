import Link from "next/link";
import { useState } from "react";
import {Article} from "../../types/article"
import {timee} from "./../../libs/helper"
import {useUserState, useTokenState} from "./../../hooks/useUser"
import {deletee} from '@/libs/deleteFunc'
import {
  Avatar,
} from "@mui/material";
type Props ={
  article: Article | null
}

const ArticleChoice: React.FC<Props> =({article})=>{
  const {userState} = useUserState()
  const {TokenState} = useTokenState()
  const [isLive, setIsLive] = useState(true)

  const deleteComment = async() => {
    if(!userState)return
    let res: number = await deletee(`/user/delete_articles/${article?.id}`, TokenState ? TokenState : " ")
    if (res==1){
      console.log("deleted")
      setIsLive(false)
    }
  }

  if(!isLive){
    return(
      <h1>削除済み ({article?.title})</h1> 
    )
  }

  return(
    <>
        <div className="group flex p-3 border-b bg-white"  key="hiroto">
            {userState && String(userState.id) == article?.user_id ? 
            <>
            <Link href={`/mypage/edit/${article.id}`}>編集</Link>
            <button className="text-sm text-gray-500" onClick={deleteComment}>削除</button> 
            </>: ""}
          <div className="ml-4">
            <Link href={`/article/${article?.id}`}>
              <h2 className="text-md font-semibold xl:text-base lg:text-base md:text-base text-sm  text-black line-clamp-4">{article?.title}</h2>
            </Link>
            <div className="flex gap-4 text-xs mt-3">
            <h2>{article?.name}</h2>
            <h2>{timee(article ? article.created_at : "")}</h2>
            </div>
          </div>
        </div>   
    </>
  )
}

export default ArticleChoice