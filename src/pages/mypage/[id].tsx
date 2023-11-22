import { NextPage, GetServerSideProps } from 'next';
import {getUserArticle} from "./../../libs/getAFunc"
import { useRouter } from "next/router";
import Profile from "../../components/profile/profile"
import {useUserState} from "./../../hooks/useUser" 
import {Article} from "./../../types/article"
import ArticleChoice from "@/components/choices/articleChoice";
import NotFoundItems from "./../../components/notFound/notFoundItems"
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userID: any = context.params?.id;
  const articles: any = await getUserArticle(userID)
  return{
    props: {
      articles,
    },
  };
}

type Factor = {
  articles: Article[] 
}





const Mypage: NextPage<Factor> = ({articles}) => {
  const {userState} = useUserState()
  const router = useRouter()
  return (
    <>
      <Profile></Profile>
      <div className="flex justify-center gap-12 font-semibold border-b">
        <button className="pb-2 border-b-2 border-blue-500">記事</button>
        <button onClick={()=>{router.push(`/mypage/draft/${userState?.id}`)}} className="pb-2">下書き</button>
        <button  onClick={()=>{router.push(`/mypage/draft/${userState?.id}`)}}  className="pb-2">コメント</button>
        <button onClick={()=>{router.push(`/mypage/setting`)}} className="pb-2">設定</button>
      </div>
      <div className="xl:w-1/2 lg:w-1/2 base:w-5/6 sm:w-5/6 mr-auto ml-auto">
        {articles ?
          articles.map((article: any, index: any)=>{
            return (
              <ArticleChoice article={article} key={index}></ArticleChoice>
            )
          })
        : <NotFoundItems></NotFoundItems>}
      </div>
    </>
  );
};

export default Mypage;