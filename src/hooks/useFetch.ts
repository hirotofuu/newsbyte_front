import { useEffect } from "react"
import useSWR from "swr"
import axios from "../libs/axios"
const fetcher = (url: string) => axios.get(url).then((res: any)=> res.data)
export const useFetch = (url: string) => {

  const { data, error, mutate } = useSWR(url, fetcher, {
    revalidateOnMount: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  useEffect(() => {
    if (!data) {
      mutate()
    }
  }, [data, mutate])

  return { data, error, mutate }
}