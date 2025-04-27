import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useProducts() {
  const { category } = useParams();

  const { isLoading, data: products } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getProducts(category),
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, products };
}
