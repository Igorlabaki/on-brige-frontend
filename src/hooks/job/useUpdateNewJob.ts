import { parseCookies } from "nookies";
import { api } from "../../service/axios";
import queryClient from "../../service/query";
import useModalsContext from "../useModalsContext";
import { useMutation } from "@tanstack/react-query";
import { UpdateJobReqBody } from "../../Interfaces";
import { Console } from "console";

export default function useUpdateNewJob({about,area,cityName,companyId,countryName,jobId,level,minimumPercentagem,period,skills}: UpdateJobReqBody){
    const { "auth.token": token } = parseCookies();
    const { handleCloseNewJobModal} = useModalsContext()
    const {
        data: updateJob,
        error: updateJobError,
        isError: isErrorupdateJob,
        isLoading: isupdateJobIsLoading,
        mutate: updateJobMutate
      } = useMutation({
        mutationFn: () => {
          return   api
          .put("/job/update", {
            about,area,cityName,companyId,countryName,jobId,level,minimumPercentagem,period,skills
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
          handleCloseNewJobModal && handleCloseNewJobModal
      }
      })

    return {updateJob, isErrorupdateJob, updateJobError, isupdateJobIsLoading,updateJobMutate}
}