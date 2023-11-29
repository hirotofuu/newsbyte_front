import Link from "next/link";
import React, { useState } from "react";
import {Article} from "../../types/article"
import {timee} from "./../../libs/helper"
import {useUserState, useTokenState} from "./../../hooks/useUser"
import {useFetch} from "./../../hooks/useFetch"
import { makeTags } from "./../../libs/helper";
import { useRouter } from "next/router";
import {
  Chip,
  Box
} from "@mui/material";
type Props ={
  article: Article | null
}

const ArticleChoice: React.FC<Props> =React.memo(({article})=>{
  const {userState} = useUserState();
  const router = useRouter();
  const [tags] = useState(makeTags(article ? article?.tagss_out : "{}"))

  return(
    <>
        <Box className="w-full group flex p-3 border-b bg-white"  key="hiroto">
          <Box>
            <Link href={userState && userState.id == article?.user_id ? `/article/your_article/${article?.id}` : `/article/${article?.id}`}>
              <h2 className="font-semibold  text-black line-clamp-4 hover:text-blue-500">{article?.title}</h2>
              </Link>
              <ul className="flex gap-1 my-2 text-xs flex-row flex-wrap">
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
            <Box className="flex gap-4 text-xs mt-3">
            <Link href={`/user/${article?.id_name}`}>{article?.name}</Link>
            <h2>{timee(article ? article.created_at : "")}</h2>
            </Box>
          </Box>
        </Box>   
    </>
  )
})

export default ArticleChoice