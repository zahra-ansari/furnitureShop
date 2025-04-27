import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const SideBar = ({ containerClass, widthClass, shrinkClass }) => {
  return (
    <div
      className={`${containerClass} ${widthClass} ${shrinkClass} hidden flex-col h-[454px] child:mt-2.5 child:h-8 child:border-b child:font-VazirMedium `}
    >
      <NavLink to={`/products`} className="hover:text-green">
        همه
      </NavLink>

      <NavLink to={`/products/category/جدیدترین`} className="hover:text-green">
        جدیدترین
      </NavLink>

      <NavLink to={`/products/category/حراج`} className="hover:text-green">
        حراج فوق العاده
      </NavLink>

      <NavLink to={`/products/category/مبلمان`} className="hover:text-green">
        مبلمان
      </NavLink>

      <NavLink to={`/products/category/لوستر`} className="hover:text-green">
        لوستر
      </NavLink>

      <NavLink to={`/products/category/میز`} className="hover:text-green">
        میز
      </NavLink>

      <NavLink to={`/products/category/صندلی`} className="hover:text-green">
        صندلی
      </NavLink>

      <NavLink to={`/products/category/ناهارخوری`} className="hover:text-green">
        ناهار خوری
      </NavLink>

      <NavLink to={`/products/category/آینه`} className="hover:text-green">
        آینه
      </NavLink>

      <NavLink to={`/products/category/عسلی`} className="hover:text-green">
        عسلی
      </NavLink>

      <NavLink to={`/products/category/تخت`} className="hover:text-green">
        تخت
      </NavLink>
    </div>
  );
};

SideBar.propTypes = {
  containerClass: PropTypes.any,
  widthClass: PropTypes.any,
  shrinkClass: PropTypes.any,
};

export default SideBar;
