import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { 
  Box,
  Menu,
 } from "@mui/material";
 import CreateIcon from '@mui/icons-material/Create';
 import { useTokenState } from "@/hooks/useUser";
 import FavoriteIcon from '@mui/icons-material/Favorite';
 import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
 import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

 type good = {
  is_good_flag: boolean
  good_num: number
 }

type Props = {
  content: string
  user_id: number
  id: number
  id_name: string
  good: good
  onGood: VoidFunction
  onDeleteGood: VoidFunction
}



export const YoutArticletBar:React.FC<Props> = ({content, id_name, id, user_id, good, onGood, onDeleteGood}) => {
  const {TokenState} = useTokenState()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const ankerH1Link = ({ node, ...props }: any) => {
    return (
        <a
          className="list-item list-none mb-2 pb-2 border-b hover:text-blue-500"
          href={"#" + node.position?.end.line.toString()} 
          onClick={handleClose}
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
          onClick={handleClose}
        >
          {props.children}
        </a>
    );
  };

  return (
    <Box className="flex justify-between w-full fixed bottom-0 xl:hidden lg:hidden px-6 py-2 bg-gray-200">
      <Box className="flex gap-2">
        <Link href={`/mypage/${user_id}`} className="text-blue-500 font-semibold p-2">@{id_name}</Link>
        <Link href={`/mypage/edit/${id}`} className="text-blue-500 font-semibold p-2"><CreateIcon></CreateIcon></Link>
      </Box>
      <Box className="flex gap-3">
      <button
      className="text-sm text-gray-500"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      >
        目次{anchorEl ? <KeyboardArrowDownIcon></KeyboardArrowDownIcon> : <KeyboardArrowUpIcon></KeyboardArrowUpIcon>}
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
      <Box className="px-3 rounded-md overflow-auto max-h-96">
        <ol className="mt-6 text-sm list-decimal list-inside">
            <button
            className="list-item list-none w-full text-left mb-2 pb-2 border-b hover:text-blue-500 "
            onClick={() => {
              handleClose()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            >
            トップページへ 
            </button>
            <ReactMarkdown
              allowedElements={["h1", "h2"]}
              components={{
                h1: ankerH1Link,
                h2: ankeH2rLink,
              }}
            >
            {content}
          </ReactMarkdown>
        </ol>
      </Box>
      </Menu>
      <button id="article_bar_good" onClick={TokenState ? good && good.is_good_flag  ? onDeleteGood : onGood : ()=>{router.push("/login")}}>
        <FavoriteIcon className={good && good.is_good_flag && TokenState ? "text-red-500" : "text-gray-300"}></FavoriteIcon> <span className="text-gray-500 text-sm">{good ? good.good_num: 0}</span> 
      </button>
      </Box>
      
    </Box>
  );
}

export default YoutArticletBar;