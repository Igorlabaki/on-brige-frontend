import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "../../Interfaces";

interface UseUpadateCompanyInfoProps{
    bodyReq:{
        companyId: string | undefined , name: string | undefined,about: string | undefined,email: string | undefined,cityName: string | undefined,countryName: string | undefined,linkList: Link[]
    },
    handleClose?: () =>  void;
}

export default function useUpadateCompanyInfo({bodyReq, handleClose}: UseUpadateCompanyInfoProps){
    const queryClient = useQueryClient();
    const { "auth.token": token } = parseCookies();
    
    const {
        data: companyInfo,
        isError: errorCompanyInfo,
        isLoading: companyInfoIsLoading,
        mutate: companyInfoMutate
      } = useMutation("companyInfo", () =>
      api
        .put("/company/updateInfo", bodyReq, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then((resp) => resp.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("companyInfo")
                queryClient.invalidateQueries("listWitHAllCompanies")
                handleClose && handleClose()
            }
        }
      )

    return {companyInfo, errorCompanyInfo, companyInfoIsLoading, companyInfoMutate}
}