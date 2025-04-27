import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../services/apiAuth";

export const convertToPersian = (created_at) => {
  const date = new Date(created_at);

  return new Intl.DateTimeFormat("fa-IR").format(date);
};

export function isLoggedIn() {
  const token = localStorage.getItem("access_token");

  if (!token) return false;

  try {
    // توکن رمزگشایی میشه
    const decoded = jwtDecode(token);
    // زمان فعلی براساس ثانیه دریافت میکند
    const currentTime = Date.now() / 1000;
    // زمان انقضای توکن گذشته است یا نه
    if (decoded.exp < currentTime) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function checkLoginStatus() {
  let loggedIn = isLoggedIn();

  if (!loggedIn) {
    //console.log("توکن منقضی شده . تلاش برای رفرش توکن ...");
    const newAccessToken = await refreshToken();
    loggedIn = newAccessToken ? true : false;
  }

  //console.log(loggedIn ? "کاربر لاگین است" : "کاربر لاگین نیست");

  return loggedIn;
}
