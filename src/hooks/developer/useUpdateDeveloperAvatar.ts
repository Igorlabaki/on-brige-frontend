import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { url } from "inspector";
import { useRecoverUserData } from "../auth/recoveryUserData";

export function useUpadateAvatarDeveloper(){
    const { "auth.token": token } = parseCookies();
    const queryClient = useQueryClient();
    const {authUser} = useRecoverUserData()
    const {
        data: devloperAvatar,
        isError: errorDevloperAvatar,
        isLoading: devloperAvatarIsLoading,
        mutate: devloperAvatarMutate
      } = useMutation({
        mutationFn: async (avatarUrl: any) => {
            return api.put(`/developer/updateAvatar`, {
                avatarUrl: avatarUrl,
                developerId: authUser?.id
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
            queryClient.invalidateQueries(["listDevelopers"])
        }
      })

    return { devloperAvatar, errorDevloperAvatar,  devloperAvatarIsLoading,  devloperAvatarMutate}
}
