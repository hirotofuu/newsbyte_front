import axios from "axios";
import { AxiosError, AxiosResponse } from 'axios';

// put外部通信関数

export function putt(url: string, data: any, token: string) {
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': "Bearer " + token ,
}

  const res=axios.put(`${process.env.NEXT_PUBLIC_APP_BACKEND}` + url, data , {headers: headers, withCredentials: true })
  .then((response: AxiosResponse) => {
    return 1
  })
  .catch((err: AxiosError) =>{
    console.log(err)
    return 0
  });
  return res;
}

export function postt(url: string, data: any, token: string) {
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': "Bearer " + token ,
}

  const res=axios.post(`${process.env.NEXT_PUBLIC_APP_BACKEND}` + url, data , {headers: headers, withCredentials: true })
  .then((response: AxiosResponse) => {
    return 1
  })
  .catch((err: AxiosError) =>{
    console.log(err)
    return 0
  });
  return res;
}