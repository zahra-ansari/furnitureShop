import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/apiAuth";

export function useUserInfo() {
  const { isPending: isPendingUserInfo, data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  return { isPendingUserInfo, userInfo };
}
