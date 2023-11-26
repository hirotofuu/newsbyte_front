import { ReactNode } from 'react';
import {
  Box
} from "@mui/material";

type Props ={
  children: ReactNode;
}

const Frame: React.FC<Props> =({children})=>{
  
  return(
    <>
      <Box className="xl:w-1/2 lg:w-1/2 base:w-5/6 sm:w-5/6 mr-auto ml-auto px-1">
        {children}
      </Box>

    </>
  )
}

export default Frame