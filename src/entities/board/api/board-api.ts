import { fetchGet } from "@/shared";

const getBoard = <T>(id: string): Promise<T> => {
    return fetchGet('get-board', id)
}

export const BoardApi = {
  getBoard,
}