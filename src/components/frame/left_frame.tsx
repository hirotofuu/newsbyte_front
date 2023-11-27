import { ReactNode } from 'react';
import { Box } from '@mui/material';
type Props ={
  children: ReactNode;
}

const LeftFrame: React.FC<Props> =({children})=>{
  
  return(
    <>
      <Box className="xl:w-1/2 lg:w-5/6 base:w-5/6 sm:w-5/6 w-full ml-auto mr-auto xl:mr-2">
        {children}
      </Box>

    </>
  )
}

export default LeftFrame