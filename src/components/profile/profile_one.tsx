import React from "react";
import {User} from "../../types/user"
import { useRouter } from "next/router";
import {
  Button
} from "@mui/material";
import Frame from "./../frame/frame"
import {useUserState, useTokenState} from "../../hooks/useUser"
import { putt } from "@/libs/putFunc";
import { deletee } from "@/libs/deleteFunc";
type Props = {
  user: User
  followed_num: number
}


export const ProfileOne:React.FC<Props>=({user, followed_num})=> {
  const {userState, setUserState}=useUserState()
  const {TokenState}=useTokenState()
  const router =useRouter()

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
      <Frame>
          <h1 className="mt-3 mb-1 text-2xl font-bold text-center">{user.user_name}</h1>
          <p className="text-center mb-2">@{user.id_name}</p>
          <h1 className="flex gap-4 justify-center mb-2">
          <div className="flex text-sm">
            <Button onClick={()=>{
              router.push(`/follower/${user.id}`)
            }}>フォロワー: {followed_num}</Button>
            {!userState ?
                <Button color="secondary">フォローする</Button> 
                : userState.following_user_ids && userState.following_user_ids.length ? userState.following_user_ids.filter((i)=>{i==user.id}) ? <Button color="secondary" onClick={onDeleteFollow}>フォロー中</Button> : 
                <Button color="secondary" onClick={onFollow}>フォローする</Button> :
                <Button color="secondary" onClick={onFollow}>フォローする</Button>}
          </div>
          </h1>
          <p className="text-center text-xs">{user.profile}</p>
      </Frame>
     
    </>
     )
};

export default ProfileOne;