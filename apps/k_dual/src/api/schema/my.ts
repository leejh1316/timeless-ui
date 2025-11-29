import { ScrapeSchema } from "@src/utils/scraper";

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
