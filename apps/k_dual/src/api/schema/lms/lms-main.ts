import { ScrapeSchema } from "@src/utils/scraper";
// LMS 메인 페이지
type CourseInfo = {
  name: string;
  semester: string;
  credits: string;
  studentCount: string;
};
type ProgressInfo = {
  currentWeek: number;
  totalHours: number;
  completedHours: number;
};
type Notice = {
  title: string;
  date: string;
  link: string;
};
type WeeklySchedule = {
  week: string;
  period: string;
  title: string;
  status: string; // 진행완료, 미진행 등
  isEvaluation: boolean; // 중간고사 / 기말고사 여부
};
interface LmsMain {
  courseInfo: CourseInfo;
  progressInfo: ProgressInfo;
  noticeList: Notice[];
  weeklySchedule: WeeklySchedule[];
}
const LMS_MAIN_SCHEMA: ScrapeSchema = {
  courseInfo: {
    name: ".myclass_name",
    semester: ".myclass_room li:nth-child(1)",
    credits: ".myclass_room li:nth-child(2)",
    studentCount: ".myclass_room li:nth-child(3)",
  },
  progressInfo: {
    currentWeek: {
      selector: ".class_info .layer_th",
      transform: (el) => Number(el?.textContent),
    },
    totalHours: {
      selector: ".class_info1 .layer_total span:nth-child(1)",
      transform: (el) => Number(el?.textContent),
    },
    completedHours: {
      selector: ".class_info1 .layer_status:nth-child(3) span",
      transform: (el) => Number(el?.textContent),
    },
  },
  noticeList: {
    listItem: ".bbs_list li",
    data: {
      title: ".bbs_subj",
      date: ".bbs_date",
      link: {
        selector: "a",
        attr: "href",
      },
    },
  },
  weeklySchedule: {
    listItem: ".tbl_sty02 tbody tr:nth-child(n+2)", // 첫 번째 tr(헤더) 제외
    data: {
      week: "td:nth-child(1) span",
      period: {
        selector: "td:nth-child(2) .period",
        transform: (el) => el?.innerHTML.replace("<br>", " ~ ") || "",
      },
      title: "td:nth-child(3) strong",
      status: {
        selector: "td:nth-child(7) img",
        attr: "alt",
      },
      isEvaluation: {
        selector: "td:nth-child(1) div",
        transform: (el) => el?.classList.contains("case_btn") || false,
      },
    },
  },
};

export { LMS_MAIN_SCHEMA };
export type { LmsMain, WeeklySchedule, Notice, CourseInfo, ProgressInfo };
