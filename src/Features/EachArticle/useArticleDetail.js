import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getArticleDetail } from "../../services/apiArticleDetail";

export function useArticleDetail() {
  const { slug } = useParams();

  const { isLoading, data: articleDetail } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticleDetail(slug),
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, articleDetail };
}
