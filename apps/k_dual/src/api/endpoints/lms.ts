import { makeQueryApi } from "@src/hooks/useApiHook";
import { scrape } from "@src/utils/scraper";
import { api } from "../axios";
import { LMS_MAIN_SCHEMA, LmsMain } from "../schema/lms";
import { QUERY_KEY } from "../_queryKey";

interface MainPayload {
  id: string;
}
const main = async (payload: MainPayload): Promise<LmsMain> => {
  try {
    const response = await api.get<string>(`LMS/LectureRoom/Main/${payload.id}`);
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, "text/html");
    const data = scrape(doc, LMS_MAIN_SCHEMA) as LmsMain;
    console.log("LMS Main Data Fetched:", data);
    return data;
  } catch (error) {
    throw new Error("LMS 메인 정보를 불러오는데 실패했습니다.");
  }
};

export const useFetchLmsMain = makeQueryApi((payload: MainPayload) => main(payload), {
  queryKey: (payload) => [QUERY_KEY.LMS_MAIN, payload.id],
});
