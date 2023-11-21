import Link from "next/link";
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import {getFunc} from "./../../libs/getAFunc"
import {User} from "./../../types/user"
import UserChoice from "@/components/choices/userChoice";
import NotFoundItems from "./../../components/notFound/notFoundItems"
export const getStaticProps: GetStaticProps = async (context) => {
  const id: any = context.params?.id;
  const users: User[] = await getFunc(`/following_users/${id}`)
  return{
    props: {
      users: users,
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
}




const Search: NextPage<Factor> = ({users}) => {
  const router = useRouter()
  return (
    <>
      <div className="xl:w-1/2 lg:w-1/2 base:w-5/6 sm:w-5/6  mr-auto ml-auto px-1">          
        {users ?
          users.map((user: any, index: any)=>{
            return (
              <UserChoice user={user}></UserChoice>
            )
          })
        : <NotFoundItems></NotFoundItems>}
      </div>
    </>
  );
};

export default Search;