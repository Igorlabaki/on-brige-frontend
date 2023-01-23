import { api } from "../../service/axios";
import { useQuery } from "@tanstack/react-query";


export default function useGetListJobs(){
    const {
        data: listJobs,
        isError: errorListJobs,
        isLoading: listJobsIsLoading, 
      } = useQuery({
        queryKey: ["listJobs"],
        queryFn: async () => {
          return api.get(`/job/list`).then((resp) => resp.data)
        }
      }
    );

    return {listJobs, errorListJobs, listJobsIsLoading}
}
        