export async function refreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(
      "https://furnitureshopp.pythonanywhere.com/api/token/refresh/",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    if (!response.ok) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return null;
    }

    const data = await response.json();

    localStorage.setItem("access_token", data.access);
    return data.access;
  } catch (error) {
    console.error(error);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return null;
  }
}

export async function loginUser({ phone_number, password }) {
  try {
    const response = await fetch(
      "https://furnitureshopp.pythonanywhere.com/auth/api/token/",

      {
        method: "POST",
        // هدر مشخص میکند که داده ها جیسون هستند
        headers: {
          "Content-Type": "application/json",
        },
        // ارسال پسورد و شماره تلفن به فرمت جیسون
        body: JSON.stringify({ phone_number, password }),
      }
    );

    // مدیریت خطای زیر یعنی سرور زنده هست ولی ورود ناموفق بوده یا نتیجه درخواست ناموفق بوده است
    // اینجا میشه برای هر خطا پیغام مشخصی در نظر گرفت
    if (!response.ok) {
      throw new Error("نام کاربری یا رمز عبور اشتباه است!");
    }

    const data = await response.json();

    if (data.access) {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
    } else {
      throw new Error("توکنی دریافت نشد");
    }

    return data;

    // خطای زیر برای مدیریت هر خطای غیرمنتظره مثل قطعی اینترنت یا خاموشی سرور
  } catch (error) {
    console.error(error);
    throw new Error("ورود به سیستم با مشکل مواجه شد.");
  }
}

export function logoutUser() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export async function signupUser({
  full_name,
  password,
  confirm_password,
  email,
  phone_number,
}) {
  try {
    const response = await fetch(
      "https://furnitureshopp.pythonanywhere.com/auth/register/",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name,
          password,
          confirm_password,
          email,
          phone_number,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("مشکلی در ثبت نام رخ داده ");
    }
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("ثبت نام با مشکل مواجه شده است.");
  }
}

export async function getUserInfo() {
  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      return null;
    }

    const response = await fetch(
      `https://furnitureshopp.pythonanywhere.com/auth/profile/`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function saveProfilePicture(file) {
  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) return null;

    const formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch(
      `https://furnitureshopp.pythonanywhere.com/auth/profile/update/`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("");
    }

    const data = await response.json();
    return data;
  } catch {
    throw new Error("");
  }
}
