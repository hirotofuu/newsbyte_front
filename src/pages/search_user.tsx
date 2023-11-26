import Link from "next/link";
import { NextPage, GetServerSideProps, GetStaticProps } from 'next';
import { useState, ChangeEvent, useEffect } from "react";
import {useFetch} from "./../hooks/useFetch"
import { useRouter } from "next/router";
import {getFunc} from "./../libs/getAFunc"
import {deleteSpaceStr} from "./../libs/helper"
import {User} from "../types/user"
import UserChoice from "@/components/choices/userChoice";
import NotFoundItems from "@/components/notFound/notFoundItems";
import {
  TextField,
  CircularProgress,
  Box
} from "@mui/material";
import Frame from "./../components/frame/frame"
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
  const {data: Quser, error: Error, mutate: QusersMutate} = useFetch(`/users/${query}`)
  const router = useRouter()
  return (
    <>
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
            if(!deleteSpaceStr(searchWord))return 
            router.push({
            pathname:"/search",   //URL
            query: {q :searchWord} //検索クエリ
            });
          }}   className="p-1 border-1 border-black bg-gray-300 ml-1">記事を検索</button>
        </Box>
        <Box className="mt-4">
          <button onClick={()=>{
            router.push({
              pathname:"/search",   //URL
              query: {q :query} //検索クエリ
            });
          }}  className={"p-2 rounded-3xl  hover:bg-gray-300 mr-2"}>
              <span>articles</span>
          </button>
          <button className={`p-2 rounded-3xl hover:bg-gray-300 `}>
            <span className="text-blue-700">users</span>
          </button>
        </Box>
        <h2 className="mt-6 border-b-2">{Quser ? Quser.length : 0}件</h2>
        {typeof Quser!=='undefined' ? Quser ?
          Quser.map((user: any, index: any)=>{
            return (
              <UserChoice user={user}></UserChoice>
            )
          })
        : <NotFoundItems></NotFoundItems> : <CircularProgress></CircularProgress>}
      </Frame>
    </>
  );
};

export default Search;