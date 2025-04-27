import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import ShoppingCart from "./../Features/ShoppingCart/ShoppingCart";
import PropTypes from "prop-types";
import defaultProfilePic from "./../../public/images/users/defaultProfilePic.jpg";
import { useState } from "react";
import { useUserInfo } from "../Features/Authentication/useUserInfo";
import { useLogout } from "../Features/Authentication/useLogout";
import { useUploadProfilePicture } from "../Features/Authentication/useUploadProfilePicture";
import { useShoppingCart } from "../Features/ShoppingCart/useShoppingCart";
import toast from "react-hot-toast";

const NavBar = ({ containerClass, hiddenClass, positionClass, widthClass }) => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [isShoppingCart, setIsShoppingCart] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const { userInfo } = useUserInfo();
  const { logout } = useLogout();
  const { uploadProfilePicture } = useUploadProfilePicture();
  const { purchasedProducts } = useShoppingCart();

  const onSubmit = (data) => {
    const { searchTerm, category } = data;
    navigate(`/search-products?search=${searchTerm}&category=${category}`);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      uploadProfilePicture(file);
    }
  };

  const handleClickOpenSideBar = () => {
    setIsSideBarVisible(true);
  };

  const handleClickCloseSideBar = () => {
    setIsSideBarVisible(false);
  };

  const handleClickOpenShoppingCart = () => {
    if (userInfo) {
      setIsShoppingCart(true);
    } else {
      toast.error("برای مشاهده سبد خرید وارد پنل کاربری خود شوید.");
    }
  };

  const handleClickCloseShoppingCart = () => {
    setIsShoppingCart(false);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mx-2.5 lg:mx-33.75 mt-5">
        <div className={`${containerClass} hidden items-center gap-x-1`}>
          <svg className="w-8 h-10">
            <use href="#furniking"></use>
          </svg>
          <span className="font-VazirBold">مبلمان</span>
        </div>
        <div
          onClick={handleClickOpenSideBar}
          className={`${hiddenClass} flex items-center mx-2.5`}
          id="bars_three_icon"
        >
          <svg className="w-8 h-10">
            <use href="#bars-3"></use>
          </svg>
        </div>
        {isSideBarVisible && (
          <div
            className={`${hiddenClass} ${positionClass} ${widthClass} flex flex-col absolute right-2 w-36 h-[450px] border rounded-ss-lg rounded-se-sm rounded-ee-lg rounded-es-sm border-slate-400 bg-white child:mt-2.5 child:h-8 child:border-b child:font-VazirMedium z-10`}
            id="products_list"
          >
            <div onClick={handleClickCloseSideBar}>
              <svg className="w-6 h-6 cursor-pointer" id="products_close">
                <use href="#x-mark"></use>
              </svg>
            </div>
            <NavLink to={`/products`} className="hover:text-green">
              همه
            </NavLink>
            <NavLink
              to={`/products/category/جدیدترین`}
              className="hover:text-green"
            >
              جدیدترین
            </NavLink>
            <NavLink
              to={`/products/category/حراج`}
              className="hover:text-green"
            >
              حراج فوق العاده
            </NavLink>
            <NavLink
              to={`/products/category/مبلمان`}
              className="hover:text-green"
            >
              مبلمان
            </NavLink>
            <NavLink
              to={`/products/category/لوستر`}
              className="hover:text-green"
            >
              لوستر
            </NavLink>
            <NavLink to={`/products/category/میز`} className="hover:text-green">
              میز
            </NavLink>
            <NavLink
              to={`/products/category/صندلی`}
              className="hover:text-green"
            >
              صندلی
            </NavLink>
            <NavLink
              to={`/products/category/ناهارخوری`}
              className="hover:text-green"
            >
              ناهار خوری
            </NavLink>
            <NavLink
              to={`/products/category/آینه`}
              className="hover:text-green"
            >
              آینه
            </NavLink>
            <NavLink
              to={`/products/category/عسلی`}
              className="hover:text-green"
            >
              عسلی
            </NavLink>
            <NavLink to={`/products/category/تخت`} className="hover:text-green">
              تخت
            </NavLink>
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex lg:mr-3 xl:mr-[120px] h-[46px] border-2 border-green rounded-lg"
        >
          <input
            type="text"
            className="w-20 xs:w-36 sm:w-52 md:w-72 lg:w-72 xl:w-[432px] mr-2 lg:mr-6 outline-none font-VazirThin"
            placeholder="جستجوکالا..."
            {...register("searchTerm")}
          />

          <select
            className="bg-white text-gray-400 outline-none font-VazirLight hidden xs:flex items-center sm:ml-5"
            {...register("category")}
          >
            <option value="همه">همه</option>
            <option value="جدیدترین">جدیدترین</option>
            <option value="حراج">حراج</option>
            <option value="مبلمان">مبلمان</option>
            <option value="لوستر">لوستر</option>
            <option value="میز">میز</option>
            <option value="صندلی">صندلی</option>
            <option value="ناهارخوری">ناهار خوری</option>
            <option value="آینه">آینه</option>
            <option value="عسلی">عسلی</option>
            <option value="تخت">تخت</option>
          </select>

          <button
            type="submit"
            className="flex justify-center items-center h-full w-9 lg:w-[55px] bg-green text-white"
          >
            <svg className="w-4 h-4 stroke-2">
              <use href="#search-icon"></use>
            </svg>
          </button>
        </form>

        <div className="flex gap-x-2 lg:gap-x-5 mr-3 xl:mr-[70px] mt-3">
          <div
            onClick={handleClickOpenShoppingCart}
            className="relative shopping__bag--counts cursor-pointer"
            id="shopping_cart_icon"
          >
            {!userInfo ? null : (
              <span className="block absolute w-4 h-4 rounded-full bg-green text-center leading-4 text-white text-xs -top-2 -right-2">
                {purchasedProducts?.order_item.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </span>
            )}

            <svg className="w-6 h-6">
              <use href="#shopping-bag"></use>
            </svg>
          </div>
          {isShoppingCart && (
            <ShoppingCart onClose={handleClickCloseShoppingCart} />
          )}

          {!userInfo ? (
            <svg className="w-6 h-6">
              <use href="#face-smile"></use>
            </svg>
          ) : (
            <NavLink onClick={logout}>
              <svg className="w-6 h-6">
                <use href="#arrow-left-start-on-rectangle"></use>
              </svg>
            </NavLink>
          )}

          {!userInfo ? (
            <svg className="w-6 h-6">
              <use href="#heart"></use>
            </svg>
          ) : (
            <div>
              <label htmlFor="profile-pic-upload">
                <img
                  className="w-9 h-9 rounded-full cursor-pointer"
                  src={userInfo.avatar || defaultProfilePic}
                />
              </label>

              <input
                type="file"
                id="profile-pic-upload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  containerClass: PropTypes.any,
  hiddenClass: PropTypes.any,
  positionClass: PropTypes.any,
  widthClass: PropTypes.any,
};

export default NavBar;
