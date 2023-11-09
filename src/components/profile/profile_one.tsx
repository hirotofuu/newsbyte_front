import React, { useState, useMemo } from "react";
import Link from "next/link";
import {Article} from "../../types/article"
import {User} from "../../types/user"
import {
  Avatar
} from "@mui/material";
import { useCallback, useEffect } from 'react';
import {useUserState, useTokenState} from "../../hooks/useUser"

type Props = {
  user: User
}


export const ProfileOne:React.FC<Props>=({user})=> {
  const {userState}=useUserState()

  return(
    <>
      <div className="text-sm pt-10 pb-6 bg-white">
          <Avatar className="mr-auto ml-auto" alt="Remy Sharp" src="https://storage.googleapis.com/zenn-user-upload/34de97ca0e3b-20231016.jpeg" sx={{ width: 80, height: 80 }}/>
          <h1 className="mt-3 mb-1 text-2xl font-bold text-center">{user.user_name}</h1>
          <p className="text-center mb-2">{user.id}人目のユーザー</p>
          <h1 className="flex gap-4 justify-center mb-2">
            <p className="text-blue-500">フォロワー</p>
            <p className="text-blue-500">フォロー中</p>
          </h1>
      </div>
     
    </>
     )
};

export default ProfileOne;