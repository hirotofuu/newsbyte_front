import Link from "next/link";
import { NextPage, GetServerSideProps } from 'next';
import { useState, useEffect } from "react";
import {getOneArticle} from "./../../libs/getAFunc"
import {useUserState, useTokenState} from "./../../hooks/useUser" 
import {Article} from "./../../types/article"
import LeftFrame from "../../components/frame/left_frame"
import RightFrame from "../../components/frame/right_frame"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import {useFetch} from "./../../hooks/useFetch"
import {putt} from "./../../libs/putFunc"
import {deletee} from "./../../libs/deleteFunc"
import {timee} from "./../../libs/helper"
import {makeTags} from "./../../libs/helper"
import {
  Avatar,
  Box,
  Container,
  TextareaAutosize,
  Chip
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentChoice from "./../../components/choices/commentChoice"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: any = context.params?.id;
  const article: any = await getOneArticle(String(id))
  
  return{
    props: {
      article,
    },
  };
}

type Factor = {
  article: Article
}



const H2 = ({ node, ...props }: any) => {
  return (
    <div>
      <h2 id={node.position?.start.line.toString()}>{props.children}</h2>
    </div>
  );
};
const H1 = ({ node, ...props }: any) => {
  return (
    <div>
      <h1 id={node.position?.start.line.toString()}>{props.children}</h1>
    </div>
  );
};

const ankerH1Link = ({ node, ...props }: any) => {
  return (
      <a
        className="list-item list-none mb-3 pb-2 border-b hover:text-blue-500"
        href={"#" + node.position?.start.line.toString()}
      >
        {props.children}
      </a>
  );
};

const ankeH2rLink = ({ node, ...props }: any) => {
  return (
      <a
        className="list-item list-none mb-2 pb-2 border-b hover:text-blue-500 pl-3"
        href={"#" + node.position?.start.line.toString()}
      >
        {props.children}
      </a>
  );
};

type CommentForm = {
  user_id: number,
  article_id: number
  comment: string
}

const Mypage: NextPage<Factor> = ({article}) => {
  console.log("s")
  const {data: good, error: goodError, mutate: goodMutate} = useFetch(`/good_article/${article.id}`)
  const {data: comments, error: commentError, mutate: commentMutate} = useFetch(`/article_comments/${article.id}`)
  const {userState} = useUserState()
  const {TokenState} = useTokenState()
  const [commentForm, setCommentForm] = useState<CommentForm>({
    user_id: 0,
    article_id: article.id,
    comment: ""
  });
  const [tags, setTags] = useState(makeTags(article.tagss_out))
  const onGood = async() => {
    let res: number = await putt(`/user/insert_article_good/${article.id}`, "", TokenState ? TokenState : " ")
    if (res==1){
      goodMutate({is_good_flag: !good.is_good_flag, good_num: good.good_num++})
    }
  }

  const onGoodDelete = async() => {
    let res: number = await deletee(`/user/delete_article_goos/${article.id}`, TokenState ? TokenState : " ")
    if (res==1){
      goodMutate({is_good_flag: !good.is_good_flag, good_num: good.good_num--})
    }
  }

  const onSendComment = async() => {
    if(!commentForm.comment || !userState)return 0;
    setCommentForm({...commentForm , user_id: userState ? userState.id : 0})
    console.log(commentForm)
    let res: number = await putt(`/user/insert_comment`, commentForm, TokenState ? TokenState : " ")
    if (res==1){
      console.log("成功")
      commentMutate()
    }
  }

  return (
    <>
      <div className="flex p-4 mt-10">
        <LeftFrame>
          <Box className="mb-10">
            <h1 className="mt-4 font-bold text-3xl">{article.title}</h1>
            <ul className="mt-3">
            {tags[0] ?
              tags.map((tag: any, index: any)=>{
                return (
                  <li key={index}>
                    <Chip label={tag}></Chip>
                  </li>
                )
              })
            : ""}
            </ul>
            <div className="mt-3 flex gap-5 text-xs text-gray-500">
              <p>投稿: {timee(article.created_at)}</p>
              {article.created_at!=article.updated_at ? <p>編集: {timee(article.updated_at)}</p> : ""}
            </div>
            <Link href={`/user/${article.id_name}`}>
              <div className="flex gap-2 mt-1">
                  <h2 className="mt-1 font-semibold">{article.name}({article.id_name})</h2>
              </div>
            </Link>
            <div className="mt-6">
              <button onClick={good && good.is_good_flag ? onGoodDelete : onGood}>
                <FavoriteIcon className={good && good.is_good_flag ? "text-red-500" : "text-gray-300"}></FavoriteIcon> <span className="text-gray-500 text-sm">{good ? good.good_num: 0}</span> 
              </button>
            </div>
          </Box>

          <ReactMarkdown remarkPlugins={[remarkGfm]}components={{
            h2: H2,
            h1: H1,
          }} className='markdown'>{article.content}</ReactMarkdown>  
          <div className="mt-16 border-b-2">
            <button className="mb-4" onClick={good && good.is_good_flag ? onGoodDelete : onGood}>
              <FavoriteIcon className={good && good.is_good_flag ? "text-red-500" : "text-gray-300"}></FavoriteIcon> <span className="text-gray-500 text-sm">{good ? good.good_num: 0}</span> 
            </button>
          </div>
          <Box className="p-5">
            <label className="text-sm mb-2 font font-semibold">コメント欄</label>
            {comments ?
              comments.map((comment: any, index: any)=>{
                return (
                  <CommentChoice comment={comment} key={index}></CommentChoice>
                )
              })
            : ""}
            <TextareaAutosize
            className="mt-4 block border-2 w-full resize-none p-1 rounded-md"
            aria-label="comment"
            value={commentForm.comment}
            onChange={e => {
              setCommentForm({...commentForm, comment:e.target.value});
            }}
            placeholder="コメントを書く" />
            { userState ? <div className="flex justify-end">
              <button className="m-1 text-sm  text-gray-600 px-2 border-2 bg-gray-100 rounded-full" onClick={onSendComment}>send</button>
            </div> : <p>コメントにはログインが必要です</p>} 
          </Box>

        </LeftFrame>
        <RightFrame>
          <Container className=" sticky top-10">
            <Box className="p-3 rounded-md bg-gray-100">
                <Link href={`/user/${article.id_name}`}>
                  <p className="ml-4 p-1 text-xl font-semibold">{article.name}</p> 
                </Link>
                  <button className="mb-3 ml-5 p-2 text-xs text-gray-400 border-2 border gray-400 rounded-full bg-white">フォロー</button>
              <p className="ml-5 text-xs">
              2021年2月よりプログラミングを学び始めました。 JavaScript, React,TypeScript,Next.jsを中心に学習中です。
              </p>
            </Box>
            <Box className="mt-8">
            <div className="p-3 bg-gray-100 rounded-md ">
              目次
              <ol className="mt-6 text-sm list-decimal list-inside">
                  <button
                  className="list-item list-none w-full text-left mb-2 pb-2 border-b hover:text-blue-500 "
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                  top 
                  </button>
                <ReactMarkdown
                  allowedElements={["h1", "h2"]}
                  components={{
                    h1: ankerH1Link,
                    h2: ankeH2rLink,
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </ol>
            </div>
            </Box>
          </Container>
        </RightFrame>

      </div>
    </>
  );
};

export default Mypage;