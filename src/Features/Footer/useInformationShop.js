import { useQuery } from "@tanstack/react-query";
import { getInformationShop } from "../../services/apiFooter";

export function useInformationShop() {
  const { isPending: isPendingInformationShop, data: InformationShop } =
    useQuery({ queryKey: ["informationShop"], queryFn: getInformationShop });

  return { isPendingInformationShop, InformationShop };
}
