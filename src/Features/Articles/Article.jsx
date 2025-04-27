import { NavLink } from "react-router-dom";
import { convertToPersian } from "../../utils/helpers";
import PropTypes from "prop-types";

function Article({ article }) {
  const { content, create_at, image, slug, title, update_at } = article;

  const imageUrl = `https://furnitureshopp.pythonanywhere.com/${image}`;

  return (
    <NavLink to={`/articles/item/${slug}`}>
      <div className="flex gap-x-5 items-center">
        <div className="w-[100px] h-[100px]">
          <img src={imageUrl} className="w-full h-full" />
        </div>
        <div className="flex flex-col gap-y-2 w-[80%]">
          <span className="font-VazirBlack">{title}</span>
          <span className="font-VazirMedium">
            {convertToPersian(create_at)}
          </span>
          <span className="font-Vazir line-clamp-2">{content}</span>
        </div>
      </div>
    </NavLink>
  );
}

Article.propTypes = {
  article: PropTypes.any,
};

export default Article;
