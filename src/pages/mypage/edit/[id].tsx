import Link from "next/link";
import { NextPage, GetServerSideProps } from 'next';
import { useState, ChangeEvent, useEffect } from "react";
import { getFunc } from "@/libs/getAFunc";
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from "next/router";
import ArticleChoice from "@/components/choices/articleChoice";
import {makeTags} from "./../../../libs/helper"
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import axios from "./../../../libs/axios"
import {
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
  Chip,
  Alert,
  Switch,
} from "@mui/material";

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import {useUserState, useTokenState} from "./../../../hooks/useUser" 
import {Article} from "./../../../types/article";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const ID: any = context.params?.id;
  const article: any = await getFunc(`/edit_article/${ID}`)
  return{
    props: {
      article,
    },
  };
}

type Factor = {
  article: Article
}


type submission = {
  id: number
  title: string
  medium: number
  tags_in: string[]
  content: string
  user_id: number
  comment_ok: boolean
  is_open_flag: boolean
}

const Simplemde = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const Mypage: NextPage<Factor> = ({article}) => {
  const {userState} = useUserState()
  const {TokenState} = useTokenState()
  const [isPreview, setIsPreview] = useState(false);
  const [validation, setValidation] = useState("");
  const [submitContent, SetSubmitContent] = useState<submission>({
    id: article.id,
    title: article.title,
    medium: article.medium,
    tags_in: article.tagss_out!="{}" ? makeTags(article.tagss_out) : [],
    content: article.content,
    user_id:  Number(article.user_id),
    comment_ok: article.comment_ok,
    is_open_flag: article.is_open_flag,
  })
  const [firstContent, setFirstContent] = useState<submission>({
    id: article.id,
    title: article.title,
    medium: article.medium,
    tags_in: article.tagss_out!="{}" ? makeTags(article.tagss_out) : [],
    content: article.content,
    user_id:  Number(article.user_id),
    comment_ok: article.comment_ok,
    is_open_flag: article.is_open_flag,
  })
  const [tag, setTag] = useState("")

const create = () =>{
  console.log(JSON.stringify(submitContent))
  setValidation("")
  if(!submitContent.title || !submitContent.content || !submitContent.medium){
    setValidation("タグ以外の項目は埋めましょう")
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

  if(submitContent == firstContent){
    setValidation("変化を加えないと編集はできません")
    console.log(submitContent)
    console.log(firstContent)
    return ;
  }

  SetSubmitContent({...submitContent, is_open_flag:true})
  SetSubmitContent({...submitContent, user_id: userState ? Number(userState.id) : 0})
  
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': TokenState ? "Bearer " + TokenState : "",
}

axios.
  put("http://localhost:8080/user/update_article", JSON.stringify(submitContent), {headers: headers, withCredentials: true }, )
  .then((res: AxiosResponse) => {
    console.log("seccess")
  })
  .catch((err: AxiosError) => {
    console.log(err)
  });
}

const create_under_save = () =>{
  console.log(JSON.stringify(submitContent))
  setValidation("")
  if(!submitContent.title){
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


  SetSubmitContent({...submitContent, user_id: userState ? Number(userState.id) : 0})
  
  console.log(submitContent)
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': TokenState ? "Bearer " + TokenState : "",
  }

  axios.
    put("http://localhost:8080/user/update_article", JSON.stringify(submitContent), {headers: headers, withCredentials: true }, )
    .then((res: AxiosResponse) => {
      console.log("seccess")
    })
    .catch((err: AxiosError) => {
      console.log(err)
    });
  }
  
  const onChange = (value: any) => {
    SetSubmitContent({...submitContent, content:value});
  };
  return (
<>
    <header className="flex mt-2 px-2  w-full h-14">
      <div className="flex ml-auto mt-1 mr-3 gap-1">
        <button onClick={!submitContent.is_open_flag ? create_under_save : create} className="py-2 px-4 h-10 rounded-full font-semibold text-white bg-blue-700">{!submitContent.is_open_flag ? "下書き保存" : "公開保存"}</button>
        <Switch
        checked={submitContent.is_open_flag}
        onChange={ ()=> SetSubmitContent({...submitContent, is_open_flag: !submitContent.is_open_flag})}
        inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>
    </header>
    {validation ? <Alert className="m-4" variant="filled" severity="error">
      {validation}
    </Alert> : ""}
    <TextField
    label="タイトル"
    className="w-full px-1 mb-3"
    id="title"
    name="title"
    placeholder="最大100文字"
    size="small"
    value={submitContent.title}
    onChange={e => {
      SetSubmitContent({...submitContent, title:e.target.value});
    }}
    />
    <FormControl fullWidth className="px-1 mb-3" size="small">
      <InputLabel>媒体</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="medium"
        label="媒体"
        value={submitContent.medium}
        onChange={e => {
          SetSubmitContent({...submitContent, medium:Number(e.target.value)});
        }}
      >
        <MenuItem value={0}></MenuItem>
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
    <TextField
    label="タグ"
    className="w-full px-1"
    id="tag"
    placeholder="最大５つ　enterを押して確定"
    value={tag}
    onChange={e => {
      setTag(e.target.value);
    }}
    onKeyDown={e => {
      if (e.keyCode === 13) {
        if(submitContent.tags_in.length<5){
          submitContent.tags_in.push(tag)
          setTag("")
        }
      }
    }}
    size="small"
    />
    <ul className="mt-2 flex gap-2 px-1">
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

    <div className="flex justify-between px-2 mt-8  w-full">

      <h1 className="text-xl font-semibold">本文</h1>


        <button onClick={()=>setIsPreview(!isPreview)} className=" px-4 border-r-2   text-white bg-blue-500">{!isPreview ? "プレビューへ" : "編集へ戻る"}</button>


    </div>
    {!isPreview ? <Simplemde value={submitContent.content} onChange={onChange}/> : 
    <>
       <ReactMarkdown remarkPlugins={[remarkGfm]} className='markdown mt-3'>{submitContent.content}</ReactMarkdown>  
    </>
    }
    </>
  );
};

export default Mypage;