import { ISessions } from "@/app/types/ISessions"

interface DisconectUpdateRes {
  method: string
  outUserId: string
  removeSession: ISessions | null
  
}

export type { DisconectUpdateRes }