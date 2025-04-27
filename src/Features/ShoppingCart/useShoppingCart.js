import { useQuery } from "@tanstack/react-query";
import { getBoughtProducts } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useShoppingCart() {
  const { data: purchasedProducts, isLoading } = useQuery({
    queryKey: ["shoppingCart"],
    queryFn: getBoughtProducts,

    onError: (err) => toast.error(err.message),
  });

  return { purchasedProducts, isLoading };
}
