export interface ViewerFeatureInit {
  activeFoto: string | null;
  changeViewerStatus: boolean;
  modalActive: boolean;
  titleModal: string;
  buttonTextModal: string;
  newName: string;
  loginStatus: 'login' | 'registration';
}

interface IUserLoginFields {
  text: string;
  error: boolean;
}

export interface IUserLoginValue {
  [key: string]: IUserLoginFields;
  email: IUserLoginFields;
  password: IUserLoginFields;
  name: IUserLoginFields;
}
