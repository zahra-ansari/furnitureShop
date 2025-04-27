import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitCommentApi } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useSubmitCommentsForArticle() {
  const queryClient = useQueryClient();

  const { mutate: submitCommentForArticle } = useMutation({
    mutationFn: ({ comment, articleSlug }) => {
      submitCommentApi({
        comment,
        articleSlug,
      });
    },

    onSuccess: () => {
      toast.success("نظر شما با موفقیت ثبت شد");
      queryClient.invalidateQueries({ queryKey: ["commentsOfArticle"] });
    },

    onError: (error) => {
      toast.error(`خطا: ${error.message}`);
    },
  });

  return { submitCommentForArticle };
}
