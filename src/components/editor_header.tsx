import React, { useState, useMemo } from "react";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  IconButton,
  TextField,
  Typography
} from "@mui/material";

export const EDHeader:React.FC = () => {

  return(
    <>
    <header className="flex mt-2 px-2  w-full h-14">


      <div className="flex ml-auto mt-1 mr-3 gap-4">

      <button className="py-2 px-4 h-10 rounded-full font-semibold text-white bg-blue-700">下書き保存</button>
      <button className="py-2 px-4 h-10 rounded-full font-semibold text-white bg-blue-700">公開保存</button>
      </div>
    </header>
     
    </>
     )
};

export default EDHeader;