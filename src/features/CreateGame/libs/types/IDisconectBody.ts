interface IDisconectBody {
  method: string;
  body: {
    fullName: string;
    id: string;
    owner: string | null;
    joinSession: string | null;
  };
}

export type { IDisconectBody };
