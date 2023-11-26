import React, { useState, useMemo } from "react";
import Frame from "./../frame/frame"
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/material";

type Props = {
  onDelete: VoidFunction,
  trashMessage: string
}

export const MypageFooter:React.FC<Props> = ({onDelete, trashMessage}) => {
  return(
    <>
      <footer className="w-full bg-gray-200 fixed bottom-0">
        <Frame>
          <Box className="flex justify-end p-2">
            <h1>{trashMessage}</h1>
            <button onClick={onDelete}><DeleteIcon className="text-gray-500"></DeleteIcon></button>
          </Box>
        </Frame>
      </footer>
    </>
     )
};

export default MypageFooter;