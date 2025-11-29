import { makeQueryApi } from "@src/hooks/useApiHook";
import { scrape } from "@src/utils/scraper";
import { api } from "../axios";
import { MY_COURSE_LIST_SCHEMA, MY_INFO_SCHEMA } from "../schema/my";
import { QUERY_KEY } from "../_queryKey";

const myInfo = async () => {
  try {
    const response = await api.get<string>("Mypage/MyInfo", { params: { nosig: "Y" } });
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, "text/html");
    const data = scrape(doc, MY_INFO_SCHEMA);
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
const myCourseList = async (payload?: MyCourseListPayload) => {
  try {
    const response = payload
      ? await api.post<string>("Mypage/MyCoursesLectureList", payload, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
      : await api.get<string>("Mypage/MyCoursesLectureList");

    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, "text/html");
    const data = scrape(doc, MY_COURSE_LIST_SCHEMA);
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
