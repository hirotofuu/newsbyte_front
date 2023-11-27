import Link from "next/link";
import { NextPage, GetServerSideProps } from 'next';
import {getFunc} from "./../../../libs/getAFunc"
import Profile from "../../../components/profile/profile"
import {useUserState} from "./../../../hooks/useUser" 
import CommentChoice from "@/components/choices/commentChoice";
import { useRouter } from "next/router";
import NotFoundItems from "./../../../components/notFound/notFoundItems"
import {useFetch} from "./../../../hooks/useFetch"
import {useRequireLogin} from "../../../hooks/useRequireLogin"
import {
  Box
} from "@mui/material";
import CommentBar from "./../../../components/factor/comment_bar"
import Frame from "./../../../components/frame/frame"
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userID: any = context.params?.id;
  const comments: Comment[] = await getFunc(`/user_comments/${userID}`)
  console.log("comment")
  return{
    props: {
      comments,
      userID,
    },
  };
}

type Factor = {
  comments: Comment[] 
  userID: any
}





const Mypage: NextPage<Factor> = ({comments, userID}) => {
  const {userState} = useUserState()
  const {data: followers, error: followersError, mutate: followersMutate} = useFetch(`/followed_users/${userID}`)
  const router = useRouter()
  useRequireLogin(userID)
  return (
    <>
      <Profile followed_num={followers ? followers.length: 0}></Profile>
      <Box className="flex justify-center gap-12 mt-6 font-semibold border-b">
        <button onClick={()=>{router.push(`/mypage/${userState?.id}`)}}  className="pb-2">記事</button>
        <button onClick={()=>{router.push(`/mypage/draft/${userState?.id}`)}}  className="pb-2">下書き</button>
        <button className="pb-2 border-b-2 border-blue-500">コメント</button>
        <button onClick={()=>{router.push(`/mypage/setting`)}} className="pb-2">設定</button>
      </Box>
      <CommentBar comment_number={comments ? comments.length : 0}></CommentBar>
      <Frame>
        <ul>
          {comments ?
                  comments.map((comment: any, index: any)=>{
                    return (
                      <li className="border-b-2 mt-2" key={index}>
                        <Link href={`/article/${comment.article_id}`} className="px-2 font-semibold text-sm text-orange-700 hover:text-blue-500">
                          {comment.article_title}
                        </Link>
                        <CommentChoice comment={comment} key={index}></CommentChoice>
                      </li>
                    )
                  })
                : <NotFoundItems></NotFoundItems>}
        </ul>
      </Frame>
    </>
  );
};

export default Mypage;