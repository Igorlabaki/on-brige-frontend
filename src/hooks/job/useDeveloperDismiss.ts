import { parseCookies } from "nookies";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../service/axios";
import queryClient from "../../service/query";

export default function useDeveloperDismiss(jobId: string, developerId: string){
    const { "auth.token": token } = parseCookies();
    const {
        data:developerDismiss,
        isError: errordeveloperDismiss,
        isLoading:developerDismissIsLoading,
        mutate: developerDismissMutate
      } =  useMutation({
        mutationFn: () => {
          return   api
          .delete(`/job/developerDismiss/${jobId}/${developerId}`, {
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

    return {developerDismiss, errordeveloperDismiss,developerDismissIsLoading,developerDismissMutate}
}

      