import { ScrapeSchema } from "@src/utils/scraper";

// 내 정보 스크래핑 스키마 정의
interface MyInfoSchema {
  profileImg: string;
  role: string;
  name: string;
  organization: string;
  department: string;
  jobInformation: string;
  studentId: string;
  email: string;
  phone: string;
}
export const MY_INFO_SCHEMA: ScrapeSchema = {
  profileImg: {
    selector:
      "#UserDetail > table:nth-child(5) > tbody > tr:nth-child(1) > td:nth-child(1) > div > ul > li:nth-child(1) > img",
    attr: "src",
  },
  role: "#UserDetail > table:nth-child(5) > tbody > tr:nth-child(1) > td:nth-child(3)",
  name: "#UserDetail > table:nth-child(5) > tbody > tr:nth-child(2) > td",
  organization: "#UserDetail > table:nth-child(9) > tbody > tr:nth-child(1) > td:nth-child(2)",
  department: "#UserDetail > table:nth-child(9) > tbody > tr:nth-child(2) > td",
  jobInformation: {
    selector: "#UserDetail > table:nth-child(9) > tbody > tr:nth-child(3) > td",
    transform: (el) => el?.textContent?.trim().replace(/\s+/g, " ") || "",
  },
  studentId: {
    selector: "#user_StudentNo",
    attr: "value",
  },
  email: {
    selector: "#user_Email",
    attr: "value",
  },
  phone: {
    selector: "#user_Mobile",
    attr: "value",
  },
};

// 내 강의 목록 스크래핑 스키마 정의
type Semester = {
  value: string;
  label: string;
  isDefaultSelected: boolean;
};
type Course = {
  yearSemester: string;
  courseName: string;
  lmsId: string;
  department: string;
  credits: string;
  professor: string;
  companyTeacher: string;
};
interface MyCourseListSchema {
  semesterList: Array<Semester>;
  courseList: Array<Course>;
}
export const MY_COURSE_LIST_SCHEMA: ScrapeSchema = {
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
          return part;
        },
      },
      department: "td:nth-child(3)",
      credits: "td:nth-child(4)",
      professor: "td:nth-child(5)",
      companyTeacher: "td:nth-child(6)",
    },
  },
};

export type { MyInfoSchema, MyCourseListSchema, Semester, Course };
