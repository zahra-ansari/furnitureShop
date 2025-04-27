import PropTypes from "prop-types";

const StarRating = ({ rating, setRating }) => {
  const handleClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          onClick={() => handleClick(index)}
          className={`w-6 h-6 cursor-pointer ${
            index < rating ? "text-green" : "text-gray-400"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.517 4.674a1 1 0 00.95.69h4.91c.96 0 1.356 1.23.58 1.81l-3.97 2.905a1 1 0 00-.364 1.118l1.517 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.97 2.905c-.785.57-1.84-.197-1.54-1.118l1.517-4.674a1 1 0 00-.364-1.118L1.673 10.1c-.777-.579-.38-1.81.58-1.81h4.91a1 1 0 00.95-.69l1.517-4.674z" />
        </svg>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.any,
  setRating: PropTypes.any,
};

export default StarRating;
