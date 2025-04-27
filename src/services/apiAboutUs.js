export async function getAboutUsData() {
  try {
    const response = await fetch(
      "https://furnitureshopp.pythonanywhere.com/about_us/"
    );
    if (!response.ok) {
      // تبدیل status به پیغام واضح و قابل بررسی
      throw new Error(`HTTP_${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      // مثل Failed to fetch یا CORS
      throw new Error("NETWORK_ERROR");
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("UNKNOWN_ERROR");
  }
}
