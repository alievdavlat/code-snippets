import axios from 'axios'
import { toast } from "sonner"



export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || ''




export const client = axios.create({ baseURL: API_URL })


export const hanldeRequest = ({ ...options }) => {

  const onSuccess = (response:any) => {
    return response
  }
  const onError = (error:any) => {
    toast.error(`${error.message}, ${options.url}`)

    return Promise.reject(error)
  }

  return client(options).then(onSuccess).catch(onError)
}

