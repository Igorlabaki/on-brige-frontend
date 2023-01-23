import { setCookie } from "nookies";
import { api } from "../../service/axios";
import queryClient from "../../service/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import useModalsContext from "../useModalsContext";

export interface ISignInRequestBody {
    name: string | undefined;
    email: string | undefined;
    area?: string | undefined;
    level?: string | undefined;
    password: string | undefined;
    userType?: string | undefined;
}

export function useSignUp({ email,name, password,area,level,userType}: ISignInRequestBody){
    const {handleCloseAuthModal} = useModalsContext()
    
    const {
        data: authToken,
        error: errorAuthToken,
        isError: isErrorAuthToken,
        isLoading: authUserTokenIsLoading,
        mutate: signUp
    } =  useMutation({
        mutationFn: async () => {
          return api.post( `/auth/${userType === "developer" ? 'createNewDeveloperAccount': 'createNewCompanyAccount'}`, {
            email,
            name,
            password,
            level, 
            area,
            userType,
          }).then((resp) => resp.data);
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

    return {authToken, errorAuthToken,isErrorAuthToken, authUserTokenIsLoading,signUp}
}
