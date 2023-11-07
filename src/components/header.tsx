import React, { useState, useMemo } from "react";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import {
  IconButton,
  TextField,
} from "@mui/material";
import { useCallback, useEffect } from 'react';
import {useUserState} from "./../hooks/useUser"
import axios from "./../libs/axios"
import { AxiosError, AxiosResponse } from 'axios';

export const Header:React.FC = () => {
  const router =useRouter()
  const [tickInterval, setTickInterval] = useState<any>();
  const {userState, setUserState,} = useUserState()

  const logout = () =>{
    axios
    .get('/logout')
    .then((res: AxiosResponse) => {
      setUserState(null);
    })
      .catch(error => {
        console.log("logout error happened", error);
      })
  }

  const toggleRefresh = useCallback((status: boolean) => {
    console.log("clicked")

    if (status) {
      console.log("turning on ticking");
      let i = setInterval(() => {

        axios
        .get('/refresh_next')
        .then((res: AxiosResponse) => {

        })
            .catch((error: AxiosError)=> {
              console.log("user is not logged in", error);
            })
      }, 600000);
      setTickInterval(i);
    } else {  
      console.log("turning off ticking");
      console.log("turning off tickInterval", tickInterval);
      setTickInterval(null);
      clearInterval(tickInterval);
    }
  }, [tickInterval])

  useEffect(() => {
    if (!userState) {
      axios
      .get('/refresh')
      .then((res: AxiosResponse) => {
        setUserState(res.data);
        toggleRefresh(true);
      })
        .catch(error => {
          console.log("user is not logged in", error);
        })
    }
  }, [])


  return(
    <>
    <header className="flex justify-between border-b-2 py-1 px-2 bg-white  w-full h-14">
      <Link href="/" className="mt-1 text-2xl font-bold">
        newsbyte
      </Link>
      <form className="mt-1">
        <TextField
          id="search-bar"
          className="text w-96"
          onInput={()=>{}}
          variant="outlined"
          placeholder="検索はいい文明"
          minRows="10"
          size="small"
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </form>
      <div className="flex mt-1 mr-3 gap-4">
      {!userState ? 
      <>
        <Link href="/register" className="mt-2 font-semibold hover:text-blue-500">
          会員登録
        </Link>
        <Link href="/login" className="mt-2 font-semibold hover:text-blue-500">
          ログイン
        </Link>
      </>
       :       <button
       className=" font-semibold hover:text-blue-500"
       onClick={logout}
       >ログアウト</button>}
      <button
       className="py-2 px-4 h-10 rounded-full font-semibold text-white bg-blue-500"
       onClick={()=>{router.push("/create")}}
       >記事を投稿</button>
      </div>
    </header>
     
    </>
     )
};

export default Header;