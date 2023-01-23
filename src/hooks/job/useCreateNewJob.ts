import { parseCookies } from "nookies";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../service/axios";
import { RegisterReqBody } from "../../components/modals/newJobModal";
import queryClient from "../../service/query";
import useModalsContext from "../useModalsContext";

export default function useCreateNewJob({about,area,cityName,companyId,countryName,level,minimumPercentagem,period}: RegisterReqBody){
    const { "auth.token": token } = parseCookies();
    const { handleCloseNewJobModal} = useModalsContext()
    const {
        data: newJob,
        error: newJobError,
        status: newJobStatus,
        isError: isErrorNewJob,
        isLoading: isNewJobIsLoading,
        mutate: createNewJob
      } = useMutation({
        mutationFn: () => {
          return   api
          .post("/job/create", {
            about,area,cityName,companyId,countryName,level,minimumPercentagem,period
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

    return {newJob, isErrorNewJob, newJobError, isNewJobIsLoading,createNewJob, newJobStatus}
}