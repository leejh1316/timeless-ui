import { makeQueryApi } from "@src/hooks/useApiHook";
import { scrape } from "@src/utils/scraper";
import { api } from "../axios";
import {
  LMS_LEARNING_DETAIL_SCHEMA,
  LMS_MAIN_SCHEMA,
  LmsLearningDetail,
  LmsMain,
} from "../schema/lms";
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

export const useFetchLmsMain = makeQueryApi((payload: MainPayload, enable) => main(payload), {
  queryKey: (payload) => [QUERY_KEY.LMS_MAIN, payload.id],
  config: (_, enable) => ({
    enabled: enable,
  }),
});

interface LearningDetailPayload {
  lmsId: number;
  week: number;
}
const learningDetail = async (payload: LearningDetailPayload): Promise<LmsLearningDetail> => {
  try {
    const response = await api.get<string>(
      `LMS/LectureRoom/CourseProgressStudentEstView/${payload.lmsId}?Week=${payload.week}`,
    );
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, "text/html");
    const data = scrape(doc, LMS_LEARNING_DETAIL_SCHEMA) as unknown as LmsLearningDetail;
    console.log("LMS Learning Detail Data Fetched:", data);
    return data;
  } catch (error) {
    throw new Error("LMS 상세 정보를 불러오는데 실패했습니다.");
  }
};

export const useFetchLmsLearningDetail = makeQueryApi(
  (payload: LearningDetailPayload, enable?: boolean) => learningDetail(payload),
  {
    queryKey: (payload) => [QUERY_KEY.LMS_LEARNING_DETAIL, payload.lmsId, payload.week],
    config: (_, enable) => ({
      enabled: enable,
    }),
  },
);
