import { ReactNode } from 'react';
import { Box } from '@mui/material';
type Props ={
  children: ReactNode;
}

const RightFrame: React.FC<Props> =({children})=>{
  
  return(
    <>
      <Box className="xl:block hidden w-72 mr-auto">
        {children}
      </Box>

    </>
  )
}

export default RightFrame