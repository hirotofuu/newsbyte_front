import React, { useState, ChangeEvent, useMemo } from "react";
import axios, { AxiosError, AxiosResponse }   from "axios"
import ReactMarkdown from "react-markdown";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import {
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
  Chip,
  Alert
} from "@mui/material";

import remarkGfm from 'remark-gfm';
import {useUserState, useTokenState} from "./../hooks/useUser" 
import { useForm, SubmitHandler } from "react-hook-form"

type submission = {
  title: string
  medium: string
  tags_in: string[]
  content: string
  user_id: string
  comment_ok: boolean
}

const Simplemde = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export const MarkdownEditor = () => {
  const {userState} = useUserState()
  const {TokenState} = useTokenState()
  const [isPreview, setIsPreview] = useState(false);
  const [validation, setValidation] = useState("");
  const [submitContent, SetSubmitContent] = useState<submission>({
    title: "",
    medium: "",
    tags_in: [],
    content: "",
    user_id:  "0",
    comment_ok: true,
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

  SetSubmitContent({...submitContent, user_id: userState ? String(userState.id) : "0"})
  
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': TokenState ? "Bearer " + TokenState : "",
}

axios.
  put("http://localhost:8080/user/insert_article", JSON.stringify(submitContent), {headers: headers, withCredentials: true }, )
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
  const H2 = ({ node, ...props }: any) => {
    return (
      <div>
        <h2 id={node.position?.start.line.toString()}>{props.children}</h2>
      </div>
    );
  };
  const H1 = ({ node, ...props }: any) => {
    return (
      <div>
        <h1 id={node.position?.start.line.toString()}>{props.children}</h1>
      </div>
    );
  };

  const ankerH1Link = ({ node, ...props }: any) => {
    return (
      <a
        className="list-item list-none mb-2 pb-2 border-b hover:text-blue-500"
        href={"#" + node.position?.start.line.toString()}
      >
        {props.children}
      </a>
    );
  };

  const ankeH2rLink = ({ node, ...props }: any) => {
    return (
      <a
        className="list-item list-none mb-2 pb-2 border-b hover:text-blue-500 pl-3"
        href={"#" + node.position?.start.line.toString()}
      >
        {props.children}
      </a>
    );
  };






  return(
    <>
    <header className="flex mt-2 px-2  w-full h-14">

      <div className="flex ml-auto mt-1 mr-3 gap-4">

      <button className="py-2 px-4 h-10 rounded-full font-semibold text-white bg-blue-700">下書き保存</button>
      <button onClick={create} className="py-2 px-4 h-10 rounded-full font-semibold text-white bg-blue-700">公開保存</button>
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
          SetSubmitContent({...submitContent, medium:e.target.value});
        }}
      >
        <MenuItem value={"1"}>漫画</MenuItem>
        <MenuItem value={"2"}>漫画雑誌</MenuItem>
        <MenuItem value={"3"}>アニメ</MenuItem>
        <MenuItem value={"4"}>ラノベ</MenuItem>
        <MenuItem value={"5"}>映画</MenuItem>
        <MenuItem value={"6"}>ドラマ</MenuItem>
        <MenuItem value={"7"}>小説</MenuItem>
        <MenuItem value={"8"}>ゲーム</MenuItem>
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
        <div className="p-3 m-10 bg-gray-100 border border-black border-dashed">
          目次[表示]
          <ol className="p-2 list-decimal list-inside">
            <ReactMarkdown
              allowedElements={["h1", "h2"]}
              components={{
                h1: ankerH1Link,
                h2: ankeH2rLink,
              }}
            >
              {submitContent.content}
            </ReactMarkdown>
          </ol>
        </div>

       <ReactMarkdown remarkPlugins={[remarkGfm]}components={{
        h2: H2,
        h1: H1,
      }} className='markdown'>{submitContent.content}</ReactMarkdown>  
    </>
    }
    </>
     )
};

export default MarkdownEditor;