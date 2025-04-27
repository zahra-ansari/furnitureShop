import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isPendingLogout, mutate: logout } = useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      navigate("/landing");
      toast.success("با موفقیت خارج شدید");
    },
  });
  return { isPendingLogout, logout };
}
