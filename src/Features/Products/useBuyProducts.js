import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buyProductsApi } from "../../services/apiProducts";

import toast from "react-hot-toast";

export function useBuyProducts() {
  const queryClient = useQueryClient();

  const { mutate: buyProducts } = useMutation({
    mutationFn: ({ id, quantity }) => buyProductsApi(id, quantity),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
    },

    onError: (error) => {
      toast.error(`خطا: ${error.message}`);
    },
  });

  return { buyProducts };
}
