import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isPendingLogin, mutate: login } = useMutation({
    mutationFn: ({ phone_number, password }) =>
      loginUser({ phone_number, password }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      navigate("/landing");
      toast.success("با موفقیت وارد شدید ");
    },

    onError: () => {
      toast.error("نام کاربری یا رمز عبور صحیح نمی باشد");
    },
  });

  return { isPendingLogin, login };
}
