import { setCookie } from "nookies";
import { api } from "../../service/axios";
import queryClient from "../../service/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import useModalsContext from "../useModalsContext";

export interface ISignInRequestBody {
    email: string | undefined;
    password: string | undefined;
    userType: "developer" | "company" | undefined
}

export function useSignIn({ email, password,userType}: ISignInRequestBody){
    const {handleCloseAuthModal} = useModalsContext()
    const {
        data: authToken,
        error: errorAuthToken,
        isError: isErrorAuthToken,
        isLoading: authUserTokenIsLoading,
        mutate: signIn
    } =  useMutation({
        mutationFn:  () => {
          return api.post("/auth/authenticateAccount", {
                email,
                password,
                userType
            }).then(
             (resp) => resp.data
            )
        },
        onSuccess: (result) => {
            setCookie(undefined, "auth.token", result.token, {
                maxAge: 60 * 60 * 1, // 1 hour
            });
            queryClient.setQueryData(['session'], result)
            handleCloseAuthModal && handleCloseAuthModal() 
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return {authToken, errorAuthToken,isErrorAuthToken, authUserTokenIsLoading,signIn}
}
