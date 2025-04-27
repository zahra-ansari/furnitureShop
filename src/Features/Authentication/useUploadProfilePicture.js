import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveProfilePicture } from "../../services/apiAuth";

export function useUploadProfilePicture() {
  const queryClient = useQueryClient();

  const { mutate: uploadProfilePicture } = useMutation({
    mutationFn: (file) => saveProfilePicture(file),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
  });

  return { uploadProfilePicture };
}
