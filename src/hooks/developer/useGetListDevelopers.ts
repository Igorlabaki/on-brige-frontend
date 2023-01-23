import { api } from "../../service/axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetListDevelopers(){
    const {
        data: listDevelopers,
        isError: errorListDevelopers,
        isLoading: listDevelopersIsLoading, 
      } = useQuery({
        queryKey: ["listDevelopers"],
        queryFn: async () => {
          return api.get(`/developer/list`).then((resp) => resp.data)
        }
      }
    );
    return {listDevelopers, errorListDevelopers, listDevelopersIsLoading}
}
        