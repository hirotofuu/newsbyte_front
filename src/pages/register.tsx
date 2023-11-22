import * as React from 'react';
import { useState } from 'react';

import axios from '../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Button,
  TextField,
  CssBaseline,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  const [payload, setPayload] = useState({
    user_name: "",
    email: "",
    password: ""
  })

  const [passwordComfirm, setPasswordComfirm] = useState("")

  const [validation, setValidation] = useState("")

  const register = (event: any) => {
    event.preventDefault();
    setValidation("")
    var EMailpattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
    var pattarn =  /^[a-zA-Z0-9.?\/-_]{1,30}$/
    var Passpattarn = /^[a-z\d]{8,30}$/i
    if(!EMailpattern.test(payload.email)){
      setValidation("正しい形式でメールアドレスを入力してください")
      return ;
    }
    if(!pattarn.test(payload.user_name)){
      setValidation("正しい形式でユーザーIDを入力してください")
      return ;
    }
    if(!Passpattarn.test(payload.password)){
      setValidation("正しい形式でパスワードを入力してください")
      return ;
    }
    if(payload.password != passwordComfirm){
      setValidation("パスワードが確認用と違います")
      return ;
    }
    axios
          .post('/register', JSON.stringify(payload))
          .then((res: AxiosResponse) => {
            if(res.data.error){
              setValidation(res.data.message)
            }
            console.log("rrr")
          })
          .catch((err: any) => {
            setValidation(err.response?.data?.message)
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
            会員登録
          </Typography>
          <Box component="form" onSubmit={register} noValidate sx={{ mt: 1 }}>
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
              id="text"
              label="ユーザーID"
              name="userId"
              value={payload.user_name}
              onChange={e => {
                setPayload({...payload, user_name:e.target.value});
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード確認"
              type="password"
              id="password"
              value={passwordComfirm}
              onChange={e => {
                setPasswordComfirm(e.target.value);
              }}
              autoComplete="current-password"
            />
            {validation ? <Alert className="m-4" variant="filled" severity="error">
            {validation}
            </Alert> : ""}
            <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              同意して登録
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"アカウントをお持ちの方"}
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