import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { url } from "inspector";
import { useRecoverUserData } from "../auth/recoveryUserData";

export function useUpadateAvatarCompany(){
    const { "auth.token": token } = parseCookies();
    const queryClient = useQueryClient();
    const {authUser} = useRecoverUserData()
    const {
        data: companyAvatar,
        isError: errorCompanyAvatar,
        isLoading: companyAvatarIsLoading,
        mutate: companyAvatarMutate
      } = useMutation({
        mutationFn: async (avatarUrl: any) => {
            return api.put(`/company/updateAvatar`, {
                avatarUrl: avatarUrl,
                companyId: authUser?.id
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => resp.data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["recoveryAccountData"])
            queryClient.invalidateQueries(["listCompanies"])
        }
      })

    return {companyAvatar, errorCompanyAvatar, companyAvatarIsLoading, companyAvatarMutate}
}
