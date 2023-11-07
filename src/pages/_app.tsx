import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useSetRecoilState, RecoilRoot, } from 'recoil';

import Header  from './../components/header';

export default function App({ Component, pageProps }: AppProps) {

  return( 
    <RecoilRoot>
      <Header></Header>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}
