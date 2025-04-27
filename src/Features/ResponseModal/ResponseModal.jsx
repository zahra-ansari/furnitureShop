import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useSubmitReplyCommentsForProduct } from "../EachProduct/useSubmitReplyCommentsForProduct";
import { useSubmitReplyCommentsForArticle } from "../EachArticle/useSubmitReplyCommentsForArticle";
import toast from "react-hot-toast";
import { useUserInfo } from "../Authentication/useUserInfo";

function ResponseModal({
  handleClose,
  fullname,
  commentId,
  productSlug = null,
  articleSlug = null,
}) {
  const { register, handleSubmit } = useForm();
  const { submitReplyCommentsForProduct } = useSubmitReplyCommentsForProduct();
  const { submitReplyCommentsForArticle } = useSubmitReplyCommentsForArticle();
  const { userInfo } = useUserInfo();

  const onSubmit = (data) => {
    const { replyCommentText } = data;

    if (!userInfo) {
      toast.error("برای ارسال نظر ابتدا وارد سیستم شوید");
      return;
    } else if (!replyCommentText) {
      toast.error("لطفا پاسخ خود را به شخص انتخاب شده وارد نمایید");
      return;
    }

    if (productSlug) {
      submitReplyCommentsForProduct({
        replyCommentText,
        commentId,
        productSlug,
      });
    } else if (articleSlug) {
      submitReplyCommentsForArticle({
        replyCommentText,
        commentId,
        articleSlug,
      });
    }

    handleClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-lime-500 bg-white w-1/2 h-64 rounded-ss-lg rounded-se-sm rounded-ee-lg rounded-es-sm z-50"
    >
      <svg
        className="absolute w-7 h-7 left-2 mt-2 cursor-pointer"
        onClick={handleClose}
      >
        <use href="#x-mark"></use>
      </svg>
      <div className="flex flex-col m-10 gap-y-5">
        <span className="font-VazirMedium ">در پاسخ به {fullname}</span>

        <textarea
          {...register("replyCommentText")}
          className="border resize-none"
          rows="4"
        ></textarea>

        <button
          type="submit"
          className="font-Vazir bg-green text-white hover:bg-white hover:text-green rounded-ss-lg rounded-se-sm rounded-ee-lg rounded-es-sm w-12 h-8"
        >
          ارسال
        </button>
      </div>
    </form>
  );
}

ResponseModal.propTypes = {
  handleClose: PropTypes.any,
  fullname: PropTypes.any,
  commentId: PropTypes.any,
  productSlug: PropTypes.any,
  articleSlug: PropTypes.any,
};

export default ResponseModal;
