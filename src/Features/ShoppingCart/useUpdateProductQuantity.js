import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductQuantityApi } from "../../services/apiProducts";

export function useUpdateProductQuantity() {
  const queryClient = useQueryClient();

  const { mutate: updateProductQuantity } = useMutation({
    mutationFn: ({ id, quantity }) => updateProductQuantityApi(id, quantity),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
    },
  });

  return { updateProductQuantity };
}
