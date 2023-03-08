import { useRideQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetRideFromUrl = () => {
    const intId = useGetIntId();
    return useRideQuery({
      pause: intId === -1,
      variables: {
        id: intId,
      },
    });
}