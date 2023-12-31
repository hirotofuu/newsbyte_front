import Link from "next/link";
import { NextPage, GetServerSideProps } from 'next';
import { useState, useMemo } from "react";
import { getFunc } from "@/libs/getAFunc";
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from "next/router";
import {makeTags} from "./../../../libs/helper"
import "easymde/dist/easymde.min.css";
import {deleteSpaceStr} from "./../../../libs/helper"
import dynamic from "next/dynamic";
import {useFetch} from "./../../../hooks/useFetch"
import {useRequireLogin} from "../../../hooks/useRequireLogin"
import axios from "./../../../libs/axios"
import {deletee} from '@/libs/deleteFunc'
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
import Meta from "./../../../components/factor/meta"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import {useUserState, useTokenState} from "./../../../hooks/useUser" 
import {Article} from "./../../../types/article";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const ID: any = context.params?.id;
  const article: Article = await getFunc(`/edit_article/${ID}`)
  console.log("hello")
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

const EditPage: NextPage<Factor> = ({article}) => {
  const {userState} = useUserState()
  const {TokenState} = useTokenState()
  const [isPreview, setIsPreview] = useState(false);
  const [validation, setValidation] = useState("");
  const router = useRouter()
  const {mutate: DAmutation} = useFetch(`/user_save_articles`)
  const {mutate: Amutation} = useFetch(`/user_articles/${article.user_id}`)
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
    Amutation()
    if(!article.is_open_flag){
      DAmutation()
    }
    router.push(`/mypage/${userState?.id}`)
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
  if(submitContent.content.length>20000){
    setValidation("本文は20000文字未満に収めましょう")
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
      DAmutation()
      if(article.is_open_flag){
        Amutation()
      }
      router.push(`/mypage/draft/${userState?.id}`)
    })
    .catch((err: AxiosError) => {
      console.log(err)
    });
  }
  
  const onChange = (value: any) => {
    SetSubmitContent({...submitContent, content:value});
  };

  const deleteComment = async() => {
    if(!userState)return
    const result = confirm("本当に削除しますか？")
    if (!result) {
      return;
    }
    let res: number = await deletee(`/user/delete_articles/${article?.id}`, TokenState ? TokenState : " ")
    if (res==1){
      router.push(`/mypage/${userState.id}`)
      if(article.is_open_flag){
        Amutation()
      }else{
        DAmutation()
      }
    }else{
      setValidation("サーバーないでエラーが起きました")
    }
  }

  useRequireLogin(article.user_id);

  return (
<>
    <Meta pageTitle={`編集ページ`} pageDesc={`"${article.title}"の編集ページ`}></Meta>  
    <Box className="flex mt-2 px-2  w-full h-14">
      <Box className="flex ml-auto mt-1 mr-3 gap-1">
        <button onClick={!submitContent.is_open_flag ? create_under_save : create} className="py-2 px-4 h-10 rounded-full font-semibold text-white bg-blue-700">{!submitContent.is_open_flag ? "下書き保存" : "公開保存"}</button>
        <Switch
        checked={submitContent.is_open_flag}
        onChange={ ()=> SetSubmitContent({...submitContent, is_open_flag: !submitContent.is_open_flag})}
        inputProps={{ 'aria-label': 'controlled' }}
        />
      </Box>
    </Box>
    {validation ? <Alert className="m-4" variant="filled" severity="error">
      {validation}
    </Alert> : ""}
    <Box className="mb-3">
      <TextField
      label="タイトル"
      className="w-full px-1"
      id="title"
      name="title"
      placeholder="最大100文字"
      size="small"
      value={submitContent.title}
      onChange={e => {
        SetSubmitContent({...submitContent, title:e.target.value});
      }}
      />
      <p className="text-xs px-2">({submitContent.title.length}/100)</p>
    </Box>
    <Box>
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
    </Box>
    <Box>
      <TextField
      label="タグ"
      className="w-full px-1"
      id="tag"
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
    <Box className="px-1 my-4">
      <h1 className="font-semibold mb-1">コメントを公開する</h1>
      <Switch
        checked={submitContent.comment_ok}
        onChange={ ()=> SetSubmitContent({...submitContent, comment_ok: !submitContent.comment_ok})}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </Box>
      <Box className="flex justify-between px-2  w-full">

        <h1 className="text-xl font-semibold ">本文</h1>


          <button onClick={()=>setIsPreview(!isPreview)} className=" px-4 border-r-2   text-white bg-blue-500">{!isPreview ? "プレビューへ" : "編集へ戻る"}</button>


      </Box>
      {!isPreview ? <Simplemde value={submitContent.content} onChange={onChange}/> : 
      <>
        <ReactMarkdown remarkPlugins={[remarkGfm]} className='markdown mt-3'>{submitContent.content}</ReactMarkdown>  
      </>
      }
      <Box className="flex justify-end mt-6 mb-10 mr-3 gap-1">
          <button onClick={deleteComment} className="py-2 px-4 h-10 rounded-full font-semibold text-white bg-red-500">削除する</button>
      </Box>
    </Container>
    </>
  );
};

export default EditPage;