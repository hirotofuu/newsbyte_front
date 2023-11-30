import { NextPage, GetServerSideProps } from 'next';
import { useEffect, useState} from 'react';
import { useRouter } from "next/router";
import {useUserState} from "./../../hooks/useUser" 
import {useFetch} from "./../../hooks/useFetch"
import {useRequireLogin} from "../../hooks/useRequireLogin"
import { useTokenState } from './../../hooks/useUser';
import { postt } from '@/libs/putFunc';
import {Article} from "./../../types/article"
import {
  Checkbox,
  Box,
  CircularProgress
} from "@mui/material";
import Meta from "./../../components/factor/meta"
import ArticleIcon from '@mui/icons-material/Article';
import CreateIcon from '@mui/icons-material/Create';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import Profile from "../../components/profile/profile"
import MypageBox from "../../components/factor/mypage_box"
import Frame from "./../../components/frame/frame"
import NotFoundItems from "./../../components/notFound/notFoundItems"
import EArticleChoice from "./../../components/choices/user_A_choice"
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userID: any = context.params?.id;
  return{
    props: {
      userID
    },
  };
}

type Factor = {
  userID: any
}





const Mypage: NextPage<Factor> = ({userID}) => {
  const {userState} = useUserState()
  const {TokenState} = useTokenState()
  const [checkedValues, setCheckedValues] = useState<any>([]);
  const [trashValidate, setTrashValidate] = useState("");
  const [isDelete, setIsdelete] = useState(false)
  const {data: followers, error: followersError, mutate: followersMutate} = useFetch(`/followed_users/${userID}`)
  const {data: A, error: Aerror, mutate: Amutation} = useFetch(`/user_articles/${userID}`)
  const router = useRouter()
  const handleChange = (e: any) => {
    if (checkedValues.includes(Number(e.target.value))) {
      setCheckedValues(
        checkedValues.filter((checkedValue: number) => checkedValue !== Number(e.target.value))
      );
    } else {
      setCheckedValues([...checkedValues, Number(e.target.value)]);
    }
  };

  const onDelete = async() => {
    if(!userState || userState?.id!=userID)return
    if(!checkedValues.length){
      setTrashValidate("一つ以上記事を選びましょう")
      return ;
    }
    const result = confirm("本当に削除しますか？")
    if (!result) {
      return;
    }
    setIsdelete(true);
    let res: number = await postt("/user/delete_some_articles", JSON.stringify(checkedValues), TokenState ? TokenState : " ")
    if (res==1){
      setTrashValidate(`${checkedValues.length}件の記事が削除されました`)
      setCheckedValues([])
      Amutation()
    }else{
      setTrashValidate("サーバーでエラーが起きました")
    }
    setIsdelete(false);
  }

  useRequireLogin(userID);

  return (
    <>
      <Meta pageTitle={`マイページ`} pageDesc={`マイページ(記事)`}></Meta>
      <Profile followed_num={followers ? followers.length: 0}></Profile>
      <Box className="flex justify-center gap-12 mt-6 font-semibold border-b">
        <button className="pb-2 border-b-2 border-blue-500 text-blue-500"><ArticleIcon></ArticleIcon></button>
        <button onClick={()=>{router.push(`/mypage/draft/${userState?.id}`)}} className="pb-2"><CreateIcon></CreateIcon></button>
        <button  onClick={()=>{router.push(`/mypage/comments/${userState?.id}`)}}  className="pb-2"><ChatBubbleIcon></ChatBubbleIcon></button>
        <button onClick={()=>{router.push(`/mypage/setting`)}} className="pb-2"><SettingsApplicationsIcon></SettingsApplicationsIcon></button>
      </Box>
      <MypageBox onDelete={onDelete} trashMessage={trashValidate} isDelete={isDelete} article_number={A ? A.length : 0}></MypageBox>
      <Frame >
        <Box className="mb-20">
          {typeof A != "undefined" ? A ?
            A.map((article: Article, index: number)=>{
              return (
                <li key={index} className="flex gap-4 p-4 border-b-2">
                  <Checkbox value={article.id}  onChange={handleChange} checked={checkedValues.includes(article.id)}/>
                  <EArticleChoice article={article} key={index}></EArticleChoice>
                </li>
              )
            })
          : <NotFoundItems></NotFoundItems> : <CircularProgress></CircularProgress>}
        </Box>
      </Frame>
    </>
  );
};

export default Mypage;