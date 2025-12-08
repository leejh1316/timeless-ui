import { makeQueryApi } from "@src/hooks/useApiHook";
import { scrape } from "@src/utils/scraper";
import { api } from "../axios";

import { QUERY_KEY } from "../_queryKey";
import { LMS_MAIN_SCHEMA, LmsMain } from "../schema/lms/lms-main";
import { LMS_LEARNING_DETAIL_SCHEMA, LmsLearningDetail } from "../schema/lms/lms-detail";
import { parseHtml } from "@src/utils/parseHtml";
import { LMS_PROGRESS_SCHEMA, LmsProgress } from "../schema/lms/lms-progress";
import { devLog } from "@src/utils/common";
import { keepPreviousData, useMutation, useQueryClient } from "@tanstack/react-query";

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
  lmsId: number | string;
  week: number | string;
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
      placeholderData: keepPreviousData,
    }),
  },
);

// ====================  LMS 학습현황 조회 ====================
export interface LmsProgressPayload {
  lmsId: number | string;
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

// lms 저장
interface LmsSavePayload {
  "courseInningsInfo.InningNo": number | string;
  inDate: string; // yyyy-mm-dd
  trContent: string;
  impression: string;
  fileGroupNo: number | string; // 파일 그룹 번호 input의 value 값
  fileData?: File | null;
  studyInningNo: number | string;
  lmsId: number | string;
  week: number | string;
}
///LMS/LectureRoom/CourseProgressStudentEstView/66534?Week=13
const lmsSave = async (payload: LmsSavePayload) => {
  try {
    const formData = new FormData();
    formData.append("courseInningsInfo.InningNo", payload["courseInningsInfo.InningNo"].toString());
    formData.append("inDate", payload.inDate);
    formData.append("trContent", payload.trContent);
    formData.append("impression", payload.impression);
    formData.append("fileGroupNo", payload.fileGroupNo.toString());
    if (payload.fileData) {
      formData.append("fileGroupNo", payload.fileData);
    }
    formData.append("studyInningNo", payload.studyInningNo.toString());
    await api.post<void>(
      `LMS/LectureRoom/CourseProgressStudentEstView/${payload.lmsId}?Week=${payload.week}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  } catch (error) {
    throw new Error("LMS 학습활동서 저장에 실패했습니다.");
  }
};
export const useLmsSave = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LmsSavePayload) => lmsSave(payload),
    onSuccess: async (_, payload) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.LMS_LEARNING_DETAIL, payload.lmsId, payload.week],
      });
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LMS_MAIN] });
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LMS_PROGRESS] });
    },
  });
};

// ====================  LMS 파일 삭제====================
// Common/FileDeleteNew
// payload: fno=fileId
const lmsFileDelete = async (fileId: number | string) => {
  try {
    await api.post<void>(`Common/FileDeleteNew`, null, {
      params: {
        fno: fileId,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  } catch (error) {
    throw new Error("파일 삭제에 실패했습니다.");
  }
};
export const useLmsFileDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (fileId: number | string) => lmsFileDelete(fileId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LMS_LEARNING_DETAIL] });
    },
  });
};
