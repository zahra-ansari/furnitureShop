import { useQuery } from "@tanstack/react-query";
import useQueryParams from "../../hooks/useQueryParams";
import { getSearchedProducts } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useSearchedProducts() {
  const query = useQueryParams();
  const searchTerm = query.get("search");
  const category = query.get("category");

  const {
    isLoading,
    data: searchedProducts,
    error,
  } = useQuery({
    queryKey: ["products", searchTerm, category],
    queryFn: () => getSearchedProducts(searchTerm, category),
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, searchedProducts, error };
}
