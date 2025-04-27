import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { convertToPersian } from "../../utils/helpers";

function ArticleInLanding({ article }) {
  const { content, create_at, image, slug, title, update_at } = article;

  const imageUrl = `https://furnitureshopp.pythonanywhere.com/${image}`;

  return (
    <div className="rounded-lg overflow-hidden">
      <NavLink to={`/articles/item/${slug}`} className="block relative">
        <img src={imageUrl} alt="" className="w-full h-full" />
        <span className="absolute bottom-10 xl:bottom-20 right-1 text-white font-VazirThin font-bold text-sm xs:text-xl sm:text-2xl md:text-3xl xl:text-4xl">
          {title}
        </span>
        <span className="absolute bottom-5 md:bottom-2 xl:bottom-14 right-1 text-white font-VazirThin font-normal text-xs xl:text-sm md:text-base">
          {convertToPersian(create_at)}
        </span>
      </NavLink>
    </div>
  );
}

ArticleInLanding.propTypes = {
  article: PropTypes.any,
};

export default ArticleInLanding;
