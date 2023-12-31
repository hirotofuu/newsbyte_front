import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from "next/router";
import {getFunc} from "./../../libs/getAFunc"
import {User} from "./../../types/user"
import UserChoice from "@/components/choices/userChoice";
import NotFoundItems from "./../../components/notFound/notFoundItems"
import Frame from "./../../components/frame/frame"
import Meta from "./../../components/factor/meta"
import { Box } from '@mui/material';
export const getStaticProps: GetStaticProps = async (context) => {
  const id: any = context.params?.id;
  const users: User[] = await getFunc(`/following_users/${id}`)
  return{
    props: {
      users: users,
      id: id
    },
    revalidate: 120
  };
}


export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // アプリのビルド時にはパスに何が入るかが分からないので空でOK
    fallback: 'blocking', // 👈 ポイント
  };
};

type Factor = {
  users: User[]
  id: any
}




const Search: NextPage<Factor> = ({users, id}) => {
  const router = useRouter()
  return (
    <>
      <Meta pageTitle={`フォロー中一覧 ${id}`} pageDesc={`フォロー中一覧 ${id}`}></Meta>
      <Frame>
        <Box className="flex justify-between p-3 mt-4 bg-gray-300">
          <button onClick={()=>{router.back()}} className="text-blue-500">戻る</button>
          <h1>フォロワー</h1>
        </Box>
        <Box className="">          
          {users ?
            users.map((user: any, index: any)=>{
              return (
                <UserChoice user={user} key={index}></UserChoice>
              )
            })
          : <NotFoundItems></NotFoundItems>}
        </Box>
      </Frame>
    </>
  );
};

export default Search;