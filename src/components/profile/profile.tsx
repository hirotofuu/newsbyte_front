import React, { useState, useMemo } from "react";
import Link from "next/link";
import {Article} from "../../types/article"
import {User} from "../../types/user"
import {
  Avatar
} from "@mui/material";
import { useCallback, useEffect } from 'react';
import {useUserState, useTokenState} from "../../hooks/useUser"
import axios from "../../libs/axios"
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from "next/router";


export const Profile:React.FC=()=> {
  const {userState, setUserState}=useUserState()
  const router = useRouter()
  const logout = () =>{
    axios
    .get('/logout')
    .then((res: AxiosResponse) => {
      setUserState(null);
      router.push("/")
    })
      .catch(error => {
        console.log("logout error happened", error);
      })
  }


  return(
    <>
      <div className="text-sm pt-10 pb-6 bg-white">
          <Avatar className="mr-auto ml-auto" alt="Remy Sharp" src="https://storage.googleapis.com/zenn-user-upload/34de97ca0e3b-20231016.jpeg" sx={{ width: 80, height: 80 }}/>
          <h1 className="mt-3 mb-1 text-2xl font-bold text-center">{userState?.user_name}</h1>
          <p className="text-center mb-2">{userState?.id}人目のユーザー</p>
          <h1 className="flex gap-4 justify-center mb-2">
            <p className="text-blue-500">フォロワー</p>
            <p className="text-blue-500">フォロー中</p>
          </h1>
         <p className="text-center"><Link href="/" className="">プロフィール編集</Link></p> 
      </div>
     
    </>
     )
};

export default Profile;