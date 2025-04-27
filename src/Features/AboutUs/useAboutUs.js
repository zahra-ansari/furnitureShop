import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAboutUsData } from "../../services/apiAboutUs";

export function useAboutUs() {
  const { isLoading: isLoadingAboutUs, data: aboutUsData } = useQuery({
    queryKey: ["aboutUs"],
    queryFn: getAboutUsData,
    onError: (error) => {
      if (!(error instanceof Error)) return;

      switch (error.message) {
        case "HTTP_404":
          toast.error("اطلاعات درباره ما پیدا نشد.");
          break;
        case "HTTP_500":
          toast.error("مشکلی در سرور رخ داده. لطفاً بعداً تلاش کنید.");
          break;
        case "NETWORK_ERROR":
          toast.error(
            "اتصال به سرور ممکن نیست. لطفاً اینترنت خود را بررسی کنید."
          );
          break;
        default:
          toast.error("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
          break;
      }
    },
  });

  return { isLoadingAboutUs, aboutUsData };
}
