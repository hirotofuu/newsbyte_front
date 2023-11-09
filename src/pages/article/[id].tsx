import Link from "next/link";
import { NextPage, GetServerSideProps } from 'next';
import { useState, useEffect } from "react";
import {getOneArticle} from "./../../libs/getAFunc"
import {useUserState} from "./../../hooks/useUser" 
import {Article} from "./../../types/article"
import Frame from "../../components/frame/frame"
import LeftFrame from "../../components/frame/left_frame"
import RightFrame from "../../components/frame/right_frame"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import {
  Avatar,
  Box,
  Container
} from "@mui/material";
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


const Mypage: NextPage<Factor> = ({article}) => {

  return (
    <>
      <div className="flex p-4 mt-10">
        <LeftFrame>
          <Box className="mb-10">
            <h1 className="mt-4 font-bold text-3xl">{article.title}</h1>
            <Link href={`/user/${article.user_id}`}>
              <div className="flex gap-2 mt-6">
                  <Avatar className="" alt="Remy Sharp" src="https://storage.googleapis.com/zenn-user-upload/34de97ca0e3b-20231016.jpeg" sx={{ width: 30, height: 30}}/>
                  <h2 className="mt-1 font-semibold">{article.name}</h2>
              </div>
            </Link>
          </Box>

        <ReactMarkdown remarkPlugins={[remarkGfm]}components={{
          h2: H2,
          h1: H1,
        }} className='markdown'>{article.content}</ReactMarkdown>  
      
        </LeftFrame>
        <RightFrame>
          <Container className=" sticky top-10">
            <Box className="p-3 rounded-md bg-gray-100">
              <Link href={`/user/${article.user_id}`} className="flex">
                <Avatar className="" alt="Remy Sharp" src="https://storage.googleapis.com/zenn-user-upload/34de97ca0e3b-20231016.jpeg" sx={{ width: 70, height: 70}}/>
                <div>
                  <h2 className="ml-4 p-1 text-xl font-semibold">{article.name}</h2> 
                  <button className="mb-3 ml-5 p-2 text-xs text-gray-400 border-2 border gray-400 rounded-full bg-white">フォロー</button>
                </div>
              </Link>
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