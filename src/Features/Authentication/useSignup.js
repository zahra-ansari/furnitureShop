import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signupUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isPendingSignup, mutate: signup } = useMutation({
    mutationFn: ({
      full_name,
      password,
      confirm_password,
      email,
      phone_number,
    }) =>
      signupUser({
        full_name,
        password,
        confirm_password,
        email,
        phone_number,
      }),

    onSuccess: () => {
      navigate("/landing");
      toast.success(
        "حساب کاربری با موفقیت انجام شد و وارد پنل کاربری خود شوید"
      );
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
  });

  return { isPendingSignup, signup };
}
