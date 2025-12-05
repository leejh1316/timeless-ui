import { ScrapeSchema } from "../../../utils/scraper";
// LMS 학습현황 페이지
type ProgressStatusCode = "NOT_STARTED" | "PARTIAL" | "COMPLETED";
type WeekProgress = {
  week: string;
  type: "normal" | "test" | "check";
};
type StudentInfo = {
  name: string;
  email: string;
};
type ProgressStatus = {
  status: ProgressStatusCode;
  week: number;
  courseId: number;
};
interface LmsProgress {
  weeks: WeekProgress[];
  student: StudentInfo;
  progress: ProgressStatus[];
}

const LMS_PROGRESS_SCHEMA: ScrapeSchema = {
  weeks: {
    listItem: "tr.week.st1 th.week",
    data: {
      week: {
        selector: ".case_btn span",
        as: "text",
        trim: true,
      },
      type: {
        selector: ".case_btn span",
        transform: (el) => {
          if (!el) return "normal";
          if (el.classList.contains("bul_test")) return "test";
          if (el.classList.contains("bul_check")) return "check";
          return "normal";
        },
      },
    },
  },
  student: {
    selector: "tr:nth-of-type(3) td.hangulName",
    transform: (el) => {
      const text = el?.textContent?.trim() || "";
      // "이재혁(leejh131611@naver.com)" -> { name: "이재혁", email: "leejh131611@naver.com" }
      const match = text.match(/^([^(]+)\(([^)]+)\)$/);
      if (match) {
        return {
          name: match[1].trim(),
          email: match[2].trim(),
        };
      }
      return { name: text, email: "" };
    },
  },
  progress: {
    listItem: "tr:nth-of-type(3) td.bdr",
    data: {
      status: {
        selector: ":scope",
        as: "text",
        trim: true,
        transform: (el) => {
          const text = el?.textContent?.trim() || "";
          switch (text) {
            case "Ⅹ":
              return "NOT_STARTED";
            case "△":
              return "PARTIAL";
            case "○":
              return "COMPLETED";
            default:
              return "NOT_STARTED";
          }
        },
      },
      week: {
        selector: ":scope",
        attr: "onclick",
        transform: (el) => {
          const onclick = el?.getAttribute("onclick") || "";
          // "javascript:goStudentEstView(66534,1);" -> 1
          const match = onclick.match(/goStudentEstView\(\d+,(\d+)\)/);
          return match ? parseInt(match[1], 10) : 0;
        },
      },
      courseId: {
        selector: ":scope",
        attr: "onclick",
        transform: (el) => {
          const onclick = el?.getAttribute("onclick") || "";
          // "javascript:goStudentEstView(66534,1);" -> 66534
          const match = onclick.match(/goStudentEstView\((\d+),\d+\)/);
          return match ? parseInt(match[1], 10) : 0;
        },
      },
    },
  },
};

export { LMS_PROGRESS_SCHEMA };
export type { LmsProgress, WeekProgress, StudentInfo, ProgressStatus };
