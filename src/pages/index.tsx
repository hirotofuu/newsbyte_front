import Header from "../components/header"
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import {
  Container,
  Box,
  TextField,
  Typography
} from "@mui/material";
import ArticleChoice from "./../components/choices/articleChoice"
import {useUserState} from "./../hooks/useUser"

export default function Home() {
  const defaultTheme = createTheme();
  const {userState} = useUserState()
  
  return (
    <>
    <ArticleChoice></ArticleChoice>
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
            このサイトについてはこちらの<Link href="/" className="text-blue-500">リンク</Link>をご覧ください
          </Typography>
          <form className="mt-10">
              <TextField
                id="search-bar"
                className="text w-2/3"
                onInput={()=>{}}
                variant="outlined"
                placeholder="キーワード検索"
                minRows="10"
                size="small"
              />
              <button className="p-1 border-1 border-black bg-gray-300 ml-1">記事を検索</button>
            </form>
        </Container>
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
