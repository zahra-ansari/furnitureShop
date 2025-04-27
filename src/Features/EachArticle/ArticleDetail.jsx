import { convertToPersian } from "../../utils/helpers";
import PropTypes from "prop-types";
import { useFetchCommentsOfArticle } from "./useFetchCommentsOfArticle";
import Spinner from "./../../Ui/Spinner";

function ArticleDetail({ articleDetail }) {
  const { content, create_at, image, slug, title, update_at } = articleDetail;
  const imageUrl = `https://furnitureshopp.pythonanywhere.com/${image}`;
  const { isPendingFetchComments, fetchCommentsOfArticle } =
    useFetchCommentsOfArticle();

  if (isPendingFetchComments) return <Spinner />;

  const numberOfComments = fetchCommentsOfArticle.length;

  let numberOfReplyComments = 0;

  fetchCommentsOfArticle.map((item) => {
    numberOfReplyComments = item.reply.length;
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center xl:mr-5">
        <div className="xl:w-[550px] xl:h-[275px]">
          <img src={imageUrl} className="w-full h-full" />
        </div>
        <span className="font-Vazir xl:w-[550px] mt-4 text-justify">
          {content}
        </span>
      </div>
      <div className="flex flex-col gap-y-5 mt-4 xl:mt-0 xl:mr-5">
        <span className="font-VazirBlack text-2xl">{title}</span>
        <div>
          <span className="font-VazirMedium">تاریخ: </span>
          <span className="font-Vazir">{convertToPersian(create_at)}</span>
        </div>
        <div>
          <span className="font-VazirMedium">تعداد نظرات: </span>
          <span className="font-Vazir">
            {numberOfComments + numberOfReplyComments}
          </span>
        </div>
        <div className="flex flex-wrap items-center ">
          <span className="inline-block font-VazirMedium">اشتراک گذاری:</span>
          <div className="flex">
            <a href="#">
              <svg className="w-8 h-8">
                <use href="#facebook"></use>
              </svg>
            </a>
            <a href="#">
              <svg className="w-8 h-8">
                <use href="#twitter"></use>
              </svg>
            </a>
            <a href="#">
              <svg className="w-8 h-8">
                <use href="#instagram"></use>
              </svg>
            </a>
            <a href="#">
              <svg className="w-8 h-8">
                <use href="#pinterest"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

ArticleDetail.propTypes = {
  articleDetail: PropTypes.any,
};

export default ArticleDetail;
