import { Outlet } from "react-router";

function App() {
  // const { data } = useFetchHome();
  // useEffect(() => {
  //   if (!data) return;
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(data, "text/html");
  //   const schoolSchema: ScrapeSchema = {
  //     // [공지사항 추출]
  //     notices: {
  //       // 제목줄(.k_mn_bbs_tit)이 아닌 <ul> 안의 <li>만 선택
  //       listItem: ".k_mn_bbs2 ul:not(.k_mn_bbs_tit) li",
  //       data: {
  //         title: ".mn_bbs_subj", // 제목
  //         date: ".mn_bbs_date", // 날짜
  //         link: { selector: "a", attr: "href" }, // 링크

  //         // (선택사항) 링크에서 ID만 따로 뽑고 싶다면 transform 활용
  //         id: {
  //           selector: "a",
  //           attr: "href",
  //           transform: (el) => {
  //             const href = el?.getAttribute("href") || "";
  //             // 예: /HelpDesk/Detail/1345 -> 1345 추출
  //             return href.split("/").pop() || "";
  //           },
  //         },
  //       },
  //     },

  //     // [학사일정 추출]
  //     schedules: {
  //       listItem: ".k_mn_bbs_sche li",
  //       data: {
  //         // 내부에 별도 태그 없이 텍스트만 있는 경우가 있어 :scope(자기자신) 사용
  //         content: {
  //           selector: ":scope",
  //           transform: (el) => el?.textContent?.trim() || "",
  //         },
  //       },
  //     },
  //   };
  //   console.log(doc);
  //   console.log(scrape(doc, schoolSchema));
  // }, [data]);
  return (
    <div className="min-h-dvh w-full bg-gray-50">
      <Outlet />
    </div>
  );
}

export default App;
