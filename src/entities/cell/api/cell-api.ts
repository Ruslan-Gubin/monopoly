import { fetchGet } from "@/shared";


const getCells = <T>(nameBoard: string, tokenSSR?: string): Promise<T> => {
    return fetchGet('all-cells', nameBoard, tokenSSR)
}

export const CellApi = {
  getCells,
}
