import { makeQueryApi } from "@src/hooks/useApiHook";
import { scrape } from "@src/utils/scraper";
import { api } from "../axios";

import { QUERY_KEY } from "../_queryKey";
import { LMS_MAIN_SCHEMA, LmsMain } from "../schema/lms/lms-main";
import { LMS_LEARNING_DETAIL_SCHEMA, LmsLearningDetail } from "../schema/lms/lms-detail";
import { parseHtml } from "@src/utils/parseHtml";
import { LMS_PROGRESS_SCHEMA, LmsProgress } from "../schema/lms/lms-progress";
import { devLog } from "@src/utils/common";

// ====================  LMS 메인 페이지 조회 ====================
export interface MainPayload {
  id: number | string;
}
const main = async (payload: MainPayload): Promise<LmsMain> => {
  try {
    const response = await api.get<string>(`LMS/LectureRoom/Main/${payload.id}`);
    const data = parseHtml<LmsMain>(response.data, LMS_MAIN_SCHEMA);
    devLog("LMS Main Data Fetched:", data);
    return data;
  } catch (error) {
    throw new Error("LMS 메인 정보를 불러오는데 실패했습니다.");
  }
};

export const useFetchLmsMain = makeQueryApi(
  (payload: MainPayload, enable: boolean = true) => main(payload),
  {
    queryKey: (payload) => [QUERY_KEY.LMS_MAIN, payload.id],
    config: (_, enable) => ({
      enabled: enable,
    }),
  },
);

// ==================== LMS 학습활동서 상세 페이지 조회 ====================
export interface LearningDetailPayload {
  lmsId: number;
  week: number;
}
const learningDetail = async (payload: LearningDetailPayload): Promise<LmsLearningDetail> => {
  try {
    const response = await api.get<string>(
      `LMS/LectureRoom/CourseProgressStudentEstView/${payload.lmsId}?Week=${payload.week}`,
    );
    const data = parseHtml<LmsLearningDetail>(response.data, LMS_LEARNING_DETAIL_SCHEMA);
    devLog("LMS Learning Detail Data Fetched:", data);
    return data;
  } catch (error) {
    throw new Error("LMS 상세 정보를 불러오는데 실패했습니다.");
  }
};

export const useFetchLmsLearningDetail = makeQueryApi(
  (payload: LearningDetailPayload, enable: boolean = true) => learningDetail(payload),
  {
    queryKey: (payload) => [QUERY_KEY.LMS_LEARNING_DETAIL, payload.lmsId, payload.week],
    config: (_, enable) => ({
      enabled: enable,
    }),
  },
);

// ====================  LMS 학습현황 조회 ====================
export interface LmsProgressPayload {
  lmsId: number;
}
const getLmsProgress = async (payload: LmsProgressPayload) => {
  try {
    const response = await api.get<string>(
      `LMS/LectureRoom/CourseProgressStudentOX/${payload.lmsId}`,
    );
    const data = parseHtml<LmsProgress>(response.data, LMS_PROGRESS_SCHEMA);
    devLog("LMS Progress Data Fetched:", data);
    return data;
  } catch (error) {
    throw new Error("LMS 학습현황 정보를 불러오는데 실패했습니다.");
  }
};
export const useFetchLmsProgress = makeQueryApi(
  (payload: LmsProgressPayload, enable: boolean = true) => getLmsProgress(payload),
  {
    queryKey: (payload) => [QUERY_KEY.LMS_PROGRESS, payload.lmsId],
    config: (_, enable) => ({
      enabled: enable,
    }),
  },
);
