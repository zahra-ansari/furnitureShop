import EachArticleFooter from "../Features/EachArticle/EachArticleFooter";
import EachArticleHeader from "../Features/EachArticle/EachArticleHeader";
import EachArticleMain from "../Features/EachArticle/EachArticleMain";
import { useArticleDetail } from "../Features/EachArticle/useArticleDetail";
import { useFetchCommentsOfArticle } from "../Features/EachArticle/useFetchCommentsOfArticle";
import Spinner from "../Ui/Spinner";

function EachArticle() {
  const { isLoading } = useArticleDetail();
  const { isPendingFetchComments } = useFetchCommentsOfArticle();

  if (isLoading) return <Spinner />;
  if (isPendingFetchComments) return <Spinner />;

  return (
    <>
      <EachArticleHeader />
      <EachArticleMain />
      <EachArticleFooter />
    </>
  );
}

export default EachArticle;
