interface IJoinSessionBody {
  method: string;
  body: {
    sessionId: string;
    id: string;
    fullName: string;
    img: string;
  };
}

export type { IJoinSessionBody };
