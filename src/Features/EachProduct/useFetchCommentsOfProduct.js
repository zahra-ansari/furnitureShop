import { useQuery } from "@tanstack/react-query";
import { fetchCommentsOfProductApi } from "../../services/apiComments";
import toast from "react-hot-toast";
import { useProductDetail } from "./useProductDetail";

export function useFetchCommentsOfProduct() {
  const { productDetail } = useProductDetail();
  const slug = productDetail?.slug;

  const { data: fetchCommentsOfProduct, isPending: isPendingFetchComments } =
    useQuery({
      queryKey: ["commentsOfProduct", slug],
      queryFn: () => fetchCommentsOfProductApi(slug),
      //enabled: !!slug, // وقتی اسلاگ آماده نیست، کوئری اجرا نشه
      onError: (error) => toast.error(error.message),
    });

  return { fetchCommentsOfProduct, isPendingFetchComments };
}
