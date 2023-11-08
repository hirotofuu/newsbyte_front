import Link from "next/link";
import {Article} from "../../types/article"
type Props ={
  article: Article | null
}

const ArticleChoice: React.FC<Props> =({article})=>{

  return(
    <>
      <Link href="/">
        <div className="group hover:bg-gray-100 flex p-3 border-b bg-white"  key="hiroto">
          <div className="ml-4">
            <h2 className="text-md font-semibold xl:text-base lg:text-base md:text-base text-sm  text-black line-clamp-4">{article?.title}</h2>
            <div className="flex gap-4 text-xs mt-3">
            <h2>{article?.name}</h2>
            <h2>2012/2/3</h2>
            <h2>2 views</h2>

            </div>
          </div>
        </div>   
      </Link>
    </>
  )
}

export default ArticleChoice