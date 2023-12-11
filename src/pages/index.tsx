import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';
import Link from '@mui/material/Link';
import Frame from "./../components/frame/frame"
import { useRouter } from "next/router";
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from "react";
import {deleteSpaceStr} from "./../libs/helper"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getFunc } from '@/libs/getAFunc';
import { Article } from "./../types/article"
import { useFetch } from '@/hooks/useFetch';
import { useUserState } from '@/hooks/useUser';
import ArticleChoice from "./../components/choices/articleChoice"
import {
  Container,
  Box,
  TextField,
  Typography
} from "@mui/material";

import Meta from "./../components/factor/meta"

export default function Home() {
  const defaultTheme = createTheme();
  const [searchWord, setSearchWord] = useState("")
  const {data: A, error: Aerror, mutate: Amutation} = useFetch(`/articles`)
  const {userState} = useUserState()
  const router = useRouter()

  if(userState) return (
    <>
    <Box className="mt-8 mb-20 p-8">
      <Frame>
        <h1 className="font-bold mb-4">一覧</h1>
        { A ?
        A.map((article: Article, index: number)=>{
          return (
            <ArticleChoice article={article} key={index}></ArticleChoice>
          )
        })
        : ""}
      </Frame>
    </Box>
    </>
  )
  
  return (
    <>
      <Meta pageTitle={`newsbyte | Home`} pageDesc={`ホームページ`}></Meta>
      <ThemeProvider theme={defaultTheme}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <CssBaseline />
          <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
            <Typography variant="h2" component="h1" gutterBottom>
              NewsByte
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              {'映像作品から漫画、小説までブログサイト「newsbyte」へようこそ'}<br></br>
              このサイトについてはこちらの<Link href="/detail" className="text-blue-500">リンク</Link>をご覧ください
            </Typography>
            <section className="mt-10">
                <TextField
                  id="search-bar"
                  className="text w-2/3"
                  onInput={()=>{}}
                  variant="outlined"
                  placeholder="キーワード検索"
                  minRows="10"
                  size="small"
                  onChange={e => {
                    setSearchWord(e.target.value);
                  }}
                />
                <button onClick={()=>{
                if(!deleteSpaceStr(searchWord))return;
                  router.push({
                  pathname:"/search",   //URL
                  query: {q :searchWord} //検索クエリ
                  });
                }}   className="p-1 border-1 border-black bg-gray-300 ml-1">検索</button>
              </section>
            </Container>
            <Box className="mt-8 mb-20 border-t-2 p-8">
              <Frame>
                <h1 className="font-bold mb-4">一覧</h1>
                { A ?
                A.map((article: Article, index: number)=>{
                  return (
                    <ArticleChoice article={article} key={index}></ArticleChoice>
                  )
                })
                : ""}
              </Frame>
            </Box>
            <Box
              component="footer"
              sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[800],
              }}
            >
           </Box>
        </Box>
      </ThemeProvider>
    </>
  )
}
