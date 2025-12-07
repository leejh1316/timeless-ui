import { ScrapeSchema } from "@src/utils/scraper";
type ApprovalStatus = "APPROVED" | "PENDING";
// LMS 학습활동서 상세 페이지
type Inning = {
  value: string;
  label: string;
  isSelected: boolean;
};
type TrainingInfo = {
  title: string;
  inningList: Inning[];
};
type PeriodInfo = {
  period: string;
  trainingHours: string;
};
type NcsInfo = {
  unit: string;
  element: string;
};
type File = {
  link: string;
  label: string;
  fileId: string;
};
type ActivityForm = {
  date: string;
  content: string;
  impression: string;
  feedback: string;
};
type Feedbacks = {
  companyTeacher: string;
  professor: string;
};
interface LmsLearningDetail {
  trainingInfo: TrainingInfo;
  periodInfo: PeriodInfo;
  ncsInfo: NcsInfo;
  status: ApprovalStatus;
  file: File;
  fileGroupNo: string;
  activityForm: ActivityForm;
  feedbacks: Feedbacks;
  studyInningNo: string;
}
const LMS_LEARNING_DETAIL_SCHEMA: ScrapeSchema = {
  // 1. 교육훈련내용 및 차수 정보
  trainingInfo: {
    title: ".tbl_sty03:nth-of-type(1) tr:nth-child(1) td:nth-child(2) span",
    inningList: {
      listItem: "#ddlInningList option",
      data: {
        value: {
          selector: ":scope",
          attr: "value",
        },
        label: ":scope",
        isSelected: {
          selector: ":scope",
          transform: (el) => el?.hasAttribute("selected") || false,
        },
      },
    },
  },

  // 2. 기간 및 훈련시간
  periodInfo: {
    period: {
      selector: ".tbl_sty03:nth-of-type(1) tr:nth-child(2) td:nth-child(2)",
      transform: (el) => el?.textContent?.trim().replace(/\s+/g, " ") || "",
    },
    trainingHours: {
      selector: ".tbl_sty03:nth-of-type(1) tr:nth-child(2) td:nth-child(4)",
      transform: (el) => el?.childNodes[0]?.textContent?.trim() || "",
    },
  },

  // 3. NCS 정보 (존재할 경우)
  ncsInfo: {
    unit: ".tbl_sty03:nth-of-type(1) tr:nth-child(3) td:nth-child(2)",
    element: ".tbl_sty03:nth-of-type(1) tr:nth-child(3) td:nth-child(4)",
  },

  // 4. 상태
  status: {
    selector: ".tbl_sty03:nth-of-type(1) tr:last-child td:nth-child(2)",
    transform: (el) => {
      const text = el?.textContent?.trim() || "";
      if (text === "승인") return "APPROVED";
      return "PENDING";
    },
  },

  // 5. 수강생 학습활동서
  activityForm: {
    date: {
      selector: "#inDate",
      attr: "value",
    },
    content: {
      selector: "#trContent",
      as: "text",
    },
    impression: {
      selector: "#impression",
      as: "text",
    },
    feedback: {
      selector: ".tbl_sty03:nth-of-type(2) tr:nth-child(4) td",
      transform: (el) => {
        return el?.innerHTML.replace(/<br\s*\/?>/gi, "\n").trim() || "";
      },
    },
  },

  // 6. 피드백 (기업현장교사, 지도교수)
  feedbacks: {
    companyTeacher: {
      selector: "#step3Div textarea",
      as: "text",
      transform: (el) => el?.textContent?.replace("등록된 내용이 없습니다", ""),
    },
    professor: {
      selector: "#lmsform > table:nth-child(10) > tbody > tr > td > textarea",
      as: "text",
      transform: (el) => el?.textContent?.replace("등록된 내용이 없습니다", ""),
    },
  },
  fileGroupNo: {
    selector: "#lmsform > table:nth-child(5) > tbody > tr:nth-child(5) > td > div > div > input",
    attr: "value",
  },
  file: {
    link: {
      selector:
        "#lmsform > table:nth-child(5) > tbody > tr:nth-child(5) > td > div > div > div > div > a:nth-child(1)",
      attr: "href",
    },
    label:
      "#lmsform > table:nth-child(5) > tbody > tr:nth-child(5) > td > div > div > div > div > a:nth-child(1) > span",
    fileId: {
      selector:
        "#lmsform > table:nth-child(5) > tbody > tr:nth-child(5) > td > div > div > div > div > a:nth-child(1)",
      transform: (el) => {
        const href = el?.getAttribute("href") || "";
        return href.split("/").pop() || "";
      },
    },
  },
  studyInningNo: {
    selector: "#studyInningNo",
    attr: "value",
  },
};

export { LMS_LEARNING_DETAIL_SCHEMA };
export type {
  LmsLearningDetail,
  Inning,
  TrainingInfo,
  PeriodInfo,
  NcsInfo,
  ActivityForm,
  Feedbacks,
  File,
  ApprovalStatus,
};
