import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useModalsContext from "../useModalsContext";

interface bodyReqUpdateCompanyInfo{
    companyId: string | undefined , name: string | undefined,about: string | undefined,email: string | undefined,cityName: string | undefined,countryName: string | undefined
}

interface UseUpadateCompanyInfoProps{
    bodyReq:bodyReqUpdateCompanyInfo,
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
      } = useMutation({
        mutationFn: () => {
            return   api
            .put("/company/updateInfo", bodyReq, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => resp.data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["recoveryAccountData"])
            queryClient.invalidateQueries(["listJobs"])
            handleClose && handleClose()
        }
      }
      )

    return {companyInfo, errorCompanyInfo, companyInfoIsLoading, companyInfoMutate}
}
