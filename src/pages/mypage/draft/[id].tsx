import { NextPage, GetServerSideProps } from 'next';
import {useState} from 'react'
import Profile from "../../../components/profile/profile";
import {useUserState} from "./../../../hooks/useUser";
import {Article} from "./../../../types/article";
import { useRouter } from "next/router";
import {useFetch} from "./../../../hooks/useFetch";
import {
  Checkbox,
  CircularProgress,
  Box
} from "@mui/material";
import Frame from "./../../../components/frame/frame";
import NotFoundItems from "./../../../components/notFound/notFoundItems";
import EArticleChoice from "./../../../components/choices/user_A_choice";
import MypageFooter from "./../../../components/factor/mypage_footer"
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userID: any = context.params?.id;
  return{
    props: {
      userID
    },
  };
}

type Factor = {
  articles: Article[] 
  userID: any
}





const Mypage: NextPage<Factor> = ({userID}) => {
  const {userState} = useUserState()
  const [checkedValues, setCheckedValues] = useState<any>([]);
  const [trashValidate, setTrashValidate] = useState("");
  const {data: followers, error: followersError, mutate: followersMutate} = useFetch(`/followed_users/${userID}`)
  const {data: A, error: Aerror, mutate: Amutation} = useFetch(`/user_save_articles/${userID}`)
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

  const onDelete = () => {
    if(!checkedValues.length)setTrashValidate("削除される記事が選ばれていません")
    else setTrashValidate(`${checkedValues.length}件の記事が削除されました`)
  }
  return (
    <>
      <Profile followed_num={followers ? followers.length: 0}></Profile>
      <Box className="flex justify-center gap-12 mt-6 font-semibold border-b">
        <button onClick={()=>{router.push(`/mypage/${userState?.id}`)}}  className="pb-2">記事</button>
        <button className="pb-2 border-b-2 border-blue-500">下書き</button>
        <button onClick={()=>{router.push(`/mypage/comments/${userState?.id}`)}}  className="pb-2">コメント</button>
        <button onClick={()=>{router.push(`/mypage/setting`)}} className="pb-2">設定</button>
      </Box>
      <Frame>
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
      <MypageFooter onDelete={onDelete} trashMessage={trashValidate}></MypageFooter>
    </>
  );
};

export default Mypage;