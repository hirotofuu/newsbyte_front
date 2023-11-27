import React, { useMemo } from "react";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Frame from "../frame/frame"
import { Box } from "@mui/material";

type Props = {
  comment_number: number
}

export const CommentBar:React.FC<Props> = ({comment_number}) => {
  return(
    <>
      <Box className="w-full bg-gray-200 sticky top-0">
        <Frame>
          <Box className="p-1">
              <ChatBubbleIcon className="text-blue-500"></ChatBubbleIcon><span className="px-2 text-sm">{comment_number}</span>
          </Box>
        </Frame>
      </Box>
    </>
     )
}

export default CommentBar;