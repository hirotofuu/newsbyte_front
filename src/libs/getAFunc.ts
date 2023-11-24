import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';

const domain = 'http://localhost:8080';



export async function getUserSaveArticle(userID: string){
    const res=axios
    .get(`/user_save_articles/${userID}`)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
    return res;
}


export async function getFunc(url: string){
    const res=axios
    .get(domain+url)
    .then((response: AxiosResponse) => {
      console.log(response.data)
      console.log("hello from the other side")
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

  const res=axios.get(domain + url ,{headers: headers, withCredentials: true })
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

  const res=axios.get(domain + url ,{
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