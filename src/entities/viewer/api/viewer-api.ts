import { fetchPost, fetchGet, fetchDelete, fetchPatch } from "@/shared";
import { ReqAuthLogin, ReqUpdateBody, ReqUserRegistration } from "../model";

const login = <T>(body: ReqAuthLogin): Promise<T> => {
  return fetchPost("login", body);
};
const registration = <T>(body: ReqUserRegistration): Promise<T> => {
  return fetchPost("register", body);
};

const getMy = <T>(id: string): Promise<T> => {
  return fetchGet("auth", id);
};

const deleteViewer = <T>(id: string): Promise<T> => {
  return fetchDelete("auth-remove", id);
};

const updateViewer = <T>(body: ReqUpdateBody): Promise<T> => {
  return fetchPatch("auth-update", body);
};

export const ViewerApi = {
  login,
  registration,
  getMy,
  deleteViewer,
  updateViewer,
};
