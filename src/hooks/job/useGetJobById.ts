import { parseCookies } from "nookies";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../service/axios";

export default function useGetjobById(jobId: string | string[] | undefined){
    const { "auth.token": token } = parseCookies();
    const {
        data:jobById,
        isError: errorjobById,
        isLoading:jobByIdIsLoading,
      } = useQuery({
        queryKey: ["jobById",jobId],
        queryFn: () => {
          return   api
          .get(`/job/getById/${jobId}`, {
              headers: {
              Authorization: `Bearer ${token}`,
              },
          })
          .then((resp) => resp.data.job)
        }
      }
      )

    return {jobById, errorjobById,jobByIdIsLoading}
}

      