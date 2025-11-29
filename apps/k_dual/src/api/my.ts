import { makeQueryApi } from "@src/hooks/useApiHook";
import { api } from "./axios";
import { QUERY_KEY } from "./_queryKey";

const myInfo = async () => {
  try {
    const response = await api.get<string>("Mypage/MyInfo", { params: { nosig: "Y" } });
    console.log("myInfo response:", response);
    return response.data;
  } catch (error) {
    throw new Error("내 정보를 불러오는데 실패했습니다.");
  }
};

export const useFetchMyInfo = makeQueryApi(() => myInfo(), {
  queryKey: () => [QUERY_KEY.MY_INFO],
});
