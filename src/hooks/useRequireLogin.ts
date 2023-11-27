import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/router";
import { useUserState } from "./useUser"
export function useRequireLogin(userID: number) {
  const { userState, isAuthChecking } = useUserState();
  const router = useRouter();
  
  useEffect(()=>{
    if(isAuthChecking) return; // まだ確認中
    if(!userState) router.push("/"); // 未ログインだったのでリダイレクト
    if(userState?.id != userID) router.push("/"); // 未ログインだったのでリダイレクト
  },[isAuthChecking, userState])
}

export function useIsLogin() {
  const { userState, isAuthChecking } = useUserState();
  const router = useRouter();
  
  useEffect(()=>{
    if(isAuthChecking) return; // まだ確認中
    if(!userState) router.push("/"); // 未ログインだったのでリダイレクト
  },[isAuthChecking, userState])
}