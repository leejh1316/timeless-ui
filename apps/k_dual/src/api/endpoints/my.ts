import { makeQueryApi } from "@src/hooks/useApiHook";
import { scrape } from "@src/utils/scraper";
import { api } from "../axios";
import { MY_INFO_SCHEMA, MyInfoSchema } from "../schema/my/my-info";
import { QUERY_KEY } from "../_queryKey";
import { parseHtml } from "@src/utils/parseHtml";
import { devLog } from "@src/utils/common";
import { MY_COURSE_LIST_SCHEMA, MyCourseListSchema } from "../schema/my/my-course";

const myInfo = async (): Promise<MyInfoSchema> => {
  try {
    const response = await api.get<string>("Mypage/MyInfo", { params: { nosig: "Y" } });
    const data = parseHtml<MyInfoSchema>(response.data, MY_INFO_SCHEMA);
    devLog("myInfo data:", data);
    return data;
  } catch (error) {
    throw new Error("내 정보를 불러오는데 실패했습니다.");
  }
};
export const useFetchMyInfo = makeQueryApi(() => myInfo(), {
  queryKey: () => [QUERY_KEY.MY_INFO],
});

interface MyCourseListPayload {
  sordertype: string; //ASC or DESC
  sTermNo: string;
}
const myCourseList = async (payload?: MyCourseListPayload): Promise<MyCourseListSchema> => {
  try {
    const response = payload
      ? await api.post<string>("Mypage/MyCoursesLectureList", payload, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
      : await api.get<string>("Mypage/MyCoursesLectureList");

    const data = parseHtml<MyCourseListSchema>(response.data, MY_COURSE_LIST_SCHEMA);
    devLog("myCourseList data:", data);
    return data;
  } catch (error) {
    throw new Error("내 강의 목록을 불러오는데 실패했습니다.");
  }
};

export const useFetchMyCourseList = makeQueryApi(
  (payload?: MyCourseListPayload) => myCourseList(payload),
  {
    queryKey: (payload) =>
      payload ? [QUERY_KEY.MY_COURSE_LIST, payload.sTermNo] : [QUERY_KEY.MY_COURSE_LIST],
  },
);
