import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot, } from 'recoil';

import Header  from '../components/factor/header';
import Auth  from './../components/auth';

export default function App({ Component, pageProps }: AppProps) {

  return( 
    <RecoilRoot>
      <Auth>
        <Header></Header>
        <Component {...pageProps} />
      </Auth>
    </RecoilRoot>
  )
}
