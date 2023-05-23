interface ISessionPlayer {
  id: string;
  fullName: string;
  img: string;
}

interface ISessions {
  owner: string;
  createdAt: string;
  players: ISessionPlayer[];
  updatedAt: string;
  __v: 0;
  _id: string;
  id?: string;
} 

export type { ISessions, ISessionPlayer };
