import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import moment from "moment";
TimeAgo.addDefaultLocale(en);

export function setToken(token: string) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  return localStorage.removeItem("token");
}

export function getTokenFormat() {
  const token = getToken();
  if (token) {xx
    return { headers: { Authorization: `Bearer ${token}` } };
  }
}

export function timeAgo(time: string) {
  const timeAgo = new TimeAgo("en-US");
  const milliseconds = moment(time).valueOf();
  return timeAgo.format(milliseconds);
}
