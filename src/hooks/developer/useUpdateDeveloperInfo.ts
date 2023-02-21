import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useModalsContext from "../useModalsContext";

interface bodyReqUpdateCompanyInfo{
    developerId: string | undefined , name: string | undefined,about: string | undefined,email: string | undefined,cityName: string | undefined,countryName: string | undefined, level :string | undefined, area:string | undefined
}

interface UseUpadateCompanyInfoProps{
    bodyReq:bodyReqUpdateCompanyInfo,
    handleClose?: () =>  void;
}

export default function useUpadateDeveloperInfo({bodyReq, handleClose}: UseUpadateCompanyInfoProps){
    const queryClient = useQueryClient();
    const { "auth.token": token } = parseCookies();

    const {
        data: developerInfo,
        isError: errorDeveloperInfo,
        error,
        isSuccess,
        isLoading: developerInfoIsLoading,
        mutate: developerInfoMutate
      } = useMutation({
        mutationFn: () => {
            return   api
            .put("/developer/updateInfo", bodyReq, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => resp.data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["recoveryAccountData"])
            queryClient.invalidateQueries(["listDevelopers"])
            handleClose && handleClose()
        }
      }
      )

    return {developerInfo, errorDeveloperInfo, developerInfoIsLoading, developerInfoMutate,error,isSuccess}
}
