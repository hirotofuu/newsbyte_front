import Link from "next/link";
import { NextPage, GetServerSideProps } from 'next';
import { useState, ChangeEvent, useEffect } from "react";
import {getUserArticle, getOneIdNameUser, getFunc} from "../../../libs/getAFunc"
import { useRouter } from "next/router";
import ProfileOne from "../../../components/profile/profile_one"
import {useUserState} from "../../../hooks/useUser" 
import {Comment} from "../../../types/article"
import {User} from "../../../types/user"
import CommentChoice from "@/components/choices/commentChoice";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const idName: any = context.params?.id_name;
  const user: User = await getOneIdNameUser(idName)
  const comments: Comment[] = await getFunc(`/user_comments/${user.id}`)
  console.log(comments)
  return{
    props: {
      comments,
      user
    },
  };
}

type Factor = {
  comments: Comment[] 
  user: User
}





const Mypage: NextPage<Factor> = ({comments, user}) => {
  const {userState} = useUserState()
  const router = useRouter()
  return (
    <>
      <ProfileOne user={user}></ProfileOne>
      <div className="flex justify-center gap-12 font-semibold border-b">
        <button className="pb-2" onClick={()=>{router.push(`/user/${user.id_name}`)}}>記事</button>
        <button className="pb-2 border-b-2 border-blue-500">コメント</button>
      </div>
      <div className="xl:w-1/2 lg:w-1/2 base:w-5/6 sm:w-5/6  mr-auto ml-auto">
      <ul>
        {comments ?
                comments.map((comment: any, index: any)=>{
                  return (
                    <li className="border-b-2 mt-2" key={index}>
                      <Link href={`/article/${comment.article_id}`} className="p-2 font-semibold text-sm text-orange-700 hover:text-blue-500">
                        {comment.article_title}
                      </Link>
                      <CommentChoice comment={comment} key={index}></CommentChoice>
                    </li>
                  )
                })
              : ""}
      </ul>
      </div>
    </>
  );
};

export default Mypage;