import { ReactNode } from 'react';

type Props ={
  children: ReactNode;
}

const LeftFrame: React.FC<Props> =({children})=>{
  
  return(
    <>
      <div className="xl:w-1/2 lg:w-5/6 base:w-5/6 sm:w-5/6 w-full ml-auto">
        {children}
      </div>

    </>
  )
}

export default LeftFrame