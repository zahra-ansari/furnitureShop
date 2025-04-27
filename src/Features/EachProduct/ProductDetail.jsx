import PropTypes from "prop-types";
import { useBuyProducts } from "../Products/useBuyProducts";
import { useUserInfo } from "../Authentication/useUserInfo";
import toast from "react-hot-toast";

function ProductDetail({ productDetail }) {
  const {
    average_rating,
    category,
    color,
    create_at,
    discount,
    final_price,
    id,
    image,
    lenght,
    meterial,
    price,
    slug,
    title,
    update_at,
    weight,
    width,
  } = productDetail;

  const { buyProducts } = useBuyProducts();
  const { userInfo } = useUserInfo();

  const quantity = 1;

  const imageUrl = `https://furnitureshopp.pythonanywhere.com/${image}`;

  const handleClickBuyProduct = () => {
    if (!userInfo) {
      toast.error("برای خرید کالا ابتدا باید وارد پنل کاربری خود شوید");
    } else {
      buyProducts({ id, quantity });
    }
  };

  return (
    <div className="flex mt-5 sm:mt-0 ">
      <div className="flex flex-col items-center border">
        <img src={imageUrl} alt="" />
        <button
          onClick={handleClickBuyProduct}
          className="font-VazirBold bg-green text-white mt-10 hover:bg-white hover:text-green hover:border-2 hover:border-green rounded-ss-lg rounded-se-sm rounded-ee-lg rounded-es-sm w-28 h-10"
        >
          خرید
        </button>
      </div>

      <div className="border">
        <div className="mt-4 mr-4">
          <span className="block font-VazirBlack">
            دسته بندی: {category.title}
          </span>
          <span className="font-VazirBlack">نام محصول: {title}</span>
        </div>

        <div className="flex flex-wrap gap-y-4 xl:flex-nowrap xl:gap-y-0 gap-x-20 mt-4 mr-4 ml-4">
          <div>
            <span
              className={`font-VazirBold ${
                discount === 0 ? "" : "line-through text-gray-400"
              }`}
            >
              قیمت اصلی: {price.toLocaleString("en-US")} تومان
            </span>
          </div>

          {discount === 0 ? (
            <div>
              <span className="font-VazirBold">تخفیف به زودی اعلام میگردد</span>
            </div>
          ) : (
            <div>
              <span className="font-VazirBold">
                قیمت با تخفیف: {final_price.toLocaleString("en-US")} تومان
              </span>
            </div>
          )}
        </div>

        {discount === 0 ? (
          <div className="mt-4 mr-4">
            <span className="font-VazirBold">درصد تخفیف ها از 5 الی 40</span>
          </div>
        ) : (
          <div className="mt-4 mr-4">
            <span className="font-VazirBold text-red-500">
              درصد تخفیف داده شده: {discount}%
            </span>
          </div>
        )}

        <div className="mt-4">
          <span className="font-VazirBlack mb-3 mr-4">ویژگی های کالا:</span>
          <div className="flex flex-col gap-y-3 child:mr-5">
            <div>
              <span className="font-VazirBold">طول کالا: {lenght}</span>
            </div>
            <div>
              <span className="font-VazirBold">عرض کالا: {width}</span>
            </div>
            <div>
              <span className="font-VazirBold">وزن کالا: {weight}</span>
            </div>
            <div>
              <span className="font-VazirBold">رنگ کالا: {color}</span>
            </div>
            <div>
              <span className="font-VazirBold">جنس کالا: {meterial}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductDetail.propTypes = {
  productDetail: PropTypes.any,
};

export default ProductDetail;
