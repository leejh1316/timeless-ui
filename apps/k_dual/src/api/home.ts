import { makeQueryApi } from "@src/hooks/useApiHook";
import { axios } from "./axios";
import { QUERY_KEY } from "./_queryKey";

export const home = async () => {
  try {
    const response = await axios.get<string>("/");
    return response.data;
  } catch (error) {
    throw new Error("Kdaul 홈페이지 정보를 불러오는데 실패했습니다.");
  }
};

export const useFetchHome = makeQueryApi(() => home(), {
  queryKey: () => [QUERY_KEY.HOME],
});
