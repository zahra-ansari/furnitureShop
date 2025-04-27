import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitReplyCommentApi } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useSubmitReplyCommentsForProduct() {
  const queryClient = useQueryClient();

  const { mutate: submitReplyCommentsForProduct } = useMutation({
    mutationFn: ({ replyCommentText, commentId, productSlug }) => {
      submitReplyCommentApi({ replyCommentText, commentId, productSlug });
    },

    onSuccess: () => {
      toast.success("نظر شما با موفقیت ثبت شد");
      queryClient.invalidateQueries({ queryKey: ["commentsOfProduct"] });
    },

    onError: (error) => {
      toast.error(`خطا: ${error.message}`);
    },
  });

  return { submitReplyCommentsForProduct };
}
