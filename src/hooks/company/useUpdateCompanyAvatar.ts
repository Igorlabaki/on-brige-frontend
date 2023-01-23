import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default async function useUpadateAvatarCompany(avatarUrl: string,companyId: string, file: File){
    const queryClient = useQueryClient();
    const { "auth.token": token } = parseCookies();

    const {
        data: companyAvatar,
        isError: errorCompanyAvatar,
        isLoading: companyAvatarIsLoading,
        mutate: companyAvatarMutate
      } = useMutation({
        mutationFn: () => {
            return   api
            .put("/company/updateAvatar", {
                avatarUrl,
                companyId
            }, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => resp.data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["listDevelopers"])
            queryClient.invalidateQueries(["recoveryAccountData"])
        }
      }
      )

    return {companyAvatar, errorCompanyAvatar, companyAvatarIsLoading, companyAvatarMutate}
}
