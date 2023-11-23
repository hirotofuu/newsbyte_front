import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Button
} from "@mui/material";
import Frame from "./../frame/frame"
import {useUserState, useTokenState} from "../../hooks/useUser"
import axios from "../../libs/axios"
import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from "next/router";
import {useFetch} from "./../../hooks/useFetch"



export const Profile:React.FC=()=> {
  const {userState, setUserState}=useUserState()
  const {setTokenState} = useTokenState()
  const router = useRouter()
  const {data: followers, error: followersError, mutate: followersMutate} = useFetch(`/followed_users/${userState?.id}`)
  const logout = () =>{
    axios
    .get('/logout')
    .then((res: AxiosResponse) => {
      setUserState(null);
      setTokenState(null)
      router.push("/")
    })
      .catch((error: AxiosError)=> {
        console.log("logout error happened", error);
      })
  };




  return(
    <>
      <Frame>
          <h1 className="mt-3 mb-1 text-2xl font-bold text-center">{userState?.user_name}</h1>
          <p className="text-center mb-2">@{userState?.id_name}</p>
          <h1 className="flex gap-4 justify-center mb-2">
          <div className="flex text-sm">
            <Button onClick={()=>{
              router.push(`/follower/${userState?.id}`)
            }}>フォロワー: {followers ? followers.length: 0}</Button>
            <Button onClick={()=>{
              router.push(`/following/${userState?.id}`)
            }}>フォロー中: {userState?.following_user_ids ? userState?.following_user_ids.length : 0}</Button>
          <Button  color="secondary" className="" onClick={logout}>ログアウト</Button>
          </div>
          </h1>
         <p className="text-center text-xs ">{userState?.profile}</p> 
         <p className="text-center mt-4"><Link href="/mypage/edit_profile" className="">プロフィール編集</Link></p> 
      </Frame>
     
    </>
     )
};

export default Profile;