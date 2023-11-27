import { NextPage } from 'next';
import {useIsLogin} from "./../../hooks/useRequireLogin";
import { useRouter } from "next/router";
import {useUserState} from "./../../hooks/useUser" 
import { AxiosError, AxiosResponse } from 'axios';
import { Box } from '@mui/material';
import axios from "./../../libs/axios"






const Mypage: NextPage = () => {
  const {userState, setUserState} = useUserState()
  const router = useRouter()
  const logout = () =>{
    axios
    .get('/logout')
    .then((res: AxiosResponse) => {
      setUserState(null);
      router.push("/")
    })
      .catch((error: AxiosError)=> {
        console.log("logout error happened", error);
      })
  };

  useIsLogin()
  return (
    <>
      <Box>
        <button onClick={logout}>ログアウト</button>
        <button>アカウント削除</button>
      </Box>
    </>
  );
};

export default Mypage;