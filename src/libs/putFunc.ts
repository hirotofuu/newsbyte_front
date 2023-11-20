import axios from "axios";
import { AxiosError, AxiosResponse } from 'axios';

export function putt(url: string, data: any, token: string) {
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': "Bearer " + token ,
}

  const res=axios.put('http://localhost:8080' + url, data , {headers: headers, withCredentials: true })
  .then((response: AxiosResponse) => {
    return 1
  })
  .catch((err: AxiosError) =>{
    console.log(err)
    return 0
  });
  return res;
}