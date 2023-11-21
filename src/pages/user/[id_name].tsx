import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import {getUserArticle, getOneIdNameUser} from "../../libs/getAFunc"
import { useRouter } from "next/router";
import ProfileOne from "../../components/profile/profile_one"
import {useFetch} from "./../../hooks/useFetch"
import {Article} from "../../types/article"
import {User} from "../../types/user"
import ArticleChoice from "@/components/choices/articleChoice";
import NotFoundItems from "./../../components/notFound/notFoundItems"
export const getStaticProps: GetStaticProps = async (context) => {
  const idName: any = context.params?.id_name;
  const user: User = await getOneIdNameUser(idName)
  const articles: Article[] = await getUserArticle(user.id)
  return{
    props: {
      articles,
      user
    },
    revalidate: 120
  };
}

type Factor = {
  articles: Article[] 
  user: User
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // アプリのビルド時にはパスに何が入るかが分からないので空でOK
    fallback: 'blocking', // 👈 ポイント
  };
};



const Mypage: NextPage<Factor> = ({articles, user}) => {
  const router = useRouter()
  const {data: followed_user, error: followedError, mutate: followedMutate} = useFetch(`/followed_users/${user.id}`)
  return (
    <>
      <ProfileOne user={user} followed_num={followed_user ? followed_user.length : 0}></ProfileOne>
      <div className="flex justify-center gap-12 font-semibold border-b">
        <button className="pb-2 border-b-2 border-blue-500">記事</button>
        <button className="pb-2" onClick={()=>{router.push(`/user/comments/${user.id_name}`)}}>コメント</button>
      </div>
      <div className="xl:w-1/2 lg:w-1/2 base:w-5/6 sm:w-5/6  mr-auto ml-auto">
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