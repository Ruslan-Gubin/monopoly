import { baseFetch } from "./baseApi"

const fetchGet = <T>( url: string, params?: string): Promise<T> => {
  return baseFetch({url,  method: 'GET', params: params ? params : null})
}

const fetchPost = <T>(url: string, body: any , params?: string ): Promise<T> => {
  return baseFetch({url,  body, method: 'POST', params: params ? params : null})
}

const fetchPatch = <T>(url: string, body: any , params?: string): Promise<T> => {
  return baseFetch({url, body, method: 'PATCH', params: params ? params : null})
}

const fetchDelete = <T>(url: string,  params?: string): Promise<T> => {
  return baseFetch({url, method: 'DELETE', params: params ? params : null})
}

// const fetchPut = <T>(url: string, body: BodyInit , params?: string): Promise<T> => {
//   return baseFetch({url, header: { body, method: 'PUT'}, params: params ? params : null})
// }

export {
  fetchPost,
   fetchGet,
   fetchDelete,
   fetchPatch,
  //  fetchPut,
}