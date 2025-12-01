import { ScrapeSchema } from "@src/utils/scraper";

interface LmsMain {
  courseInfo?: {
    name: string;
    semester: string;
    credits: string;
    studentCount: string;
  };
  progressInfo?: {
    currentWeek: string;
    totalHours: string;
    completedHours: string;
  };
  noticeList?: {
    title: string;
    date: string;
    link: string;
  }[];
  weeklySchedule?: {
    week: string;
    period: string;
    title: string;
    status: string; // 진행완료, 미진행 등
    isEvaluation: boolean; // 수행평가 여부 (bul_test, bul_result 클래스 확인)
  }[];
}
const LMS_MAIN_SCHEMA: ScrapeSchema = {
  courseInfo: {
    name: ".myclass_name",
    semester: ".myclass_room li:nth-child(1)",
    credits: ".myclass_room li:nth-child(2)",
    studentCount: ".myclass_room li:nth-child(3)",
  },
  progressInfo: {
    currentWeek: ".class_info .layer_th",
    totalHours: ".class_info1 .layer_total span:nth-child(1)",
    completedHours: ".class_info1 .layer_status:nth-child(3) span",
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
export type { LmsMain };

interface LmsLearningDetail {
  trainingInfo: {
    title: string;
    inningList: Array<{
      value: string;
      label: string;
      isSelected: boolean;
    }>;
  };
  periodInfo: {
    period: string;
    trainingHours: string;
  };
  ncsInfo: {
    unit: string;
    element: string;
  };
  status: string;
  activityForm: {
    date: string;
    content: string;
    impression: string;
    feedback: string;
  };
  feedbacks: {
    companyTeacher: string;
    professor: string;
  };
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
  status: ".tbl_sty03:nth-of-type(1) tr:last-child td:nth-child(2)",

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
      transform: (el) => el?.textContent?.trim() || "",
    },
  },

  // 6. 피드백 (기업현장교사, 지도교수)
  feedbacks: {
    companyTeacher: {
      selector: "#step3Div textarea",
      as: "text",
    },
    professor: {
      selector: "#lmsform > table:nth-child(10) > tbody > tr > td > textarea",
      as: "text",
      transform: (el) => el?.textContent?.replace("등록된 내용이 없습니다", ""),
    },
  },

  file: {
    link: {
      selector:
        "#lmsform > table:nth-child(5) > tbody > tr:nth-child(5) > td > div > div > div > div > a:nth-child(1)",
      attr: "href",
    },
    label:
      "#lmsform > table:nth-child(5) > tbody > tr:nth-child(5) > td > div > div > div > div > a:nth-child(1) > span",
  },
};

export { LMS_LEARNING_DETAIL_SCHEMA };
export type { LmsLearningDetail };
