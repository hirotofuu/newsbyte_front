import React, { useState, useMemo } from "react";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import {
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import {useUserState} from "./../hooks/useUser"
import {deleteSpaceStr} from "./../libs/helper"

export const Header:React.FC = () => {
  const router =useRouter();
  const {userState} = useUserState();
  const [searchWord, setSearchWord] = useState("")

  return(
    <>
      <header className="flex justify-between border-b-2 py-1 px-2 bg-white  w-full h-14">
        <Link href="/" className="mt-1 text-2xl font-bold">
          newsbyte
        </Link>
        <Box className="mt-1">
          <TextField
            id="search-bar"
            className="text w-96"
            onInput={()=>{}}
            variant="outlined"
            placeholder="検索はいい文明"
            minRows="10"
            size="small"
            onKeyDown={e => {
              if (e.keyCode === 13) {
                if(!deleteSpaceStr(searchWord))return;
                router.push({
                  pathname:"/search",   //URL
                  query: {q :searchWord} //検索クエリ
                });
              }
            }}
            onChange={e => {
              setSearchWord(e.target.value);
            }}
          />
          <IconButton onClick={()=>{
            if(!deleteSpaceStr(searchWord))return;
            router.push({
              pathname:"/search",   //URL
              query: {q :searchWord} //検索クエリ
            });
          }} type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
          </IconButton>
        </Box>
        <Box className="flex mt-1 mr-3 gap-4">
          {!userState ? 
          <>
            <Link href="/register" className="mt-2 font-semibold hover:text-blue-500">
              会員登録
            </Link>
            <Link href="/login" className="mt-2 font-semibold hover:text-blue-500">
              ログイン
            </Link>
          </>
          :<button
          className=" font-semibold hover:text-blue-500"
          onClick={()=>{router.push(`/mypage/${userState?.id}`)}}
          >マイページ</button>}
          <button
          className="py-2 px-4 h-10 rounded-full font-semibold text-white bg-blue-500"
          onClick={()=>{router.push("/create")}}
          >記事を投稿</button>
        </Box>
      </header>
    </>
     )
};

export default Header;