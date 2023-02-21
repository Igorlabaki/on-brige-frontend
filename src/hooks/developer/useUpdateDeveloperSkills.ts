import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoverUserData } from "../auth/recoveryUserData";


export function useUpadateSkillsDeveloper(){
    const { "auth.token": token } = parseCookies();
    const queryClient = useQueryClient();
    const {authUser} = useRecoverUserData()
    const {
        data: devloperSkills,
        isError: errorDevloperSkills,
        isLoading: devloperSkillsIsLoading,
        mutate: devloperSkillsMutate
      } = useMutation({
        mutationFn: async (listSkills: any) => {
            return api.put(`/developer/updateSkills`, {
                listSkills: listSkills,
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

    return { devloperSkills, errorDevloperSkills,  devloperSkillsIsLoading,  devloperSkillsMutate}
}
