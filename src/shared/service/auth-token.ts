import { deleteCookie, getCookie, setCookie } from "./cookies";

export const TokenService = {
  name: "TOKEN",
  set: (token: string) => localStorage.setItem("TOKEN", token),
  get: () => localStorage.getItem("TOKEN"),
  remove: () => localStorage.removeItem("TOKEN"),
};

export const CookieService = {
  name: "token",
  set: function (value: string, name?: string, time?: number) {
    const timer = time ? { "max-age": time } : false;
    const cookieName = name ? name : this.name;
    setCookie(cookieName, value, timer);
  },
  get: function (name?: string) {
    const cookieName = name ? name : this.name;
    return getCookie(cookieName);
  },
  remove: function (name?: string) {
    const cookieName = name ? name : this.name;
    deleteCookie(cookieName);
  },
};
