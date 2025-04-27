import { useQuery } from "@tanstack/react-query";
import { getPermits } from "../../services/apiFooter";

export function usePermits() {
  const { isPending: isPendingPermits, data: permits } = useQuery({
    queryKey: ["permits"],
    queryFn: getPermits,
  });

  return { isPendingPermits, permits };
}
