import Link from "next/link";
import { useState } from "react";
import {Article} from "../../types/article"
import {timee} from "./../../libs/helper";
import { makeTags } from "./../../libs/helper";
import { useRouter } from "next/router";
import {
  Chip,
} from "@mui/material";
type Props ={
  article: Article | null
};

const EArticleChoice: React.FC<Props> =({article})=>{
  const [tags] = useState(makeTags(article ? article?.tagss_out : "{}"))
  const router = useRouter()
  return(
    <>
          <div>
            <Link href={`/article/${article?.id}`}>
              <h2 className="text-md font-semibold xl:text-base lg:text-base md:text-base text-sm  text-black line-clamp-4">{article?.title}</h2>
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
            <div className="flex gap-4 text-xs mt-3 mb-2">
              <h2>{article?.name}</h2>
              <h2>{timee(article ? article.created_at : "")}</h2>
            </div>
            <Link href={`/mypage/edit/${article?.id}`} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white text-sm py-1 px-2 border border-blue-500 hover:border-transparent rounded">
              編集
            </Link> 
          </div>
    </>
  )
}

export default EArticleChoice