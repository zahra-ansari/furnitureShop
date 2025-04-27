import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkoutApi } from "../../services/apiProducts";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingCheckout, mutate: checkout } = useMutation({
    mutationFn: ({
      address,
      city,
      email,
      first_name,
      last_name,
      phone_number,
      state,
      zip_code,
    }) =>
      checkoutApi({
        address,
        city,
        email,
        first_name,
        last_name,
        phone_number,
        state,
        zip_code,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
    },
  });

  return { isLoadingCheckout, checkout };
}
