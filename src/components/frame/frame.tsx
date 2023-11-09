import { ReactNode } from 'react';

type Props ={
  children: ReactNode;
}

const Frame: React.FC<Props> =({children})=>{
  
  return(
    <>
      <div className="xl:w-1/2 lg:w-1/2 base:w-5/6 sm:w-5/6 w-full ml-auto mr-auto p-4">
        {children}
      </div>

    </>
  )
}

export default Frame