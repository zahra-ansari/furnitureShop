import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getTeamMembers } from "../../services/apiTeamMembers";

export function useTeamMembers() {
  const { isLoading: isLoadingTeamMembers, data: teamMembersData } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: getTeamMembers,
    onError: (err) => toast.error(err.message),
  });

  return { isLoadingTeamMembers, teamMembersData };
}
