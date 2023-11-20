import { NextPage } from 'next';
import { useState, ChangeEvent, useEffect } from "react";
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from "next/router";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import axios from "./../../libs/axios"
import {
  TextField,
  Alert,
  TextareaAutosize,
  Button
} from "@mui/material";

import {useUserState, useTokenState} from "./../../hooks/useUser" 


type submission = {
  id: number
  user_name: string
  profile: string
}

const Simplemde = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const Mypage: NextPage = () => {
  const {userState, setUserState} = useUserState()
  const {TokenState} = useTokenState()
  const router = useRouter()
  const [isPreview, setIsPreview] = useState(false);
  const [validation, setValidation] = useState("");
  const [submitContent, SetSubmitContent] = useState<submission>({
    id:  0,
    user_name: "",
    profile: ""
  })

  useEffect(()=>{
    SetSubmitContent({
      id: userState ? userState.id : 0,
      user_name: userState ? userState.user_name : "",
      profile: userState ? userState.profile : ""
    })
  }, [userState])

  const update_profile = () =>{
    if (!userState)return 
    console.log(JSON.stringify(submitContent))
    
    console.log(submitContent)
    const headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': TokenState ? "Bearer " + TokenState : "",
    }
  
    axios.
      put("http://localhost:8080/user/update_user", JSON.stringify(submitContent), {headers: headers, withCredentials: true }, )
      .then((res: AxiosResponse) => {
        setUserState({...userState, user_name: submitContent.user_name, profile: submitContent.profile})
        router.push(`/mypage/${userState?.id}`)
      })
      .catch((err: AxiosError) => {
        console.log(err)
      });
    }

  
  return (
<>
    {validation ? <Alert className="m-4" variant="filled" severity="error">
      {validation}
    </Alert> : ""}
    <TextField
    label="タイトル"
    className="w-full px-1 mb-3"
    id="user_name"
    name="user_name"
    placeholder="最大100文字"
    size="small"
    value={submitContent.user_name}
    onChange={e => {
      SetSubmitContent({...submitContent, user_name:e.target.value});
    }}
    />
    <TextareaAutosize
    className="w-full px-1 mb-3 border-2 m-1"
    id="user_name"
    name="user_name"
    placeholder="最大100文字"
    value={submitContent.profile}
    onChange={e => {
      SetSubmitContent({...submitContent, profile:e.target.value});
    }}
    />
  
    <Button onClick={update_profile}>更新</Button>
    </>
  );
};

export default Mypage;