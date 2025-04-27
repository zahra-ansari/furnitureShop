export async function getPermits() {
  try {
    const response = await fetch(
      "https://furnitureshopp.pythonanywhere.com/licence/"
    );

    if (!response) throw new Error("");

    const data = await response.json();
    return data;
  } catch {
    throw new Error("");
  }
}

export async function getInformationShop() {
  try {
    const response = await fetch(
      "https://furnitureshopp.pythonanywhere.com/information_shop/"
    );

    if (!response.ok) throw new Error("");

    const data = await response.json();

    return data;
  } catch {
    throw new Error("");
  }
}
