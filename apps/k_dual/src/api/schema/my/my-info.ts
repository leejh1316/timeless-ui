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

export type { MyInfoSchema };
