import { NextPage, GetServerSideProps } from 'next';
import {getFunc} from "./../../../libs/getAFunc"
import Profile from "../../../components/profile/profile"
import {useUserState} from "./../../../hooks/useUser" 
import {Article} from "./../../../types/article"
import ArticleChoice from "@/components/choices/articleChoice";
import { useRouter } from "next/router";
import {useFetch} from "./../../../hooks/useFetch"
import {
  Checkbox
} from "@mui/material";
import NotFoundItems from "./../../../components/notFound/notFoundItems"
import EArticleChoice from "./../../../components/choices/user_A_choice"
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userID: any = context.params?.id;
  return{
    props: {
      userID
    },
  };
}

type Factor = {
  articles: Article[] 
  userID: any
}





const Mypage: NextPage<Factor> = ({userID}) => {
  const {userState} = useUserState()
  const {data: followers, error: followersError, mutate: followersMutate} = useFetch(`/followed_users/${userID}`)
  const {data: A, error: Aerror, mutate: Amutation} = useFetch(`/user_save_articles/${userID}`)
  const router = useRouter()
  return (
    <>
      <Profile followed_num={followers ? followers.length: 0}></Profile>
      <div className="flex justify-center gap-12 font-semibold border-b">
        <button onClick={()=>{router.push(`/mypage/${userState?.id}`)}}  className="pb-2">記事</button>
        <button className="pb-2 border-b-2 border-blue-500">下書き</button>
        <button onClick={()=>{router.push(`/mypage/comments/${userState?.id}`)}}  className="pb-2">コメント</button>
        <button onClick={()=>{router.push(`/mypage/setting`)}} className="pb-2">設定</button>
      </div>
      <div className="xl:w-1/2 lg:w-1/2 base:w-5/6 sm:w-5/6 mr-auto ml-auto">
        <ol>
          {A ?
            A.map((article: any, index: any)=>{
              return (
                <li key={index} className="flex gap-4 p-4 border-b-2">
                  <Checkbox/>
                  <EArticleChoice article={article} key={index}></EArticleChoice>
                </li>
              )
            })
          : <NotFoundItems></NotFoundItems>}
        </ol>
      </div>
    </>
  );
};

export default Mypage;