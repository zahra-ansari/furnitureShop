import { useMutation } from "@tanstack/react-query";
import { submitContactForm } from "../../services/apiContactUs";
import toast from "react-hot-toast";

export function useContactUs() {
  const { isLoading, mutate: contactUs } = useMutation({
    mutationFn: ({ full_name, email, phone_number, subject, content }) =>
      submitContactForm({ full_name, email, phone_number, subject, content }),

    onSuccess: () => {
      toast.success("نظر شما با موفقیت ثبت گردید");
    },
  });

  return { isLoading, contactUs };
}
