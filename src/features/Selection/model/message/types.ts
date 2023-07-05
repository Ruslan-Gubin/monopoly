export interface MessageModel {
  authorId: string;
  createdAt: string;
  fullName: string;
  image: string;
  text: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface SelectMessageInitState {
  messages: MessageModel[];
  error: string | null;
}
