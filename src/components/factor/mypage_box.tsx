import React, { useState, useMemo } from "react";
import ArticleIcon from '@mui/icons-material/Article';
import Frame from "../frame/frame"
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/material";

type Props = {
  onDelete: VoidFunction,
  trashMessage: string,
  isDelete: boolean,
  article_number: number
}

export const MypageBox:React.FC<Props> = ({onDelete, trashMessage, isDelete, article_number}) => {
  return(
    <>
      <Box className="w-full bg-gray-200 sticky top-0">
        <Frame>
          <Box className="flex justify-between p-1">
            <Box>
              <ArticleIcon className="text-blue-500"></ArticleIcon><span className="px-2 text-sm">{article_number}</span>
            </Box>
            <Box className="flex">
              <p className="text-sm pt-1">{trashMessage}</p>
              {!isDelete ? <button onClick={onDelete}><DeleteIcon className="text-blue-500"></DeleteIcon></button> :
                <div className="flex justify-center p-1" aria-label="読み込み中">
                  <div className="animate-spin h-5 w-5 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
              }
            </Box>
          </Box>
        </Frame>
      </Box>
    </>
     )
}

export default MypageBox;