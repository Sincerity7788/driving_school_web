import Cookies from "js-cookie";

const TokenKey = "driving_user_info_token";
const UserInfo = "driving_user_info";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getUserInfo() {
  return Cookies.get(UserInfo);
}

export function setUserInfo(user) {
  return Cookies.set(UserInfo, user);
}

export function removeUserInfo() {
  return Cookies.remove(UserInfo);
}
