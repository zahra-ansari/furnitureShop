import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitReplyCommentApi } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useSubmitReplyCommentsForArticle() {
  const queryClient = useQueryClient();

  const { mutate: submitReplyCommentsForArticle } = useMutation({
    mutationFn: ({ replyCommentText, commentId, articleSlug }) => {
      console.log(replyCommentText, commentId, articleSlug);
      submitReplyCommentApi({ replyCommentText, commentId, articleSlug });
    },

    onSuccess: () => {
      toast.success("نظر شما با موفقیت ثبت شد");
      queryClient.invalidateQueries({ queryKey: ["commentsOfArticle"] });
    },

    onError: (error) => {
      toast.error(`خطا: ${error.message}`);
    },
  });

  return { submitReplyCommentsForArticle };
}
