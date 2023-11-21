import Link from "next/link";
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import {getOneIdNameUser, getFunc} from "../../../libs/getAFunc"
import { useRouter } from "next/router";
import ProfileOne from "../../../components/profile/profile_one"
import {useFetch} from "./../../../hooks/useFetch"
import {Comment} from "../../../types/article"
import {User} from "../../../types/user"
import CommentChoice from "@/components/choices/commentChoice";
import NotFoundItems from "./../../../components/notFound/notFoundItems"
export const getStaticProps: GetStaticProps = async (context) => {
  const idName: any = context.params?.id_name;
  const user: User = await getOneIdNameUser(idName)
  const comments: Comment[] = await getFunc(`/user_comments/${user.id}`)
  return{
    props: {
      comments,
      user
    },
    revalidate: 120
  };
}


export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], 
    fallback: 'blocking', 
  };
};

type Factor = {
  comments: Comment[] 
  user: User
}





const Mypage: NextPage<Factor> = ({comments, user}) => {
  const {data: followed_user, error: followedError, mutate: followedMutate} = useFetch(`/followed_users/${user.id}`)
  console.log(followed_user)
  const router = useRouter()
  return (
    <>
      <ProfileOne user={user} followed_num={followed_user ? followed_user.length : 0}></ProfileOne>
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
              : <NotFoundItems></NotFoundItems>}
      </ul>
      </div>
    </>
  );
};

export default Mypage;