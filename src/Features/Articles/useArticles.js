import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../services/apiArticles";
import toast from "react-hot-toast";

export function useArticles() {
  const {
    isLoading,
    data: articles,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, articles, error };
}
