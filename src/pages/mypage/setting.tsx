import { NextPage } from 'next';
import {useIsLogin} from "./../../hooks/useRequireLogin";
import { useRouter } from "next/router";
import {useUserState} from "./../../hooks/useUser" 
import {useTokenState} from "./../../hooks/useUser" 
import { AxiosError, AxiosResponse } from 'axios';
import { Box } from '@mui/material';
import Link from 'next/link';
import { deletee } from '@/libs/deleteFunc';
import Meta from "./../../components/factor/meta"
import Frame from "./../../components/frame/frame"
import axios from "./../../libs/axios"






const Mypage: NextPage = () => {
  const {userState, setUserState} = useUserState()
  const {TokenState, setTokenState} = useTokenState()
  const router = useRouter()
  const logout = () =>{
    axios
    .get('/logout')
    .then((res: AxiosResponse) => {
      setUserState(null);
      setTokenState(null);
      localStorage.removeItem('wasLogin');
      router.push("/")
    })
      .catch((error: AxiosError)=> {
        console.log("logout error happened", error);
      })
  };


  const onDeleteUser = async() => {
    if(!userState)return
    let res: number = await deletee(`/user/delete_user/${userState.id}`, TokenState ? TokenState : " ")
    if (res==1){
      setUserState(null);
      setTokenState(null);
      router.push("/")
    }else{
      console.log("logout error happened");
    }
  }

  useIsLogin()
  return (
    <>
      <Meta pageTitle={`設定`} pageDesc={`設定ページ`}></Meta>  
      <Box>
        <Frame>
          <Box className="flex gap-4 p-4 mt-10">
            <Link href={`/mypage/${userState?.id}`}>記事</Link>
            <Link href={`/mypage/draft/${userState?.id}`}>下書き</Link>
            <Link href={`/mypage/comments/${userState?.id}`}>コメント</Link>
          </Box>
          <button onClick={logout} className="block bg-gray-100 w-full p-4">ログアウト</button>
          <button onClick={()=>{
                  const result = confirm("本当に削除しますか？")
                  if (result) {
                    onDeleteUser()
                  }
          }} className="block bg-gray-200 w-full p-4">アカウント削除</button>
          <button onClick={()=>{router.push("/detail")}} className="block bg-gray-300 w-full p-4">このサイトについて</button>
        </Frame>
      </Box>
    </>
  );
};

export default Mypage;