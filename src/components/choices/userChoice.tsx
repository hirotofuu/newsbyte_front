import Link from "next/link";
import {
  Avatar,

} from "@mui/material";




const UserChoice:React.FC =()=>{
  


  return(
    <>
        <div className="flex border-b w-full bg-white">
        <Link href={`/`} className="p-3 flex justify-between bg-white w-full ">
            <div className="flex">
            <Avatar alt="Remy Sharp" src="https://storage.googleapis.com/zenn-user-upload/34de97ca0e3b-20231016.jpeg" />
              <div className="ml-4">
                <h1 className="pt-1 font-semibold">hiroto</h1>
                <p className="mt-1 w-full text-xs line-clamp-3 text-gray-500">第10回小学館ライトノベル大賞優秀賞。
『このライトノベルがすごい！』5年連続TOP10 累計100万部突破『弱キャラ友崎くん』シリーズ刊行中。
朗読劇『お化けなんて全然怖くない。』『世界はこじつけでできている。』脚本。オリジナルアニメ『夜のクラゲは泳げない』シリーズ構成・全話脚本。 </p>
              </div>
            </div>
        </Link>
        <button className="block border-2 m-3 mt-4 text-blue-500  text-sm h-8 font-semibold px-2   rounded-l-full rounded-r-full "> Following</button>
        </div>


    </>
  )
}

export default UserChoice