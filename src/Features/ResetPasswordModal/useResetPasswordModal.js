import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendLinkForResetPasswordApi } from "../../services/apiResetPassword";
import toast from "react-hot-toast";

export function useResetPasswordModal() {
  const queryClient = useQueryClient();

  const { isPending: isPendingSendingLink, mutate: sendLinkForResetPassword } =
    useMutation({
      mutationFn: ({ email }) => sendLinkForResetPasswordApi({ email }),

      onSuccess: () => {
        toast.success("لینک بازیابی رمز با موفقیت به ایمیل شما ارسال شد");
        queryClient.invalidateQueries({ queryKey: ["resetPassword"] });
      },
    });

  return { isPendingSendingLink, sendLinkForResetPassword };
}
