import { ScrapeSchema } from "@src/utils/scraper";

type Notice = {
  link: string;
  title: string;
  regDate: string;
};
type AcademicSchedule = {
  content: string;
};

interface HomeSchema {
  universityName: string;
  userName: string;
  isLogin: boolean;
  noticeList: Notice[];
  academicSchedule: AcademicSchedule[];
}

export const HOME_SCHEMA: ScrapeSchema = {
  universityName: ".k_header .k_logo_txt",
  userName:
    "#k_wrap_main > div.k_main_container > div.log_area > div > form > fieldset > div > ul > li.log_name > span",
  isLogin: {
    selector:
      "#k_wrap_main > div.k_main_container > div.log_area > div > form > fieldset > div > ul > li.log_name > span",
    transform: (el) => el !== null,
  },
  noticeList: {
    listItem: "#k_wrap_main > div.k_main_container > div.k_mn_bbs2 > ul:nth-child(2) > li",
    data: {
      link: {
        selector: "a",
        attr: "href",
      },
      title: ".mn_bbs_subj",
      regDate: ".mn_bbs_date",
    },
  },
  academicSchedule: {
    selector: "#k_wrap_main > div.k_main_container > div.k_mn_bbs1 > ul.k_mn_bbs_sche",
    transform: (el) => {
      if (!el) return [];
      const items = el.querySelectorAll("li");
      if (items.length === 1 && items[0].textContent?.trim() === "등록된 학사일정이 없습니다.") {
        return [];
      }
      return Array.from(items).map((li) => ({
        content: li.textContent?.trim() || "",
      }));
    },
  },
};

export type { HomeSchema };
export type { Notice, AcademicSchedule };
