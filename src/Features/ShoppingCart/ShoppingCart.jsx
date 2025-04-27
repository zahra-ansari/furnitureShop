import { useShoppingCart } from "./useShoppingCart";
import Icons from "../../Ui/Icons";
import PropTypes from "prop-types";
import Spinner from "../../Ui/Spinner";
import { NavLink } from "react-router-dom";
import { useUpdateProductQuantity } from "./useUpdateProductQuantity";
import { useDeletePurchasedProduct } from "./useDeletepurchasedProduct";

function ShoppingCart({ onClose }) {
  const { isLoading, purchasedProducts } = useShoppingCart();
  const { updateProductQuantity } = useUpdateProductQuantity();
  const { deletePurchasedProduct } = useDeletePurchasedProduct();

  if (isLoading) return <Spinner />;

  const {
    id,
    user,
    status,
    total_price,
    payment_date,
    is_paid,
    first_name,
    last_name,
    email,
    phone_number,
    state,
    city,
    zip_code,
    address,
    order_item,
  } = purchasedProducts;

  const handleDeletepurchasedProduct = (id) => {
    deletePurchasedProduct(id);
  };

  const handleIncreaseQuantity = (id) => {
    const item = purchasedProducts?.order_item.find((i) => i.id === id);
    const quantity = item.quantity + 1;
    updateProductQuantity({ id, quantity });
  };

  const handleDecreaseQuantity = (id) => {
    const item = purchasedProducts?.order_item.find((i) => i.id === id);
    const quantity = item.quantity - 1;
    updateProductQuantity({ id, quantity });
  };

  return (
    <>
      <Icons />
      <div
        className="absolute left-2 z-10 pb-3 sm:w-96 min-h-[250px] border rounded-ss-lg rounded-se-sm rounded-ee-lg rounded-es-sm border-slate-400 bg-white"
        id="shopping_list"
      >
        <div className="flex justify-between p-3">
          <svg
            onClick={onClose}
            className="w-6 h-6 cursor-pointer"
            id="shopping_close"
          >
            <use href="#x-mark"></use>
          </svg>
          <span className="font-Vazir">سبد خرید</span>
          <span className="block text-center text-white bg-green w-6 h-6 rounded-full">
            {purchasedProducts?.order_item.reduce(
              (total, item) => total + item.quantity,
              0
            )}
          </span>
        </div>
        <span className="block border-b w-[95%] mx-auto"></span>
        <div className="max-h-[336px] overflow-auto">
          {purchasedProducts.order_item.length === 0 ? (
            <div className="text-center font-Vazir text-slate-500 mt-4">
              سبد شما خالی است
            </div>
          ) : (
            purchasedProducts.order_item.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border rounded-ss-lg rounded-se-sm rounded-ee-lg rounded-es-sm border-slate-400 mt-4 h-24 w-[95%] mx-auto"
              >
                <div className="w-20 h-[90%] my-auto mr-2">
                  <img
                    src={`https://furnitureshopp.pythonanywhere.com/${item.product.image}`}
                    className="w-full h-full"
                  />
                </div>
                <div className="flex flex-col justify-center mx-4 sm:mx-0">
                  <span className="font-Vazir text-sm sm:text-base">
                    {item.product.title}
                  </span>
                  <span className="font-Vazir text-sm sm:text-base">
                    {item.product.final_price.toLocaleString("en-US")} تومان
                  </span>
                  {item.product.discount ? (
                    <span className="border">
                      <span
                        className={
                          item.product.discount === 0
                            ? ""
                            : "line-through text-slate-400 text-sm sm:text-base"
                        }
                      >
                        {item.product.price.toLocaleString("en-US")}
                      </span>
                      <span className="text-red-600 ml-4 text-sm sm:text-base">
                        {item.product.discount}%
                      </span>
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-col xs:flex-row gap-x-3 justify-center items-center border ml-2">
                  <svg
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    <use href="#plus"></use>
                  </svg>
                  <span>{item.quantity}</span>
                  {item.quantity > 1 ? (
                    <svg
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      <use href="#minus"></use>
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => handleDeletepurchasedProduct(item.id)}
                    >
                      <use href="#trash"></use>
                    </svg>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <span className="block border-b w-[95%] mx-auto mt-4"></span>
        <div className="flex px-4 mt-4 justify-between">
          <span className="font-VazirBlack">جمع کل:</span>
          <span className="font-VazirBlack">
            {total_price.toLocaleString("en-US")} تومان
          </span>
        </div>
        <span className="block border-b w-[95%] mx-auto mt-4"></span>
        {purchasedProducts.order_item.length === 0 ? (
          <div
            to=""
            className="block w-[50%] mx-auto font-VazirBold text-center text-white bg-gray-300 sm:px-6 py-3 mt-4 border rounded-ss-lg rounded-se-sm rounded-ee-lg rounded-es-sm tracking-widest"
          >
            تکمیل سفارش
          </div>
        ) : (
          <NavLink
            to="/checkout"
            className="block w-[50%] mx-auto font-VazirBold text-center text-white bg-green sm:px-6 py-3 mt-4 border rounded-ss-lg rounded-se-sm rounded-ee-lg rounded-es-sm tracking-widest"
          >
            تکمیل سفارش
          </NavLink>
        )}
      </div>
    </>
  );
}

ShoppingCart.propTypes = {
  onClose: PropTypes.any,
};

export default ShoppingCart;
