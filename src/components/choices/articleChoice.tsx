import Link from "next/link";
import Image from "next/image";
import noImage from "../../images/no_image_square.jpg"
import {
  Avatar,

} from "@mui/material";

const ArticleChoice: React.FC =()=>{

  return(
    <>
      <Link href="/">
        <div className="group hover:bg-gray-100 flex p-3 border-b bg-white"  key="hiroto">
          <div className="ml-4">
            <h2 className="text-md font-semibold xl:text-base lg:text-base md:text-base text-sm  text-black line-clamp-4">今敏監督の映画『パーフェクト ブルー』が描く「リアル」とラストの意味を徹底考察</h2>
            <div className="flex gap-4 text-xs mt-2 font-thin">
            <h2>name</h2>
            <h2>2012/2/3</h2>
            <h2>視聴回数: 2</h2>

            </div>
          </div>
        </div>   
      </Link>
    </>
  )
}

export default ArticleChoice