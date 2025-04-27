export async function submitContactForm({
  full_name,
  email,
  phone_number,
  subject,
  content,
}) {
  try {
    const response = await fetch(
      "https://furnitureshopp.pythonanywhere.com/contact_us/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name,
          email,
          phone_number,
          subject,
          content,
        }),
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data;
  } catch {
    throw new Error();
  }
}
