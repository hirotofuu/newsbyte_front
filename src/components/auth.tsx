import React, { useState, ReactNode } from "react";
import { useCallback, useEffect } from 'react';
import {useUserState, useTokenState} from "./../hooks/useUser"
import axios from "./../libs/axios"
import { AxiosError, AxiosResponse } from 'axios';

type Props ={
  children: ReactNode;
}

export const Auth:React.FC<Props> = ({children}) => {
  const [tickInterval, setTickInterval] = useState<any>();
  const {userState, setUserState,} = useUserState()
  const {setTokenState} = useTokenState()

  const toggleRefresh = useCallback((status: boolean) => {
    console.log("clicked")

    if (status) {
      console.log("turning on ticking");
      let i = setInterval(() => {

        axios
        .get('/refresh_next')
        .then((res: AxiosResponse) => {
          setTokenState(res.data.access_token)
          console.log("youyou")
        })
            .catch((error: AxiosError)=> {
              console.log("user is not logged in", error);
            })
      }, 600000);
      setTickInterval(i);
    } else {  
      axios
      .get('/logout')
      .then((res: AxiosResponse) => {
        console.log("turning off ticking");
        console.log("turning off tickInterval", tickInterval);
        setTickInterval(null);
        clearInterval(tickInterval);
        localStorage.removeItem('wasLogin')
      })
      .catch((error: AxiosError)=> {
        console.log("logout error happened", error);
      })
    }
  }, [tickInterval])

  useEffect(() => {
    const wasLogin = localStorage.getItem('wasLogin')
    if (!userState && wasLogin) {
      axios
      .get('/refresh')
      .then((res: AxiosResponse) => {
        setUserState(res.data);
        if(!res.data){
          console.log("yataaaa")
          return ;
        }
        setTokenState(res.data.token)
        toggleRefresh(true);
      })
        .catch(error => {
          console.log("you are not logged in", error);
          localStorage.removeItem('wasLogin')
        })
    }
  }, [])


  return(
    <>
     {children}
    </>
     )
};

export default Auth;