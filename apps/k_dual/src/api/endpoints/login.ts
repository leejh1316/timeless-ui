import { makeMutationApi } from "@src/hooks/useApiHook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../axios";
import { QUERY_KEY } from "../_queryKey";
import { getMockMode, mockClear, setMockMode } from "@src/config/mock";
import { AxiosRequestConfig } from "axios";

interface LoginPayload {
  login_type: string;
  userid: string;
  password: string;
  UserType: string;
}

const login = (payload: string) =>
  api.post("/Account/LogOnProcess", payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      try {
        const params = new URLSearchParams(payload as any).toString();
        const response = await login(params);
        const request: XMLHttpRequest = response.request;
        const { responseURL } = request;
        if (responseURL.includes("ErrorMessage")) {
          throw new Error("로그인에 실패했습니다. 아이디와 비밀번호를 다시 확인해주세요.");
        }
        return true;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.HOME] });
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_INFO] });
    },
  });
};

const logout = () => api.get("/Account/LogOff");
export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await logout();
      if (getMockMode()) {
        setMockMode(false);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.HOME] });
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_INFO] });
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_COURSE_LIST] });
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LMS_MAIN] });
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LMS_PROGRESS] });
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LMS_LEARNING_DETAIL] });
    },
  });
};
