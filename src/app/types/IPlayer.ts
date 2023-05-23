interface IPlayer {
  password?: string
  fullName: string
  email: string
  image: {
    public_id: string
    url: string
  }
  passwordHash?: string
  _id: string
  updatedAt?: string | Date
  token: string
  id?: string
  online: boolean
}

export type { IPlayer }