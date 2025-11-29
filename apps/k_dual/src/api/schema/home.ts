import { ScrapeSchema } from "@src/utils/scraper";

interface HomeSchema {
  universityName: string;
  userName: string;
  isLogin: boolean;
  noticeList: {
    link: string;
    title: string;
    regDate: string;
  }[];
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
};

export type { HomeSchema };
