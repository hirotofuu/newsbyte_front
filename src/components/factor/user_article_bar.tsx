import React, { useMemo } from "react";
import ArticleIcon from '@mui/icons-material/Article';
import Frame from "../frame/frame"
import { Box } from "@mui/material";

type Props = {
  article_number: number
}

export const UserABox:React.FC<Props> = ({article_number}) => {
  return(
    <>
      <Box className="w-full bg-gray-200 sticky top-0">
        <Frame>
          <Box className="p-1">
              <ArticleIcon className="text-blue-500"></ArticleIcon><span className="px-2 text-sm">{article_number}</span>
          </Box>
        </Frame>
      </Box>
    </>
     )
}

export default UserABox;