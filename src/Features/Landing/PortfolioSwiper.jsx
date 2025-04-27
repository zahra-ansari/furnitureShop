// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { NavLink } from "react-router-dom";

const imageUrlSlider1 =
  "https://furnitureshopp.pythonanywhere.com/media/images/slider/1.png";

const imageUrlSlider2 =
  "https://furnitureshopp.pythonanywhere.com/media/images/slider/2.jpg";

//w-[899px] h-[439px]
const PortfolioSwiper = () => {
  return (
    <div className="w-full sm:w-3/4 xl:h-[439px]">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div className="flex md:justify-between px-7 flex-col xs:flex-row mt-10 sm:mt-0">
            {/* mr-[47px] */}
            <div className="xs:mt-10 sm:mt-[73px] mx-5">
              <p className="hidden xs:block text-base sm:text-lg md:text-xl font-normal text-green xs:mb-7 font-Vazir">
                برترین مجموعه های 2024
              </p>
              <p className="hidden xs:block font-medium text-2xl lg:text-4xl font-VazirMedium">
                مبلمان رویایی
              </p>
              <p className="hidden xs:block font-medium text-xl lg:text-4xl mb-7 font-VazirMedium">
                در خدمتتان هستیم
              </p>
              <p className="font-semibold text-2xl text-gray-500  xs:mb-6 font-Vazir">
                تا 50% تخفیف از ما تخفیف بگیرید
              </p>
              <NavLink
                to="#"
                className="hidden xs:inline-block w-32 h-10 rounded text-center bg-green text-white font-bold text-base/[40px] mb-2.5 sm:mb-20 xs:mt-10 sm:mt-3 ml-5 mr-5 font-Vazir"
              >
                خرید کنید
              </NavLink>
            </div>
            {/* ml-10 xl:ml-2 */}
            <img
              src={imageUrlSlider1}
              className="w-80 h-80 xs:w-52 xs:h-72 md:w-60 md:h-60 lg:w-64 lg:h-64 xl:w-[374px] xl:h-[374px] xs:mt-10 sm:mt-[73px] xl:mt-[36px] "
              alt=""
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:px-16 my-20">
            <div className="border border-green rounded-ss-lg rounded-se-sm rounded-ee-lg rounded-es-sm overflow-hidden h-48 md:h-64 w-1/2 sm:w-72">
              <img src={imageUrlSlider2} className="w-full h-full" />
            </div>
            <div className="content-center leading-loose text-justify font-VazirMedium text-green mt-3 text-xs xs:text-xl md:text-2xl w-1/2 sm:w-72">
              با کمک مشاورین ما، مبلمان دلخواهتان را متناسب با نیاز و سلیقه خود
              انتخاب کنید
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PortfolioSwiper;
