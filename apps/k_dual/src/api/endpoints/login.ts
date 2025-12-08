import { makeMutationApi } from "@src/hooks/useApiHook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../axios";
import { QUERY_KEY } from "../_queryKey";

interface LoginPayload {
  login_type: string;
  userid: string;
  password: string;
  UserType: string;
}

const login = (payload: string) =>
  fetch("/kdual/Account/LogOnProcess", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
    // redirect: "manual",
  });
export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      try {
        const params = new URLSearchParams(payload as any).toString();
        const response = await login(params);
        const queryString = Object.fromEntries(new URLSearchParams(response.url.split("?")[1]));
        if (queryString["ErrorMessage"]) {
          throw new Error("로그인에 실패했습니다. 아이디와 비밀번호를 다시 확인해주세요.");
        }
        return response;
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
      try {
        await logout();
      } catch (error) {
        throw error;
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
