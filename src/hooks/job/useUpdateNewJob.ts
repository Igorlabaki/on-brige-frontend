import { parseCookies } from "nookies";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../service/axios";
import { RegisterReqBody } from "../../components/modals/newJobModal";
import queryClient from "../../service/query";
import useModalsContext from "../useModalsContext";
import { IUpdatejob } from "../../Interfaces";

export default function useUpdateNewJob(updateJobReqBody: IUpdatejob){
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
          .post("/job/update", {
            updateJobReqBody
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