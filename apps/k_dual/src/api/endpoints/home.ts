import { makeQueryApi } from "@src/hooks/useApiHook";
import { scrape } from "@src/utils/scraper";
import { api } from "../axios";
import { QUERY_KEY } from "../_queryKey";
import { parseHtml } from "@src/utils/parseHtml";
import { devLog } from "@src/utils/common";
import { HOME_SCHEMA, HomeSchema } from "../schema/home/home";

import homeMockData from "../mock/home/home.json";
import { getMockMode } from "@src/config/mock";

const mockHome = async (): Promise<HomeSchema> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return homeMockData as HomeSchema;
};

// 해당 통신에서 로그인 문자열이 있을땐 login 안된 상태로 간주
export const home = async (): Promise<HomeSchema> => {
  try {
    if (getMockMode()) {
      return await mockHome();
    }
    const response = await api.get<string>("");
    const data = parseHtml<HomeSchema>(response.data, HOME_SCHEMA);
    devLog("home data:", data);
    return data;
  } catch (error) {
    throw new Error("Kdaul 홈페이지 정보를 불러오는데 실패했습니다.");
  }
};

export const useFetchHome = makeQueryApi(() => home(), {
  queryKey: () => [QUERY_KEY.HOME],
});
