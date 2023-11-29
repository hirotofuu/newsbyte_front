import Link from "next/link";
import { NextPage, GetServerSideProps } from 'next';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {getFunc} from "./../../../libs/getAFunc"
import {useUserState, useTokenState} from "./../../../hooks/useUser" 
import {Article} from "./../../../types/article"
import LeftFrame from "../../../components/frame/left_frame"
import RightFrame from "../../../components/frame/right_frame"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import {useFetch} from "./../../../hooks/useFetch"
import {putt} from "./../../../libs/putFunc"
import {deletee} from "./../../../libs/deleteFunc"
import {Comment} from "./../../../types/article"
import {timee, makeTags, deleteSpaceStr} from "./../../../libs/helper"
import {useRequireLogin} from "../../../hooks/useRequireLogin"
import {
  Box,
  Container,
  TextareaAutosize,
  Chip,
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import YoutArticletBar from "./../../../components/factor/your_article_bar"
import YourCommentChoice from "./../../../components/choices/your_comment_choice"
import NotFoundItems from "./../../../components/notFound/notFoundItems"


export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: any = context.params?.id;
  const article: Article = await getFunc(`/edit_article/${id}`)
  
  return{
    props: {
      article : article ,
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
        className="list-item list-none mb-1 pb-1 border-b hover:text-blue-500"
        href={"#" + node.position?.start.line.toString()}
      >
        {props.children}
      </a>
  );
};

const ankeH2rLink = ({ node, ...props }: any) => {
  return (
      <a
        className="list-item list-none mb-1 pb-1 border-b hover:text-blue-500 pl-3"
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
  const {data: good, error: goodError, mutate: goodMutate} = useFetch(`/good_article/${article.id}`)
  const {data: comments, error: commentError, mutate: commentMutate} = useFetch(`/article_comments/${article.id}`)
  const {userState, setUserState} = useUserState()
  const {TokenState} = useTokenState()
  const [commentForm, setCommentForm] = useState<CommentForm>({
    user_id: 0,
    article_id: article.id,
    comment: ""
  });
  const router = useRouter()
  const [tags] = useState(makeTags(article.tagss_out))
  const onGood = async() => {

    let res: number = await putt(`/user/insert_article_good/${article.id}`, null, TokenState ? TokenState : " ")
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
    if(!deleteSpaceStr(commentForm.comment))return;
    if(commentForm.comment.length>100)return ;
    let res: number = await putt(`/user/insert_comment`, commentForm, TokenState ? TokenState : " ")
    if (res==1){
      console.log("成功")
      setCommentForm({...commentForm , comment: ""})
      commentMutate()
    }
  }


  const onReply = (id_name: string) => {
    setCommentForm({...commentForm, comment: commentForm.comment+`@${id_name}`})
    var element = document.documentElement;
    var bottom = element.scrollHeight - element.clientHeight;
    window.scroll(0, bottom);
  }

  useRequireLogin(article.user_id)


  return (
    <>
      <YoutArticletBar content={article.content} id={article.id} user_id={article.user_id} id_name={article.id_name} good={good} onDeleteGood={onGoodDelete} onGood={onGood}></YoutArticletBar>
      <Box className="flex p-4 mt-5">
        <LeftFrame>
          <Box className="mb-10">
            <h1 className="font-bold text-3xl">{article.title}</h1>
            <ul className="mt-3 flex gap-2 flex-row flex-wrap">
            {tags[0] ?
              tags.map((tag: string, index: number)=>{
                return (
                  <li key={index}>
                    <Chip label={tag} onClick={()=>{
                      router.push({
                        pathname:"/search",   //URL
                        query: {q : tag} //検索クエリ
                      });
                    }}></Chip>
                  </li>
                )
              })
            : ""}
            </ul>
            <div className="mt-3 flex gap-5 text-xs text-gray-500">
              <p>作成: {timee(article.created_at)}</p>
              {article.created_at!=article.updated_at ? <p>編集: {timee(article.updated_at)}</p> : ""}
            </div>
            <Link  href={userState?.id != Number(article.user_id) ? `/user/${article.id_name}` : `/mypage/${userState?.id}`}>
              <div className="flex gap-2 mt-1">
                  <h2 className="mt-1 font-semibold">{article.name}({article.id_name})</h2>
              </div>
            </Link>
          </Box>

          <ReactMarkdown remarkPlugins={[remarkGfm]}components={{
            h2: H2,
            h1: H1,
          }} className='markdown'>{article.content}</ReactMarkdown>  
          <Box className="mt-16 border-b-2">
            <button className="mb-4" onClick={TokenState ? good && good.is_good_flag  ? onGoodDelete : onGood : ()=>{router.push("/login")}}>
              <FavoriteIcon className={good && good.is_good_flag && TokenState ? "text-red-500" : "text-gray-300"}></FavoriteIcon> <span className="text-gray-500 text-sm">{good ? good.good_num: 0}</span> 
            </button>
          </Box>
          <Box className="p-5 mb-20">
            <label className="text-sm mb-2 font font-semibold">コメント欄({comments ? comments.length : 0})</label>
            {comments ?
              comments.map((comment: Comment, index: number)=>{
                return (
                  <YourCommentChoice comment={comment} onReply={onReply} key={index}></YourCommentChoice>
                )
              })
            : <NotFoundItems></NotFoundItems>}
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
            <Box className="p-4 rounded-md bg-gray-100">
                <Link className="block hover:text-blue-500" href={`/mypage/${userState?.id}`}>マイページ</Link>
                <Link className="block hover:text-blue-500" href={`/mypage/edit/${article.id}`}>編集</Link>
            </Box>
            <Box className="mt-8">
              <Box className="p-3 bg-gray-100 rounded-md overflow-auto max-h-96">
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
              </Box>
            </Box>
          </Container>
        </RightFrame>

      </Box>
    </>
  );
};

export default Mypage;