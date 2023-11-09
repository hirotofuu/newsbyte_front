import Link from "next/link";
import { NextPage, GetServerSideProps } from 'next';
import { useState, ChangeEvent, useEffect } from "react";
import {getUserArticle, getOneUser} from "./../../libs/getAFunc"
import { useRouter } from "next/router";
import ProfileOne from "../../components/profile/profile_one"
import {useUserState} from "./../../hooks/useUser" 
import {Article} from "./../../types/article"
import {User} from "./../../types/user"
import ArticleChoice from "@/components/choices/articleChoice";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userID: any = context.params?.id;
  const articles: Article[] = await getUserArticle(String(userID))
  const user: User = await getOneUser(userID)
  return{
    props: {
      articles,
      user
    },
  };
}

type Factor = {
  articles: Article[] 
  user: User
}





const Mypage: NextPage<Factor> = ({articles, user}) => {
  const {userState} = useUserState()
  const router = useRouter()
  return (
    <>
      <ProfileOne user={user}></ProfileOne>
      <div className="flex justify-center gap-12 font-semibold border-b">
        <button className="pb-2 border-b-2 border-blue-500">記事</button>
        <button className="pb-2">コメント</button>
      </div>
      <div className="w-1/2 mr-auto ml-auto">
        {articles ?
          articles.map((article: any, index: any)=>{
            return (
              <ArticleChoice article={article} key={index}></ArticleChoice>
            )
          })
        : ""}
      </div>
    </>
  );
};

export default Mypage;