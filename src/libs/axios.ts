import Axios from 'axios'


const axios = Axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_APP_BACKEND}`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    },
    withCredentials: true,
})


 
export default axios