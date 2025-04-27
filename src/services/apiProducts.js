import { jwtDecode } from "jwt-decode";

export async function getSearchedProducts(searchTerm, category) {
  const response = await fetch(
    "https://furnitureshopp.pythonanywhere.com/products/"
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  let filteredProducts;

  if (category === "جدیدترین") {
    const sortedProducts = data.results.sort(
      (a, b) => new Date(b.create_at) - new Date(a.create_at)
    );
    filteredProducts = sortedProducts.slice(0, 8);
  } else if (category === "حراج") {
    filteredProducts = data.results.filter((product) => product.discount !== 0);
  } else if (
    category !== "حراج" &&
    category !== "جدیدترین" &&
    category !== "همه"
  ) {
    filteredProducts = data.results.filter(
      (product) => product.category.title === category
    );
  } else {
    filteredProducts = data.results;
  }

  const filteredData = filteredProducts.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return filteredData;
}

export async function getProducts(category) {
  const response = await fetch(
    "https://furnitureshopp.pythonanywhere.com/products/"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  let filteredProducts = data.results;

  if (category && category !== "حراج" && category && category !== "جدیدترین") {
    filteredProducts = data.results.filter(
      (product) => product.category.title === category
    );
  } else if (category && category === "حراج") {
    filteredProducts = data.results.filter((product) => product.discount !== 0);
  } else if (category && category === "جدیدترین") {
    const sortedProducts = data.results.sort(
      (a, b) => new Date(b.create_at) - new Date(a.create_at)
    );
    filteredProducts = sortedProducts.slice(0, 8);
  }
  return filteredProducts;
}

export async function buyProductsApi(id, quantity) {
  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      return null;
    }
    const cartResponse = await fetch(
      "https://furnitureshopp.pythonanywhere.com/cart/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!cartResponse.ok) {
      return null;
    }

    const cartData = await cartResponse.json();
    const orderId = cartData.id;

    const addToCartResponse = await fetch(
      `https://furnitureshopp.pythonanywhere.com/cart/add-to-cart/${id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ order: orderId, product: id, quantity }),
      }
    );

    if (!addToCartResponse.ok) {
      return null;
    }
    const addedProductData = await addToCartResponse.json();

    return addedProductData;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getBoughtProducts() {
  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) return null;

    const response = await fetch(
      "https://furnitureshopp.pythonanywhere.com/cart/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response) return null;

    const data = await response.json();

    return data;
  } catch {
    throw new Error("");
  }
}

export async function updateProductQuantityApi(id, quantity) {
  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) return null;

    const response = await fetch(
      `https://furnitureshopp.pythonanywhere.com/cart/update-cart-item/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ quantity }),
      }
    );

    if (!response) return null;

    const data = await response.json();

    return data;
  } catch {
    throw new Error("");
  }
}

export async function deletePurchasedProductApi(id) {
  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) return null;

    const response = await fetch(
      `https://furnitureshopp.pythonanywhere.com/cart/remove-from-cart/${id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response) return null;

    const data = await response.json();

    return data;
  } catch {
    throw new Error("");
  }
}

export async function checkoutApi({
  address,
  city,
  email,
  first_name,
  last_name,
  phone_number,
  state,
  zip_code,
}) {
  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) return null;

    const decoded = jwtDecode(accessToken);
    console.log(decoded);
    const user = decoded.user_id;

    const cartResponse = await fetch(
      "https://furnitureshopp.pythonanywhere.com/cart/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!cartResponse.ok) {
      return null;
    }

    const cartData = await cartResponse.json();
    const orderId = cartData.id;

    console.log(cartData);

    console.log(orderId); //e7ff56ec-97c0-432b-b6f8-b9a73892d36c

    const addToCheckOutResponse = await fetch(
      "https://furnitureshopp.pythonanywhere.com/pay/checkout/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          order: orderId,
          user,
          first_name,
          last_name,
          email,
          phone_number,
          state,
          city,
          zip_code,
          address,
        }),
      }
    );

    if (!addToCheckOutResponse.ok) throw new Error("");

    const data = await addToCheckOutResponse.json();
    return data;
  } catch {
    throw new Error("");
  }
}
