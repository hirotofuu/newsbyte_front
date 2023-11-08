import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';



export async function getUserArticle(userID: string){
    const res=axios
    .get(`/user_articles/${userID}`)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
    return res;
}

export async function getUserSaveArticle(userID: string){
    const res=axios
    .get(`/user_save_articles/${userID}`)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
    return res;
}