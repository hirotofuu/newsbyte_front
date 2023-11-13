import { ReactNode } from 'react';

type Props ={
  children: ReactNode;
}

const RightFrame: React.FC<Props> =({children})=>{
  
  return(
    <>
      <div className="xl:block hidden w-72 mr-auto">
        {children}
      </div>

    </>
  )
}

export default RightFrame