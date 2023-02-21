import { useQuery } from "@tanstack/react-query";
import { parseCookies } from "nookies";

import { api } from "../../service/axios";

export default function useGetDeveloperById(developerId: string | string[] | undefined){
    const { "auth.token": token } = parseCookies();

    const {
        data: developerById,
        isError: errorDeveloperById,
        isLoading: developerByIdIsLoading,
      } = useQuery({
        queryKey: ["developerById"],
        queryFn: async () => {
          return  api
          .get(`/developer/getById/${developerId}`, {
              headers: {
              Authorization: `Bearer ${token}`,
              },
          })
          .then((resp) => resp.data.developer)
        }
       
      })

    return {developerById, errorDeveloperById, developerByIdIsLoading}
}