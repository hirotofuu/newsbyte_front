import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import {getFunc} from "../../libs/getAFunc"
import { useRouter } from "next/router";
import ProfileOne from "../../components/profile/profile_one"
import {useFetch} from "./../../hooks/useFetch"
import {Article} from "../../types/article"
import {User} from "../../types/user"
import { Box } from '@mui/material';
import UserABox from "./../../components/factor/user_article_bar"
import Frame from '@/components/frame/frame';
import ArticleChoice from "@/components/choices/articleChoice";
import NotFoundItems from "./../../components/notFound/notFoundItems"
export const getStaticProps: GetStaticProps = async (context) => {
  const idName: any = context.params?.id_name;
  const user: User = await getFunc(`/one_id_name_user/${idName}`)
  const articles: Article[] = await getFunc(`/user_articles/${user.id}`)
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
      <Box className="flex justify-center gap-12 mt-6 font-semibold border-b">
        <button className="pb-2 border-b-2 border-blue-500">記事</button>
        <button className="pb-2" onClick={()=>{router.push(`/user/comments/${user.id_name}`)}}>コメント</button>
      </Box>
      <UserABox article_number={articles ? articles.length : 0}></UserABox>
      <Frame>
        {articles ?
          articles.map((article: any, index: any)=>{
            return (
              <ArticleChoice article={article} key={index}></ArticleChoice>
            )
          })
        : <NotFoundItems></NotFoundItems>}
      </Frame>
    </>
  );
};

export default Mypage;