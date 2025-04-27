export async function getArticles() {
  const response = await fetch(
    "https://furnitureshopp.pythonanywhere.com/blog/"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  return data.results;
}
