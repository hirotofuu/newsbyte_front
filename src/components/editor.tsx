import React, { useState, ChangeEvent, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import {
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
  Chip
} from "@mui/material";
import remarkGfm from 'remark-gfm';

type submission = {
  title: string
  medium: string
  tags: string[]
  content: string
}

const Simplemde = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [submitContent, SetSubmitContent] = useState<submission>({
    title: "",
    medium: "",
    tags: [],
    content: "",
  })
  const [tag, setTag] = useState("")


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
        if(submitContent.tags.length<5){
          submitContent.tags.push(tag)
          setTag("")
        }
      }
    }}
    size="small"
    />
    <ul className="mt-2 flex gap-2 px-1">
      {submitContent.tags.map((value, index)=>
      <li key={index}>
        <Chip
        label={value}
        color="primary"
        onDelete={()=>{
          submitContent.tags.splice(index, 1);
          SetSubmitContent({...submitContent, tags: submitContent.tags})
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