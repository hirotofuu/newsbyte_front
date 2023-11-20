import Link from "next/link";
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import {getFunc} from "../../libs/getAFunc"
import {User} from "../../types/user"
import UserChoice from "@/components/choices/userChoice";
import {useFetch} from "./../../hooks/useFetch"
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
      <div className="xl:w-1/2 lg:w-1/2 base:w-5/6 sm:w-5/6  mr-auto ml-auto px-1">          
        {followed_user ?
          followed_user.map((user: any, index: any)=>{
            return (
              <UserChoice user={user}></UserChoice>
            )
          })
        : ""}
      </div>
    </>
  );
};

export default Search;