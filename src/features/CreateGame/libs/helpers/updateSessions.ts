import { ISessions } from "@/app/types/ISessions"

const updateSessions = (arr: ISessions[], id: string, updateObj: ISessions): ISessions[] => {
 return  arr.map(session => session._id === id ? updateObj : session)
}

export { updateSessions }