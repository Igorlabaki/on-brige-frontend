import { api } from "../../service/axios";
import { useQuery } from "@tanstack/react-query";


export default function useGetListCompanies(){
    const {
        data: listCompanies,
        isError: errorListCompanies,
        isLoading: listCompaniesIsLoading, 
      } = useQuery({
        queryKey: ["listCompanies"],
        queryFn: async () => {
          return api.get(`/company/list`).then((resp) => resp.data)
        }
      }
    );

    return {listCompanies, errorListCompanies, listCompaniesIsLoading}
}
        