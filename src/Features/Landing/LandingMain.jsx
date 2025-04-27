import Icons from "./../../Ui/Icons";
import FeedbackSwiper from "./FeedbackSwiper";
import ArticleInLanding from "./ArticleInLanding";
import { useArticles } from "../Articles/useArticles";
import Spinner from "../../Ui/Spinner";

function LandingMain() {
  const { isLoading, articles } = useArticles();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Icons />
      <main>
        <section className="flex flex-col xs:flex-row xs:flex-wrap gap-y-8 xl:gap-x-24 justify-between h-[58px] mx-2.5 lg:mx-33.75 mt-16">
          <div className="flex gap-x-3.5 justify-center lg:justify-start">
            <svg className="w-14 h-14">
              <use href="#24-7-support"></use>
            </svg>
            <div className="flex flex-col">
              <span className="font-medium text-lg font-VazirBlack">
                پشتیبانی 24 ساعته
              </span>
              <span className="font-normal text-sm font-VazirMedium">
                پشتیبانی سریع
              </span>
            </div>
          </div>
          <div className="flex gap-x-3.5 justify-center lg:justify-start">
            <svg className="w-14 h-14">
              <use href="#quick-payment"></use>
            </svg>
            <div className="flex flex-col">
              <span className="font-medium text-lg font-VazirBlack">
                پرداخت سریع
              </span>
              <span className="font-normal text-sm font-VazirMedium">
                100% پرداخت امن
              </span>
            </div>
          </div>
          <div className="flex gap-x-3.5 justify-center lg:justify-start">
            <svg className="w-14 h-14">
              <use href="#smart-gift-card"></use>
            </svg>
            <div className="flex flex-col">
              <span className="font-medium text-lg font-VazirBlack">
                کارت هوشمند هدیه
              </span>
              <span className="font-normal text-sm font-VazirMedium">
                خرید بالای 40 میلیون تومان
              </span>
            </div>
          </div>
          <div className="flex gap-x-3.5 justify-center lg:justify-start">
            <svg className="w-14 h-14">
              <use href="#free-shipping"></use>
            </svg>
            <div className="flex flex-col">
              <span className="font-medium text-lg font-VazirBlack">
                ارسال رایگان
              </span>
              <span className="font-normal text-sm font-VazirMedium">
                سفارش بالای 40 میلیون تومان
              </span>
            </div>
          </div>
        </section>
        <section className="mx-2.5 mt-80 xs:mt-48 md:mt-24 lg:mx-50.75">
          <div className="font-bold text-4xl font-Vazir text-center mb-14">
            آخرین مقالات ما
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-20 xl:gap-28 text-center">
            {articles.slice(-4).map((article) => (
              <ArticleInLanding article={article} key={article.slug} />
            ))}
          </div>
        </section>
        <section className="mx-2.5 lg:mx-50.75 mt-24 text-center mb-16">
          <span className="font-bold text-4xl font-Vazir">نظرات کاربران</span>
          <FeedbackSwiper />
        </section>
      </main>
    </>
  );
}

export default LandingMain;
