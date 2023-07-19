import { fetchGet } from "@/shared";


const getCells = <T>(nameBoard: string): Promise<T> => {
    return fetchGet('all-cells', nameBoard)
}

export const CellApi = {
  getCells,
}
