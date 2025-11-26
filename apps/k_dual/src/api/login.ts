import { useQueryClient } from "@tanstack/react-query";
import { axios } from "./axios";
import { makeMutationApi } from "@src/hooks/useApiHook";
import { QUERY_KEY } from "./_queryKey";

interface LoginPayload {
  login_type: string;
  userid: string;
  password: string;
  UserType: string;
}

export const login = (payload: LoginPayload) => axios.post("/Account/LogOnProcess", payload);
export const logout = () => axios.get("/Account/LogOff");

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return makeMutationApi((payload: LoginPayload) => login(payload), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.HOME] });
    },
  });
};
