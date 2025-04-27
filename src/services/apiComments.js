export async function submitCommentApi({
  comment,
  productSlug = null,
  articleSlug = null,
  rating,
}) {
  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      return null;
    }

    let response;

    if (productSlug) {
      response = await fetch(
        `https://furnitureshopp.pythonanywhere.com/products/${productSlug}/create_comment/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ body: comment, rating }),
        }
      );
    } else if (articleSlug) {
      response = await fetch(
        `https://furnitureshopp.pythonanywhere.com/blog/${articleSlug}/create_comment/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ body: comment }),
        }
      );
    }

    if (!response.ok) {
      throw new Error("");
    }

    const data = await response.json();
    return data;
  } catch {
    throw new Error("");
  }
}

export async function fetchCommentsOfArticleApi(slug) {
  try {
    const response = await fetch(
      `https://furnitureshopp.pythonanywhere.com/blog/${slug}/comments/`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("");
    }

    const data = await response.json();

    return data.results;
  } catch {
    throw new Error("");
  }
}

export async function fetchCommentsOfProductApi(slug) {
  try {
    const response = await fetch(
      `https://furnitureshopp.pythonanywhere.com/products/${slug}/comments/`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("");
    }

    const data = await response.json();
    return data.results;
  } catch {
    throw new Error("");
  }
}

export async function submitReplyCommentApi({
  replyCommentText,
  commentId,
  productSlug = null,
  articleSlug = null,
}) {
  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      return null;
    }

    let response;

    console.log(replyCommentText, commentId, productSlug, articleSlug);

    if (productSlug) {
      response = await fetch(
        `https://furnitureshopp.pythonanywhere.com/products/${productSlug}/${commentId}/reply/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ body: replyCommentText }),
        }
      );
    } else if (articleSlug) {
      response = await fetch(
        `https://furnitureshopp.pythonanywhere.com/blog/${articleSlug}/${commentId}/reply/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ body: replyCommentText }),
        }
      );
    }

    if (!response.ok) {
      throw new Error("");
    }

    const data = await response.json();

    return data;
  } catch {
    throw new Error("");
  }
}
