import React, { useState, useMemo } from "react";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";
import { useForm } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import {
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select
} from "@mui/material";
import remarkGfm from 'remark-gfm';
const Simplemde = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submitContent, setSubmitContent] = useState({
    title: "",
    medium: null,
    tag: [],
    content: "",
  })

  const onSubmit = (data:any) => console.log(data);

  const onChange = (value: any) => {
    setMarkdownValue(value);
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
    <form onSubmit={handleSubmit(onSubmit)}>
    <TextField
    label="タイトル"
    className="w-full px-1 mb-3"
    id="title"
    placeholder="最大100文字"
    defaultValue=""
    size="small"
    {...register('title', { required: true})}
    />
    {errors.email && <div>入力が必須の項目です</div>}
    <FormControl fullWidth className="px-1 mb-3" size="small">
      <InputLabel>媒体</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value=""
        label="媒体"
      >
        <MenuItem value={10}>漫画</MenuItem>
        <MenuItem value={20}>漫画雑誌</MenuItem>
        <MenuItem value={20}>アニメ</MenuItem>
        <MenuItem value={30}>ラノベ</MenuItem>
        <MenuItem value={30}>映画</MenuItem>
        <MenuItem value={30}>ドラマ</MenuItem>
        <MenuItem value={30}>小説</MenuItem>
        <MenuItem value={30}>ゲーム</MenuItem>
      </Select>
    </FormControl>
    <TextField
    label="タグ"
    className="w-full px-1 mb-4"
    id="tag"
    placeholder="最大５つ　enterを押して確定"
    defaultValue=""
    size="small"
    />

    <div className="flex justify-between px-2  w-full">

      <h1 className="text-xl font-semibold">本文</h1>


        <button onClick={()=>setIsPreview(!isPreview)} className=" px-4 border-r-2   text-white bg-blue-500">{!isPreview ? "プレビューへ" : "編集へ戻る"}</button>


    </div>
    {!isPreview ? <Simplemde value={markdownValue} onChange={onChange}/> : 
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
              {markdownValue}
            </ReactMarkdown>
          </ol>
        </div>

       <ReactMarkdown remarkPlugins={[remarkGfm]}components={{
        h2: H2,
        h1: H1,
      }} className='markdown'>{markdownValue}</ReactMarkdown>  
    </>
    }

    </form>
    </>
     )
};

export default MarkdownEditor;