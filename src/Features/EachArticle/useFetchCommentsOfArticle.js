import { useQuery } from "@tanstack/react-query";
import { fetchCommentsOfArticleApi } from "../../services/apiComments";
import toast from "react-hot-toast";
import { useArticleDetail } from "./useArticleDetail";

export function useFetchCommentsOfArticle() {
  const { articleDetail } = useArticleDetail();
  const slug = articleDetail?.slug;

  const { data: fetchCommentsOfArticle, isPending: isPendingFetchComments } =
    useQuery({
      queryKey: ["commentsOfArticle", slug],
      queryFn: () => fetchCommentsOfArticleApi(slug),
      // enabled: !!slug, // وقتی اسلاگ آماده نیست، کوئری اجرا نشه
      onError: (error) => toast.error(error.message),
    });

  return { fetchCommentsOfArticle, isPendingFetchComments };
}
