import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePurchasedProductApi } from "../../services/apiProducts";

export function useDeletePurchasedProduct() {
  const queryClient = useQueryClient();

  const { mutate: deletePurchasedProduct } = useMutation({
    mutationFn: (id) => deletePurchasedProductApi(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
    },
  });

  return { deletePurchasedProduct };
}
