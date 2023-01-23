import jwtDecode from "jwt-decode";
import { parseCookies } from "nookies";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../service/axios";

export interface ISignInRequestBody {
    email: string | undefined;
    password: string | undefined;
}

export function useRecoverUserData(){
    const { "auth.token": token } = parseCookies();

    const {
        data: authUser,
        error: errorAuthUser,
        isError: isErrorAuthUser,
        isLoading: authUserDataIsLoading,
    } =  useQuery({
      queryKey: ["recoveryAccountData",token],
      queryFn: () =>  {
        return api
        .get("/auth/recoveryAccountData", {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then((resp) => {
          return resp.data;
        })
      }
    })
      
    return {authUser, isErrorAuthUser,authUserDataIsLoading, errorAuthUser,token}
}

