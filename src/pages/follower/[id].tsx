import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from "next/router";
import NotFoundItems from "./../../components/notFound/notFoundItems"
import UserChoice from "@/components/choices/userChoice";
import {useFetch} from "./../../hooks/useFetch"
import { Box } from '@mui/material';
import Frame from "./../../components/frame/frame"

export const getStaticProps: GetStaticProps = async (context) => {
  const id: any = context.params?.id;
  return{
    props: {
      id
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
  id: any
}




const Search: NextPage<Factor> = ({id}) => {
  const router = useRouter()
  const {data: followed_user, error: followedError, mutate: followedMutate} = useFetch(`/followed_users/${id}`)
  return (
    <>
      <Frame>
        <Box className="flex justify-between p-3 mt-4 bg-gray-300">
          <button onClick={()=>{router.back()}} className="text-blue-500">戻る</button>
          <h1>フォロワー</h1>
        </Box>
        <Box className="px-1">          
          {followed_user ?
            followed_user.map((user: any, index: any)=>{
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