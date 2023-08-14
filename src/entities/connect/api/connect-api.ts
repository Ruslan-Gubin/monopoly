import { fetchGet } from "@/shared";


export const connect = <T>(): Promise<T> => {
  return fetchGet("connect");
};




