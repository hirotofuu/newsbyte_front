import { NextPage, GetServerSideProps } from 'next';
import {getFunc} from "./../../libs/getAFunc"
import { useEffect } from 'react';
import { useRouter } from "next/router";
import Profile from "../../components/profile/profile"
import {useUserState} from "./../../hooks/useUser" 
import {Article} from "./../../types/article"
import ArticleChoice from "@/components/choices/articleChoice";
import NotFoundItems from "./../../components/notFound/notFoundItems";
import {useFetch} from "./../../hooks/useFetch"
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userID: any = context.params?.id;
  return{
    props: {
      userID
    },
  };
}

type Factor = {
  userID: any
}





const Mypage: NextPage<Factor> = ({userID}) => {
  const {userState} = useUserState()
  console.log("hello")
  const {data: followers, error: followersError, mutate: followersMutate} = useFetch(`/followed_users/${userID}`)
  const {data: A, error: Aerror, mutate: Amutation} = useFetch(`/user_articles/${userID}`)
  const router = useRouter()
  useEffect(()=>{
    console.log("hibikesaidaigenn")
  })
  return (
    <>
      <Profile followed_num={followers ? followers.length: 0}></Profile>
      <div className="flex justify-center gap-12 font-semibold border-b">
        <button className="pb-2 border-b-2 border-blue-500">記事</button>
        <button onClick={()=>{router.push(`/mypage/draft/${userState?.id}`)}} className="pb-2">下書き</button>
        <button  onClick={()=>{router.push(`/mypage/draft/${userState?.id}`)}}  className="pb-2">コメント</button>
        <button onClick={()=>{router.push(`/mypage/setting`)}} className="pb-2">設定</button>
      </div>
      <div className="xl:w-1/2 lg:w-1/2 base:w-5/6 sm:w-5/6 mr-auto ml-auto">
        {A ?
          A.map((article: any, index: any)=>{
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