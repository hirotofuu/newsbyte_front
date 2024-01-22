import axios from "axios";
import { AxiosError, AxiosResponse } from 'axios';

// 削除の外部通信関数

export async function deletee(url: string, token?: string) {
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': token ? "Bearer " + token : "",
}

  const res=axios.delete(`${process.env.NEXT_PUBLIC_APP_BACKEND}` + url ,{headers: headers, withCredentials: true })
  .then((response: AxiosResponse) => {
    return 1
  })
  .catch((err: AxiosError) =>{
    console.log(err)
    return 0
  });
  return res;
}