import Link from "next/link";
import {Article} from "../../types/article"
import {timee} from "./../../libs/helper"
type Props ={
  article: Article | null
}

const EArticleChoice: React.FC<Props> =({article})=>{


  return(
    <>
          <div>
            <Link href={`/article/${article?.id}`}>
              <h2 className="text-md font-semibold xl:text-base lg:text-base md:text-base text-sm  text-black line-clamp-4">{article?.title}</h2>
            </Link>
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