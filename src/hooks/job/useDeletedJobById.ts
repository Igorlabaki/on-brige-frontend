import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteJob(jobId: string){
    const queryClient = useQueryClient();
    const { "auth.token": token } = parseCookies();
   
    const {
        data: jobDeleted,
        isError: errorjobDeleted,
        isLoading: jobDeletedIsLoading,
        mutate: jobDeletedMutate
      } = useMutation({
        mutationFn: () => {
            return   api
            .delete(`/job/delete/${jobId}`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => resp.data)
        },
        onSuccess: () => {
          queryClient.invalidateQueries(["listJobs"])
          queryClient.invalidateQueries(["recoveryAccountData"]);
        } 
      })

    return {jobDeleted, errorjobDeleted, jobDeletedIsLoading, jobDeletedMutate}
}