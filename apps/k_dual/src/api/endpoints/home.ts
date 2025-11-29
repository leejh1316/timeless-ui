import { makeQueryApi } from "@src/hooks/useApiHook";
import { scrape } from "@src/utils/scraper";
import { api } from "../axios";
import { HOME_SCHEMA, HomeSchema } from "../schema/home";
import { QUERY_KEY } from "../_queryKey";

// 해당 통신에서 로그인 문자열이 있을땐 login 안된 상태로 간주
export const home = async (): Promise<HomeSchema> => {
  try {
    const response = await api.get<string>("");
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, "text/html");
    const data = scrape(doc, HOME_SCHEMA) as unknown as HomeSchema;
    console.log("home data:", data);
    return data;
  } catch (error) {
    throw new Error("Kdaul 홈페이지 정보를 불러오는데 실패했습니다.");
  }
};

export const useFetchHome = makeQueryApi(() => home(), {
  queryKey: () => [QUERY_KEY.HOME],
});
