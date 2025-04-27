import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitCommentApi } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useSubmitCommentsForProduct() {
  const queryClient = useQueryClient();

  const { mutate: submitCommentForProduct } = useMutation({
    mutationFn: ({ comment, productSlug, rating }) => {
      submitCommentApi({
        comment,
        productSlug,
        rating,
      });
    },

    onSuccess: () => {
      toast.success("نظر شما با موفقیت ثبت شد");
      queryClient.invalidateQueries({ queryKey: ["commentsOfProduct"] });
    },

    onError: (error) => {
      toast.error(`خطا: ${error.message}`);
    },
  });

  return { submitCommentForProduct };
}
