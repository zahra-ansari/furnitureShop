import { useState } from "react";
import { convertToPersian } from "../../utils/helpers";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import ResponseModal from "../ResponseModal/ResponseModal";
import defaultProfilePic from "./../../../public/images/users/defaultProfilePic.jpg";
import { useSubmitCommentsForArticle } from "./useSubmitCommentsForArticle";
import { useUserInfo } from "../Authentication/useUserInfo";

const CommentBoxForArticle = ({ articleSlug, fetchCommentsOfArticle }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFullName, setSelectedFullName] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState("");
  const [comment, setComment] = useState("");
  const { submitCommentForArticle } = useSubmitCommentsForArticle();
  const { userInfo } = useUserInfo();

  const handleOpenResponseModal = (id, full_name) => {
    setModalVisible(true);
    setSelectedFullName(full_name);
    setSelectedCommentId(id);
  };

  const handleCloseResponseModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userInfo) {
      toast.error("برای ارسال نظر ابتدا وارد سیستم شوید");
      return;
    } else if (!comment) {
      toast.error("لطفا نظر خود را وارد کنید");
      return;
    }

    submitCommentForArticle({ comment, articleSlug });

    setComment("");
  };

  return (
    <>
      {isModalVisible && (
        <ResponseModal
          handleClose={handleCloseResponseModal}
          fullname={selectedFullName}
          commentId={selectedCommentId}
          articleSlug={articleSlug}
        />
      )}

      <section className="border mt-10 mx-2.5 lg:mx-33.75">
        <span className="inline-block font-VazirBlack mt-4 mr-4">
          متن پرسش یا نظر
        </span>
        <form onSubmit={handleSubmit} className="w-[90%] mx-auto mt-5">
          <textarea
            className="font-Vazir border w-full resize-none"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="متن نظر یا پرسش خود را در این قسمت وارد کنید..."
          ></textarea>
          <br />
          <div className="flex flex-wrap justify-between">
            <button
              type="submit"
              className="font-Vazir mb-4 mt-3 bg-green text-white hover:bg-white hover:text-green hover:border-2 hover:border-green rounded-ss-lg rounded-se-sm rounded-ee-lg rounded-es-sm w-28 h-10"
            >
              ثبت
            </button>
          </div>
        </form>
      </section>

      <section className="border mt-10 mx-2.5 lg:mx-33.75">
        <div className="flex justify-between mx-7 mt-6">
          <span className="inline-block font-VazirBlack text-2xl">پرسش ها</span>
        </div>

        {fetchCommentsOfArticle.length !== 0 ? (
          fetchCommentsOfArticle.map((commentObj, index) => (
            <div className="border p-4 w-[90%] mx-auto my-7" key={index}>
              <div className="flex justify-between">
                <div className="flex gap-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <img
                      src={commentObj.user.avatar || defaultProfilePic}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-VazirBold">
                      {commentObj.user.full_name}
                    </span>
                    <span className="font-VazirMedium text-xs">
                      {convertToPersian(commentObj.create_at)}
                    </span>
                    <span className="font-Vazir mt-4">{commentObj.body}</span>
                  </div>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    handleOpenResponseModal(
                      commentObj.id,
                      commentObj.user.full_name
                    )
                  }
                >
                  <svg className="w-5 h-5">
                    <use href="#arrow-uturn-left"></use>
                  </svg>
                </div>
              </div>
              {commentObj.reply.length !== 0
                ? commentObj.reply.map((item, index) => (
                    <div key={index}>
                      <div className="border p-4 w-[90%] mx-auto my-7">
                        <div className="flex gap-x-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                            <img
                              src={item.user.avatar || defaultProfilePic}
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-VazirBold">
                              {item.user.full_name}
                            </span>
                            <span className="font-VazirMedium text-xs">
                              {convertToPersian(item.create_at)}
                            </span>
                            <span className="font-Vazir mt-4">{item.body}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          ))
        ) : (
          <section className="border p-4 w-[90%] mx-auto my-7 font-VazirMedium">
            تاکنون هیچ پرسشی ثبت نشده
          </section>
        )}
      </section>
    </>
  );
};

CommentBoxForArticle.propTypes = {
  productSlug: PropTypes.any,
  articleSlug: PropTypes.any,
  fetchCommentsOfProduct: PropTypes.any,
  fetchCommentsOfArticle: PropTypes.any,
};

export default CommentBoxForArticle;
