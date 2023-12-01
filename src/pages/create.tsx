import React, { useState, useMemo } from "react";
import axios, { AxiosError, AxiosResponse }   from "axios"
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import SimpleMDE from "easymde";
import ReactDOMServer from "react-dom/server";
import {
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
  Chip,
  Alert,
  Switch,
  Box,
  Container
} from "@mui/material";
import {useFetch} from "./../hooks/useFetch"
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import {useUserState, useTokenState} from "./../hooks/useUser" 
import {deleteSpaceStr} from "./../libs/helper"
import {useIsLogin} from "./../hooks/useRequireLogin"
import Meta from "./../components/factor/meta"

type submission = {
  title: string
  medium: number
  tags_in: string[]
  content: string
  comment_ok: boolean
  is_open_flag: boolean
}

const Simplemde = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export default function Create() {
  useIsLogin()
  const {userState} = useUserState()
  const {TokenState} = useTokenState()
  const router = useRouter()
  const [isPreview, setIsPreview] = useState(false);
  const [validation, setValidation] = useState("");
  const {mutate: DAmutation} = useFetch(`/user_save_articles/${userState?.id}`)
  const {mutate: Amutation} = useFetch(`/user_articles/${userState?.id}`)
  const [submitContent, SetSubmitContent] = useState<submission>({
    title: "",
    medium: 1,
    tags_in: [],
    content: "",
    comment_ok: true,
    is_open_flag: false,
  })
  const [tag, setTag] = useState("")
  
  const create = () =>{
  console.log(JSON.stringify(submitContent))
  setValidation("")
  if(!deleteSpaceStr(submitContent.title) || !deleteSpaceStr(submitContent.content) || !submitContent.medium){
    setValidation("タグ以外の項目は埋めましょう")
    return ;
  }
  if(submitContent.title.length>100){
    setValidation("タイトルは100文字未満に収めましょう")
    return ;
  }
  if(submitContent.content.length>20000){
    setValidation("本文は20000文字未満に収めましょう")
    return ;
  }

  SetSubmitContent({...submitContent, is_open_flag:true})  
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': TokenState ? "Bearer " + TokenState : "",
}

axios.
  put("http://localhost:8080/user/insert_article", JSON.stringify(submitContent), {headers: headers, withCredentials: true }, )
  .then((res: AxiosResponse) => {
    Amutation()
    router.push(`/mypage/${userState?.id}`)
  })
  .catch((err: AxiosError) => {
    console.log(err)
  });
}

const create_under_save = () =>{
  console.log(JSON.stringify(submitContent))
  setValidation("")
  console.log(deleteSpaceStr(submitContent.title))
  if(!deleteSpaceStr(submitContent.title)){
    setValidation("タイトルは必ず埋めましょう")
    return ;
  }
  if(submitContent.title.length>100){
    setValidation("タイトルは100文字未満に収めましょう")
    return ;
  }
  if(submitContent.content.length>10000){
    setValidation("本文は10000文字未満に収めましょう")
    return ;
  }
  if(!submitContent.content){
    SetSubmitContent({...submitContent, content:"null"})
  }
  if(!submitContent.medium){
    SetSubmitContent({...submitContent, medium:0})
  }
  
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': TokenState ? "Bearer " + TokenState : "",
}

axios.
  put("http://localhost:8080/user/insert_article", JSON.stringify(submitContent), {headers: headers, withCredentials: true }, )
  .then((res: AxiosResponse) => {
    DAmutation()
    router.push(`/mypage/draft/${userState?.id}`)
  })
  .catch((err: AxiosError) => {
    console.log(err)
  });
}
  
  const onChange = (value: any) => {
    SetSubmitContent({...submitContent, content:value});
  };


  return(
    <>
    <Meta pageTitle={`記事作成`} pageDesc={`記事の作成ページ`}></Meta>
    <Box className="flex mt-2 px-2  w-full">
      <div className="flex ml-auto mt-1 mr-3 gap-1">
        <button onClick={!submitContent.is_open_flag ? create_under_save : create} className="py-2 px-4 h-10 rounded-full font-semibold text-white bg-blue-700">{!submitContent.is_open_flag ? "下書き保存" : "公開保存"}</button>
        <Switch
        checked={submitContent.is_open_flag}
        onChange={ ()=> SetSubmitContent({...submitContent, is_open_flag: !submitContent.is_open_flag})}
        inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>
    </Box>
    {validation ? <Alert className="m-4" variant="filled" severity="error">
      {validation}
    </Alert> : ""}
    <Box className="mb-3">
      <TextField
      className="w-full px-1"
      label="タイトル"
      id="title"
      name="title"
      placeholder="最大100文字"
      size="small"
      value={submitContent.title}
      onChange={e => {
        SetSubmitContent({...submitContent, title:e.target.value});
      }}
      />
     <p className="text-xs px-2">({tag.length}/100)</p>
    </Box>
    <Box>
      <FormControl fullWidth className="px-1 mb-3" size="small">
        <Select
          labelId="demo-simple-select-label"
          label="媒体"
          id="medium"
          value={submitContent.medium}
          onChange={e => {
            SetSubmitContent({...submitContent, medium:Number(e.target.value)});
          }}
        >
          <MenuItem value={1}>漫画</MenuItem>
          <MenuItem value={2}>漫画雑誌</MenuItem>
          <MenuItem value={3}>アニメ</MenuItem>
          <MenuItem value={4}>ラノベ</MenuItem>
          <MenuItem value={5}>映画</MenuItem>
          <MenuItem value={6}>ドラマ</MenuItem>
          <MenuItem value={7}>小説</MenuItem>
          <MenuItem value={8}>ゲーム</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box>
      <TextField
      className="w-full px-1"
      id="tag"
      label="タグ"
      placeholder="最大５つ　50字以内　enterを押して確定"
      value={tag}
      onChange={e => {
        setTag(e.target.value);
      }}
      onKeyDown={e => {
        if (e.keyCode === 13) {
          if(tag.length>50)return; 
          if(deleteSpaceStr(tag) && submitContent.tags_in.length<5){
            submitContent.tags_in.push(deleteSpaceStr(tag))
            setTag("")
          }
        }
      }}
      size="small"
      />
      <p className="text-xs px-2">({tag.length}/50)</p>
    </Box>
    <ul className="mt-2 flex gap-2 px-1 flex-row flex-wrap">
      {submitContent.tags_in.map((value, index)=>
      <li key={index}>
        <Chip
        label={value}
        color="primary"
        onDelete={()=>{
          submitContent.tags_in.splice(index, 1);
          SetSubmitContent({...submitContent, tags_in: submitContent.tags_in})
        }}
      />
      </li>
      )}

    </ul>

    <Container>
      <Box className="flex justify-between px-2 mt-2  w-full">

        <h1 className="text-xl font-semibold ">本文</h1>


          <button onClick={()=>setIsPreview(!isPreview)} className=" px-4 border-r-2   text-white bg-blue-500">{!isPreview ? "プレビューへ" : "編集へ戻る"}</button>


      </Box>
      {!isPreview ? <Simplemde value={submitContent.content} onChange={onChange}/> : 
      <>
        <ReactMarkdown remarkPlugins={[remarkGfm]} className='markdown mt-3'>{submitContent.content}</ReactMarkdown>  
      </>
      }
    </Container>

    </>
     )
}
