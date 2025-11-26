import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeMutationApi } from "@src/hooks/useApiHook";
import { QUERY_KEY } from "./_queryKey";
import { api } from "./axios";

interface LoginPayload {
  login_type: string;
  userid: string;
  password: string;
  UserType: string;
}

export const login = (payload: string) =>
  fetch("/kdual/Account/LogOnProcess", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
    redirect: "manual",
  });
// export const login = (payload: string) => api.post("/Account/LogOnProcess", payload);
export const logout = () => api.get("/Account/LogOff");

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const params = new URLSearchParams(payload as any).toString();
      const response = await login(params);
      console.log(response);
      return response;
      // try {
      // } catch (error) {
      //   console.log(error);
      //   throw new Error("로그인 실패");
      // }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.HOME] });
    },
  });
};
