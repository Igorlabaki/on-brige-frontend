import { parseCookies } from "nookies";
import { useQuery } from "react-query";
import { api } from "../../service/axios";

export default function useGetCompanyById(companyId: string | string[] | undefined){
    const { "auth.token": token } = parseCookies();

    const {
        data: companyById,
        isError: errorCompanyById,
        isLoading: companyByIdIsLoading,
      } = useQuery("companyById", () =>
        api
        .get(`/company/getById/${companyId}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then((resp) => resp.data.company)
      )

    return {companyById, errorCompanyById, companyByIdIsLoading}
}