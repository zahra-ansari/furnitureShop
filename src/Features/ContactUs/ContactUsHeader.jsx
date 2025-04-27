import Icons from "../../Ui/Icons";
import MenuBar from "../../Ui/MenuBar";
import NavBar from "../../Ui/NavBar";
import SideBar from "../../Ui/SideBar";
import { useForm } from "react-hook-form";
import { useContactUs } from "./useContactUs";
import Spinner from "../../Ui/Spinner";

function ContactUsHeader() {
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  const { isLoading, contactUs } = useContactUs();

  if (isLoading) return <Spinner />;

  const onSubmit = (data) => {
    const { full_name, email, phone_number, subject, content } = data;
    contactUs({ full_name, email, phone_number, subject, content });
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
        containerClass="xl:flex "
        hiddenClass="hidden"
        widthClass="lg:w-64"
      />
      <div className="flex gap-x-10 mx-2.5 lg:mx-33.75">
        <SideBar
          containerClass="xl:flex"
          widthClass="w-64"
          shrinkClass="shrink-0"
        />
        <div>
          <span className="block font-VazirBlack mt-10">
            شما می توانید از طریق فرم زیر یا از طریق راه های ارتباطی که در پایین
            هر صفحه در اختیارتان قرار گرفته شده است، با ما ارتباط داشته باشید و
            یا نظرات، پیشنهادات و انتقادات خود را با ما در میان بگذارید
          </span>
          <div className="border mt-10 mx-2.5 lg:mx-33.75">
            <span className="inline-block font-VazirBlack mt-4 mr-4">
              متن پرسش یا نظر
            </span>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-[90%] mx-auto mt-5"
            >
              <input
                id="full_name"
                className={`font-Vazir border rounded-md outline-none ${
                  isLoading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : ""
                }`}
                placeholder="نام و نام خانوادگی"
                disabled={isLoading}
                {...register("full_name", {
                  required: "پرکردن فیلد نام و نام خانوادگی ضروری است",
                })}
              />
              {errors.full_name && (
                <span className="text-red-400">{errors.full_name.message}</span>
              )}
              <br />
              <input
                id="email"
                className={`font-Vazir border rounded-md outline-none ${
                  isLoading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : ""
                }`}
                placeholder="ایمیل"
                disabled={isLoading}
                {...register("email", {
                  required: "پر کردن فیلد ایمیل ضروری است",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "ایمیل معتبر وارد کنید",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-400">{errors.email.message}</span>
              )}
              <br />
              <input
                id="phone_number"
                className={`font-Vazir border rounded-md outline-none ${
                  isLoading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : ""
                }`}
                placeholder="شماره همراه"
                disabled={isLoading}
                {...register("phone_number", {
                  required: "پر کردن فیلد تلفن همراه ضروری است",
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
              <br />
              <input
                id="subject"
                className={`font-Vazir border rounded-md outline-none ${
                  isLoading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : ""
                }`}
                placeholder="موضوع پیام"
                disabled={isLoading}
                {...register("subject", {
                  required: "پر کردن فیلد موضوع پیام ضروری است",
                })}
              />
              {errors.subject && (
                <span className="text-red-400">{errors.subject.message}</span>
              )}
              <br />
              <textarea
                id="content"
                className={`font-Vazir border w-full resize-none rounded-xl outline-none ${
                  isLoading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : ""
                }`}
                rows="5"
                placeholder="متن نظر یا پرسش خود را در این قسمت وارد کنید..."
                disabled={isLoading}
                {...register("content", {
                  required: "پر کردن فیلد متن ضروری است",
                })}
              ></textarea>
              {errors.content && (
                <span className="text-red-400">{errors.content.message}</span>
              )}
              <br />
              <button
                type="submit"
                className="font-Vazir mb-4 mt-3 bg-green text-white hover:bg-white hover:text-green hover:border-2 hover:border-green rounded-ss-lg rounded-se-sm rounded-ee-lg rounded-es-sm w-28 h-10"
              >
                ثبت
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUsHeader;
