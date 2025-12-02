import { useFetchHome } from "@src/api/endpoints/home";
import { useFetchLmsLearningDetail, useFetchLmsMain } from "@src/api/endpoints/lms";
import { useFetchMyCourseList, useFetchMyInfo } from "@src/api/endpoints/my";
import { Page } from "@src/components/layout/Page";
import { useAuthStore } from "@src/store/useAuthStore";
import clsx from "clsx";
import { useEffect } from "react";
import GreetingSection from "./components/section/GreetingSection";
import CurrentWeekReport from "./components/section/CurrentWeekReport";

const DashboardPage = () => {
  const { data: myInfoData, isLoading } = useFetchMyInfo();
  const { data: homeData } = useFetchHome();
  const { data: courseData, isSuccess } = useFetchMyCourseList();
  const { data: learningDetailData } = useFetchLmsMain(
    { id: courseData?.courseList[0]?.lmsId! },
    courseData?.courseList[0]?.lmsId !== undefined,
  );
  return (
    <>
      <title>Dashboard - K-dual</title>
      <Page.Root className="mt-8">
        <Page.Section className="mb-8">
          <Page.Content>
            <GreetingSection userName="이재혁" currentWeek={14} />
          </Page.Content>
        </Page.Section>
        <Page.Section>
          <Page.Content className="grid grid-cols-[60%_40%]">
            <CurrentWeekReport />
          </Page.Content>
        </Page.Section>
      </Page.Root>
    </>
  );
};

export default DashboardPage;
