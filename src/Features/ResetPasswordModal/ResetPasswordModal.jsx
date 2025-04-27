import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useResetPasswordModal } from "./useResetPasswordModal";

function ResetPasswordModal({ handleClose }) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const { isPendingSendingLink, sendLinkForResetPassword } =
    useResetPasswordModal();

  const onSubmit = (data) => {
    console.log(data);
    const { email } = data;
    sendLinkForResetPassword({ email });
    handleClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed flex flex-col gap-y-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-lime-500 p-4 rounded-ss-lg rounded-se-sm rounded-ee-lg rounded-es-sm z-50"
    >
      <svg className="w-7 h-7" onClick={handleClose}>
        <use href="#x-mark"></use>
      </svg>
      <span className="font-VazirMedium">
        جهت بازیابی رمز، ایمیلی را که موقع ثبت نام وارد کردید، وارد نمایید:
      </span>
      <input
        type="email"
        id="email"
        placeholder="ایمیل"
        className={`border border-gray-400 font-VazirMedium pr-2 focus:outline-none rounded-ss-lg rounded-se-sm rounded-ee-lg rounded-es-sm ${
          isPendingSendingLink
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : ""
        }`}
        disabled={isPendingSendingLink}
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
      <button
        type="submit"
        className="bg-green text-white font-Vazir rounded-ss-lg rounded-se-sm rounded-ee-lg rounded-es-sm w-12 h-8"
      >
        ارسال
      </button>
    </form>
  );
}

ResetPasswordModal.propTypes = {
  handleClose: PropTypes.any,
};

export default ResetPasswordModal;
