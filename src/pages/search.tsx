import Link from "next/link";
import { NextPage, GetServerSideProps, GetStaticProps } from 'next';
import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import {deleteSpaceStr} from "./../libs/helper"
import ArticleChoice from "@/components/choices/articleChoice";
import NotFoundItems from "@/components/notFound/notFoundItems";
import {useFetch} from "./../hooks/useFetch"
import {
  TextField,
  CircularProgress,
  Box
} from "@mui/material";
import Frame from "./../components/frame/frame"
import Meta from "./../components/factor/meta"
import { Article } from "@/types/article";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query: any = context.query.q;
  return{
    props: {
      query: query
    },
  };
}

type Factor = {
  query :string
}





const Search: NextPage<Factor> = ({query}) => {
  const [searchWord, setSearchWord] = useState("")
  const router = useRouter()
  const {data: Qarticles,  error: Error, mutate: QarticlesMutate, } = useFetch(`/search_articles?q=${query}`)

  return (
    <>
      <Meta pageTitle={`"${query}" の検索結果`} pageDesc={`"${query}"の検索結果`}></Meta>
      <Frame>
        <h1 className="text-2xl font-semibold mt-8">"{query}"の検索結果</h1>
        <Box className="mt-10">
          <TextField
            id="search-bar"
            className="text w-2/3"
            onInput={()=>{}}
            variant="outlined"
            placeholder="キーワード検索"
            minRows="10"
            size="small"
            value={searchWord}
            onChange={e => {
              setSearchWord(e.target.value);
            }}
          />
          <button onClick={()=>{
            if(!deleteSpaceStr(searchWord))return ;
            router.push({
            pathname:"/search",   //URL
            query: {q :searchWord} //検索クエリ
            });
          }}   className="p-1 border-1 border-black bg-gray-300 ml-1">記事を検索</button>
        </Box>
        <Box className="mt-4">
          <button className={"p-2 rounded-3xl  hover:bg-gray-300 mr-2"}>
              <span className="text-blue-700">記事</span>
          </button>
          <button onClick={()=>{
            router.push({
              pathname:"/search_user",   //URL
              query: {q :query} //検索クエリ
            });
          }}  className={`p-2 rounded-3xl hover:bg-gray-300 `}>
            <span>ユーザー</span>
          </button>
        </Box>
        <h2 className="mt-6 border-b-2">{Qarticles ? Qarticles.length : 0}件</h2>
        {typeof Qarticles !== 'undefined' ? Qarticles ?
          Qarticles.map((article: Article, index: number)=>{
            return (
              <ArticleChoice article={article} key={index}></ArticleChoice>
            )
          })
        : <NotFoundItems></NotFoundItems> : <CircularProgress></CircularProgress>}
      </Frame>
    </>
  );
};

export default Search;