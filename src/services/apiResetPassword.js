export async function sendLinkForResetPasswordApi({ email }) {
  try {
    const response = await fetch(
      "https://furnitureshopp.pythonanywhere.com/auth/password-reset/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    if (!response) throw new Error();

    const data = await response.json();
    console.log(data);
    return data;
  } catch {
    throw new Error();
  }
}
