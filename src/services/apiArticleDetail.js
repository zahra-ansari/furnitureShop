export async function getArticleDetail(slug) {
  const response = await fetch(
    `https://furnitureshopp.pythonanywhere.com/blog/detail/${slug}/`
  );
  if (!response.ok) {
    throw new Error("NetWork response was not ok");
  }
  const data = await response.json();

  return data;
}
