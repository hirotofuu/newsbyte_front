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

export async function getOneArticle(id: string){
    const res=axios
    .get(`/article/${id}`)
    .then((response: AxiosResponse) => {
      console.log(response.data)
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
    return res;
}

export async function getOneUser(id: string){
    const res=axios
    .get(`/one_user/${id}`)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
    return res;
}

export async function getOneIdNameUser(id_name: string){
    const res=axios
    .get(`/one_id_name_user/${id_name}`)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
    return res;
}

export async function getFunc(url: string){
    const res=axios
    .get(url)
    .then((response: AxiosResponse) => {
      console.log(response.data)
      return response.data;
    })
    .catch((err: AxiosError) => console.log(err));
    return res;
}