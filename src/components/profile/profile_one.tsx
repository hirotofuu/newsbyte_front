import React, { useState, useMemo } from "react";
import Link from "next/link";
import {Article} from "../../types/article"
import {User} from "../../types/user"
import {
  Avatar,
  Button
} from "@mui/material";
import { useCallback, useEffect } from 'react';
import {useUserState, useTokenState} from "../../hooks/useUser"
import { putt } from "@/libs/putFunc";
import { deletee } from "@/libs/deleteFunc";
type Props = {
  user: User
}


export const ProfileOne:React.FC<Props>=({user})=> {
  const {userState, setUserState}=useUserState()
  const {TokenState, setTokenState}=useTokenState()

  const onFollow = async() => {
    if(!userState)return
    let res: number = await putt(`/user/insert_follow/${user.id}`, "", TokenState ? TokenState : " ")
    if (res==1){
      let demo: number[]=[]
      if(userState.following_user_ids){demo=[...userState.following_user_ids]}
      demo.push(Number(user.id))
      setUserState({...userState, following_user_ids: demo})
      console.log(userState.following_user_ids)
    }
  }
  const onDeleteFollow = async() => {
    if(!userState)return
    let res: number = await deletee(`/user/delete_follow/${user.id}`, TokenState ? TokenState : " ")
    if (res==1){
      let demo: number[]=[...userState.following_user_ids]
      demo = demo.filter((i)=> i != Number(user.id))
      setUserState({...userState, following_user_ids: demo})
    }
  }

  return(
    <>
      <div className="text-sm pt-10 pb-6 bg-white">
          <h1 className="mt-3 mb-1 text-2xl font-bold text-center">{user.user_name}</h1>
          <p className="text-center mb-2">{user.id_name}</p>
          <h1 className="flex gap-4 justify-center mb-2">
          {!userState ?
              <Button color="secondary">フォロー</Button> 
              : userState.following_user_ids && userState.following_user_ids.length ? userState.following_user_ids.filter((i)=>{i==user.id}) ? <Button color="secondary" onClick={onDeleteFollow}>フォロー中</Button> : 
              <Button color="secondary" onClick={onFollow}>フォロー</Button> :
              <Button color="secondary" onClick={onFollow}>フォロー</Button>}
          </h1>
          <p>{user.profile}</p>
      </div>
     
    </>
     )
};

export default ProfileOne;