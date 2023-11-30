import Head from "next/head"
import {siteMeta} from '../../libs/constants'
import { useRouter } from "next/router"

const {siteTitle, siteDesc, siteUrl, siteLang, siteLocale, siteType, siteIcon}=siteMeta

const Meta=(props:{pageTitle : string , pageDesc: string} )=>{
  const router=useRouter()

  const url=`${siteUrl}${router.asPath}`



  return(
    <Head>
      <title>{props.pageTitle}</title>
      <meta property="og:title" content={props.pageTitle}/>
      <meta name="description" content={props.pageDesc}/>
      <meta property="og:description" content={siteDesc}/>
      <link rel="canonical" href={url}/>
      <meta property="og:url" content={url}/>
      <meta property="og:site_name" content={siteTitle}/>
      <meta property="og:type" content={siteType}/>
      <meta property="og:locale" content={siteLocale}/>
      <meta property="og:lang" content={siteLang}/>
      <link rel="icon" href={siteIcon} />
      <link rel="apple-touch-icon" href={siteIcon} />
    </Head>
  )
}

export default Meta