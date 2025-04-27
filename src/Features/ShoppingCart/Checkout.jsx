import { useForm } from "react-hook-form";
import Icons from "../../Ui/Icons";
import MenuBar from "../../Ui/MenuBar";
import NavBar from "../../Ui/NavBar";
import SideBar from "../../Ui/SideBar";
import Footer from "../../Ui/Footer";
import { useShoppingCart } from "./useShoppingCart";
import Spinner from "../../Ui/Spinner";
import { useUpdateProductQuantity } from "./useUpdateProductQuantity";
import { useDeletePurchasedProduct } from "./useDeletepurchasedProduct";
import { useCheckout } from "./useCheckout";

function Checkout() {
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  const { isLoading, purchasedProducts } = useShoppingCart();
  const { updateProductQuantity } = useUpdateProductQuantity();
  const { deletePurchasedProduct } = useDeletePurchasedProduct();
  const { isLoadingCheckout, checkout } = useCheckout();

  if (isLoading) return <Spinner />;
  if (isLoadingCheckout) return <Spinner />;

  const { id, is_paid, order_item, payment_date, status, total_price, user } =
    purchasedProducts;

  const sumOfPrices = purchasedProducts.order_item.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const sumOfDiscounts = purchasedProducts.order_item.reduce((total, item) => {
    return total + item.product.discount;
  }, 0);

  const totalQuantity = purchasedProducts.order_item.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const priceDifference = sumOfPrices - total_price;

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

  const onSubmit = (data) => {
    const {
      address,
      city,
      email,
      first_name,
      last_name,
      phone_number,
      state,
      zip_code,
    } = data;
    checkout({
      address,
      city,
      email,
      first_name,
      last_name,
      phone_number,
      state,
      zip_code,
    });
  };

  return (
    <>
      <Icons />
      <NavBar
        containerClass="xl:flex"
        hiddenClass="xl:hidden"
        positionClass="top-20"
        widthClass="lg:w-44"
      />
      <MenuBar
        containerClass="xl:flex"
        hiddenClass="hidden"
        widthClass="lg:w-64"
      />
      <div className="flex mx-2.5 lg:mx-33.75 xl:gap-x-2">
        <SideBar containerClass="xl:flex" widthClass="w-64" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:w-3/4 w-full sm:flex-row sm:gap-x-5 mt-6 mx-auto border border-slate-400 rounded-ss-lg rounded-se-sm rounded-ee-lg rounded-es-sm"
        >
          <div className="m-4 sm:basis-1/2 max-h-96 overflow-auto">
            {purchasedProducts.order_item.map((item) => (
              <div
                key={item.id}
                className="flex gap-x-5 justify-between items-center border-b pb-2 w-full mt-2"
              >
                <div className="basis-1/3 w-14 h-20">
                  <img
                    src={`https://furnitureshopp.pythonanywhere.com/${item.product.image}`}
                    className="w-full h-full"
                  />
                </div>
                <div className="basis-2/4 flex flex-col child:mb-2">
                  <span className="font-Vazir text-center">
                    {item.product.title}
                  </span>
                  <span className="font-Vazir text-center">
                    {item.product.final_price.toLocaleString("en-US")} تومان
                  </span>
                  {item.product.discount !== 0 ? (
                    <span className="border text-center">
                      <span className="line-through text-slate-400">
                        {item.product.price.toLocaleString("en-US")}
                      </span>
                      <span className="text-red-600 ml-4">
                        {item.product.discount}%
                      </span>
                    </span>
                  ) : null}
                </div>
                <div className="basis-10 flex flex-col xs:flex-row lg:flex-col gap-x-2 justify-center items-center">
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
            ))}

            <div className="mt-3 child:text-sm child:xs:text-base child:mb-2">
              <div className="flex justify-around ">
                <span className="font-VazirMedium">
                  قیمت کالاها({totalQuantity}):
                </span>
                <span className="font-Vazir">
                  {sumOfPrices.toLocaleString("en-US")} تومان
                </span>
              </div>
              <div className="flex justify-around">
                <span className="font-VazirMedium">جمع سبد خرید:</span>
                <span className="font-Vazir">
                  {total_price.toLocaleString("en-US")} تومان
                </span>
              </div>
              <div className="flex justify-around">
                <span className="font-VazirMedium">
                  سود شما از خرید({sumOfDiscounts}%):
                </span>
                <span className="font-Vazir">
                  {sumOfDiscounts !== 0
                    ? `${priceDifference.toLocaleString("en-US")} تومان`
                    : 0}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-3 child:h-8 sm:basis-1/2">
            <input
              id="first_name"
              className="font-Vazir border rounded-md outline-none"
              placeholder="نام"
              {...register("first_name", {
                required: "پر کردن فیلد نام ضروری است",
              })}
            />
            {errors.first_name && (
              <span className="text-red-400">{errors.first_name.message}</span>
            )}
            <input
              id="last_name"
              className="font-Vazir border rounded-md outline-none"
              placeholder="نام خانوادگی"
              {...register("last_name", {
                required: "پر کردن فیلد نام خانوادگی ضروری است",
              })}
            />
            {errors.last_name && (
              <span className="text-red-400">{errors.last_name.message}</span>
            )}
            <input
              id="phone_number"
              className="font-Vazir border rounded-md outline-none"
              placeholder="شماره تلفن"
              {...register("phone_number", {
                required: "پر کردن فیلد شماره تلفن ضروری است",
                pattern: {
                  value: /^09\d{9}$/,
                  message: "شماره موبایل باید با 09 شروع شود و 11 رقم باشد",
                },
              })}
            />
            {errors.phone_number && (
              <span className="text-red-400">
                {errors.phone_number.message}
              </span>
            )}
            <input
              id="email"
              className="font-Vazir border rounded-md outline-none"
              placeholder="ایمیل"
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "ایمیل معتبر وارد کنید",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-400">{errors.email.message}</span>
            )}
            <input
              id="state"
              className="font-Vazir border rounded-md outline-none"
              placeholder="استان"
              {...register("state", {
                required: "پر کردن فیلد استان ضروری است",
              })}
            />
            {errors.state && (
              <span className="text-red-400">{errors.state.message}</span>
            )}
            <input
              id="city"
              className="font-Vazir border rounded-md outline-none"
              placeholder="شهر"
              {...register("city", {
                required: "پر کردن فیلد شهر ضروری است",
              })}
            />
            {errors.city && (
              <span className="text-red-400">{errors.city.message}</span>
            )}
            <input
              id="address"
              className="font-Vazir border rounded-md outline-none"
              placeholder="آدرس"
              {...register("address", {
                required: "پر کردن فیلد آدرس ضروری است",
              })}
            />
            {errors.address && (
              <span className="text-red-400">{errors.address.message}</span>
            )}
            <input
              id="zip_code"
              className="font-Vazir border rounded-md outline-none"
              placeholder="کدپستی"
              {...register("zip_code", {
                required: "پر کردن فیلد کدپستی ضروری است",
                pattern: {
                  value: /^\d{10}$/,
                  message: "کدپستی باید ده رقم باشد",
                },
              })}
            />
            {errors.zip_code && (
              <span className="text-red-400">{errors.zip_code.message}</span>
            )}
            <button
              type="submit"
              className="font-Vazir bg-green text-white hover:bg-white hover:text-green hover:border-2 hover:border-green rounded-ss-lg rounded-se-sm rounded-ee-lg rounded-es-sm h-10"
            >
              پرداخت
            </button>
          </div>
        </form>
      </div>
      <Footer marginClass="my-14" />
    </>
  );
}

export default Checkout;
