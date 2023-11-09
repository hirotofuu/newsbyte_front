import { ReactNode } from 'react';

type Props ={
  children: ReactNode;
}

const RightFrame: React.FC<Props> =({children})=>{
  
  return(
    <>
      <div className="xl:block lg:hidden base:hidden sm:hidden w-72 mr-auto ml-6">
        {children}
      </div>

    </>
  )
}

export default RightFrame