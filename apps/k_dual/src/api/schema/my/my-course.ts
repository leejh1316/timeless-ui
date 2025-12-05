import { ScrapeSchema } from "@src/utils/scraper";

// 내 강의 목록 스크래핑 스키마 정의
type Semester = {
  value: string;
  label: string;
  isDefaultSelected: boolean;
};
type Course = {
  yearSemester: string;
  courseName: string;
  lmsId: number;
  department: string;
  credits: string;
  professor: string;
  companyTeacher: string;
};
interface MyCourseListSchema {
  semesterList: Array<Semester>;
  courseList: Array<Course>;
}
const MY_COURSE_LIST_SCHEMA: ScrapeSchema = {
  semesterList: {
    // 1. 반복되는 option 태그 선택
    listItem: "#sTermNo option",

    data: {
      value: {
        selector: ":scope",
        attr: "value",
      },
      label: ":scope",
      isDefaultSelected: {
        selector: ":scope",
        transform: (el) => el?.hasAttribute("selected") || false,
      },
    },
  },
  courseList: {
    listItem: "tbody > tr:nth-child(n+2)",
    data: {
      yearSemester: "td:nth-child(1)",
      courseName: "td:nth-child(2) a",
      lmsId: {
        selector: "td:nth-child(2) a",
        transform: (el) => {
          const part = el?.getAttribute("href")?.split("/").pop() || "";
          return Number(part);
        },
      },
      department: "td:nth-child(3)",
      credits: "td:nth-child(4)",
      professor: "td:nth-child(5)",
      companyTeacher: "td:nth-child(6)",
    },
  },
};

export { MY_COURSE_LIST_SCHEMA };
export type { MyCourseListSchema, Course, Semester };
