import React, { useState } from "react";
import Frame from "./../frame/frame"
import {useUserState, useTokenState} from "../../hooks/useUser"
import axios from "../../libs/axios"
import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from "next/router";
import {textToLink} from "./../../libs/helper"
import {
  Button
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import UserEditModal from "./../modal/user_edit_modal"
type Props ={
  followed_num: number
}

export const Profile:React.FC<Props>=({followed_num})=> {
  const {userState, setUserState}=useUserState()
  const {setTokenState} = useTokenState()
  const [isModal, setIsModal] = useState(false)
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




  return(
    <>
      <UserEditModal isModal={isModal} setIsModal={()=>{setIsModal(false)}}></UserEditModal>
      <Frame>
          <h1 className="mt-10 mb-1 text-2xl font-bold text-center">{userState?.user_name}</h1>
          <p className="text-center mb-2">@{userState?.id_name}<button className="text-xm p-2" onClick={()=>{setIsModal(true)}}><CreateIcon></CreateIcon></button></p>
          <h1 className="flex gap-4 justify-center mb-2">
          <div className="flex text-sm">
            <Button onClick={()=>{
              router.push(`/follower/${userState?.id}`)
            }}>フォロワー: {followed_num}</Button>
            <Button onClick={()=>{
              router.push(`/following/${userState?.id}`)
            }}>フォロー中: {userState?.following_user_ids ? userState?.following_user_ids.length : 0}</Button>
          <Button  color="secondary" className="" onClick={logout}>ログアウト</Button>
          </div>
          </h1>
          <p dangerouslySetInnerHTML={{
              __html: textToLink(userState ? `${userState.profile}` : '')
            }} className="text-center text-xs"></p>
      </Frame>
     
    </>
     )
};

export default Profile;