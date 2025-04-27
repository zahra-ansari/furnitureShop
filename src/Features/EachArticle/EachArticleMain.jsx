import Icons from "../../Ui/Icons";
import { useFetchCommentsOfArticle } from "./useFetchCommentsOfArticle";
import { useArticleDetail } from "./useArticleDetail";
import CommentBoxForArticle from "./CommentBoxForArticle";

function EachArticleMain() {
  const { articleDetail } = useArticleDetail();
  const { fetchCommentsOfArticle } = useFetchCommentsOfArticle();

  return (
    <>
      <Icons />
      <CommentBoxForArticle
        articleSlug={articleDetail.slug}
        fetchCommentsOfArticle={fetchCommentsOfArticle}
      />
    </>
  );
}

export default EachArticleMain;
