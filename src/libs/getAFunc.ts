import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';

// get用の外部通信用関数


export async function getFunc(url: string){
    const res=axios
    .get(`${process.env.NEXT_PUBLIC_APP_BACKEND}`+url)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
    return res;
}

export async function getTokenFunc(url: string, token: string){
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': token ? "Bearer " + token : "",
}

  const res=axios.get(`${process.env.NEXT_PUBLIC_APP_BACKEND}` + url ,{headers: headers, withCredentials: true })
  .then((response: AxiosResponse) => {
    return response.data
  })
  .catch((err: AxiosError) =>{
    console.log(err)
  });
  return res;
}

export async function getSearch(url: string, word: string){
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
}

  const res=axios.get(`${process.env.NEXT_PUBLIC_APP_BACKEND}` + url ,{
  headers: headers,  
  params: {
    q: word
  }, 
  withCredentials: true })
  .then((response: AxiosResponse) => {
    console.log(response.data)
    return response.data
  })
  .catch((err: AxiosError) =>{
    console.log(err)
  });
  return res;

}