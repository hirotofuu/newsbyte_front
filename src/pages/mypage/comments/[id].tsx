import Link from "next/link";
import { NextPage, GetServerSideProps } from 'next';
import {getUserSaveArticle, getFunc} from "./../../../libs/getAFunc"
import Profile from "../../../components/profile/profile"
import {useUserState} from "./../../../hooks/useUser" 
import CommentChoice from "@/components/choices/commentChoice";
import { useRouter } from "next/router";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userID: any = context.params?.id;
  const comments: Comment[] = await getFunc(`/user_comments/${userID}`)
  console.log(comments)
  return{
    props: {
      comments,
    },
  };
}

type Factor = {
  comments: Comment[] 
}





const Mypage: NextPage<Factor> = ({comments}) => {
  const {userState} = useUserState()
  const router = useRouter()
  return (
    <>
      <Profile></Profile>
      <div className="flex justify-center gap-12 font-semibold border-b">
        <button onClick={()=>{router.push(`/mypage/${userState?.id}`)}}  className="pb-2">記事</button>
        <button onClick={()=>{router.push(`/mypage/draft/${userState?.id}`)}}  className="pb-2">下書き</button>
        <button className="pb-2 border-b-2 border-blue-500">コメント</button>
        <button className="pb-2">設定</button>
      </div>
      <div className="xl:w-1/2 lg:w-1/2 base:w-5/6 sm:w-5/6 mr-auto ml-auto">
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