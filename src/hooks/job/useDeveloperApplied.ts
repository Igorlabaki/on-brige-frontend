import { parseCookies } from "nookies";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../service/axios";
import queryClient from "../../service/query";

export default function useDeveloperApplied(jobId: string, developerId: string){
    const { "auth.token": token } = parseCookies();
    const {
        data:developerApllied,
        isError: errordeveloperApllied,
        isLoading:developerAplliedIsLoading,
        mutate: developerAppliedMutate
      } =  useMutation({
        mutationFn: () => {
          return   api
          .put("/job/developerApplied", {
            jobId, developerId
          }, {
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

    return {developerApllied, errordeveloperApllied,developerAplliedIsLoading,developerAppliedMutate}
}

      