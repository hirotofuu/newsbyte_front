import { NextPage, GetServerSideProps } from 'next';
import {getUserArticle} from "./../../libs/getAFunc"
import { useRouter } from "next/router";
import Profile from "../../components/profile/profile"
import {useUserState} from "./../../hooks/useUser" 
import {Article} from "./../../types/article"
import { AxiosError, AxiosResponse } from 'axios';
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
  return (
    <>
      <Profile></Profile>
      <button onClick={logout}>ログアウト</button>
      <button>アカウント削除</button>
    </>
  );
};

export default Mypage;