import Link from "next/link";
import { useState } from "react";
import {Article} from "../../types/article"
import {timee} from "./../../libs/helper"
import {useUserState, useTokenState} from "./../../hooks/useUser"
import {deletee} from '@/libs/deleteFunc'
import {useFetch} from "./../../hooks/useFetch"
import { makeTags } from "./../../libs/helper";
import { useRouter } from "next/router";
import {
  Chip,
} from "@mui/material";
type Props ={
  article: Article | null
}

const ArticleChoice: React.FC<Props> =({article})=>{
  const {userState} = useUserState();
  const {TokenState} = useTokenState();
  const router = useRouter();
  const [isLive, setIsLive] = useState(true);
  const {mutate: DAmutation} = useFetch(`/user_save_articles/${article?.user_id}`)
  const {mutate: Amutation} = useFetch(`/user_articles/${article?.user_id}`)
  const [tags] = useState(makeTags(article ? article?.tagss_out : "{}"))
  const deleteComment = async() => {
    if(!userState)return
    let res: number = await deletee(`/user/delete_articles/${article?.id}`, TokenState ? TokenState : " ")
    if(article?.is_open_flag){
      Amutation()
    }else{
      DAmutation()
    }
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
        <div className="group flex py-2 border-b bg-white"  key="hiroto">
          <div>
            <Link href={`/article/${article?.id}`}>
              <h2 className="text-lg font-semibold  text-black line-clamp-4 hover:text-blue-500">{article?.title}</h2>
              </Link>
              <ul className="flex gap-1 my-2 text-xs">
                {tags[0] ?
                  tags.map((tag: any, index: any)=>{
                    return (
                      <li className="list-none" key={index}>
                        <Chip label={tag} onClick={()=>{
                          router.push({
                            pathname:"/search",   //URL
                            query: {q : tag} //検索クエリ
                          });
                        }}></Chip>
                      </li>
                    )
                  })
                  : ""}
              </ul> 
            <div className="flex gap-4 text-xs mt-3">
            <Link href={`/user/${article?.id_name}`}>{article?.name}</Link>
            <h2>{timee(article ? article.created_at : "")}</h2>
            </div>
          </div>
        </div>   
    </>
  )
}

export default ArticleChoice