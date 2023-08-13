export interface ViewerModel {
  image: {
    public_id: string;
    url: string;
  };
  email: string;
  fullName: string;
  viewerId: string;
}

export interface ViewerInitState {
  autorization: boolean;
  accessToken: string | null;
  authId: string | null;
  viewer: ViewerModel | null;
  loading: boolean;
  error: string | null;
}

export interface ReqAuthLogin {
  email: string;
  password: string;
}

export interface ResAuth {
  image: {
    public_id: string;
    url: string;
  };
  email: string;
  online: boolean;
  token: string;
  fullName: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
  text?: string;
  error?: {
    keyPattern: { [key: string]: number };
    keyValue: { [key: string]: string };
  };
}

export interface ReqUserRegistration {
  email: string;
  password: string;
  fullName: string;
  imag: string;
}

export interface ReqUpdateBody {
  fullName: string;
  id: string;
  imag: string;
  prevImag: string;
}
