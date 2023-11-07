import * as React from 'react';
import { useState } from 'react';
import axios from '../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import {
  Avatar,
  Button,
  TextField,
  CssBaseline,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from "@mui/material";
import Header from "../components/header"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useUserState, useTokenState} from "./../hooks/useUser"

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const {setTokenState,} = useTokenState()
  const [payload, setPayload] = useState({
    email: "",
    password: ""
  })

  const {userState, setUserState,} = useUserState()

  const login = (event: any) => {
    event.preventDefault();
    axios
          .post('/login', JSON.stringify(payload))
          .then((res: AxiosResponse) => {
            console.log("seccess")
            setUserState(res.data)
            setTokenState(res.data.token)
            console.log("誰とも取り替えたくない")
          })
          .catch((err: AxiosError) => {
            console.log(err)
          });
  };

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
              value={payload.email}
              onChange={e => {
                setPayload({...payload, email:e.target.value});
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              value={payload.password}
              onChange={e => {
                setPayload({...payload, password:e.target.value});
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              ログイン
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  パスワードを忘れた方
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"アカウントをお持ちでない方"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  );
}