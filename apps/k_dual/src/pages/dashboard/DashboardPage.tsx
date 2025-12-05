import { useFetchHome } from "@src/api/endpoints/home";
import { useFetchLmsLearningDetail, useFetchLmsMain } from "@src/api/endpoints/lms";
import { useFetchMyCourseList, useFetchMyInfo } from "@src/api/endpoints/my";
import { Page } from "@src/components/layout/Page";
import { useAuthStore } from "@src/store/useAuthStore";
import clsx from "clsx";
import { useEffect } from "react";
import GreetingSection from "./components/section/GreetingSection";
import CurrentWeekReport from "./components/section/CurrentWeekReport";
import UserOverview from "./components/section/UserOverview";

const DashboardPage = () => {
  const { data: myInfoData } = useFetchMyInfo();
  const { data: homeData } = useFetchHome();
  const { data: courseData } = useFetchMyCourseList();
  const { data: learningMainData } = useFetchLmsMain(
    { id: courseData?.courseList[0]?.lmsId! },
    courseData?.courseList[0]?.lmsId !== undefined,
  );

  return (
    <>
      <title>Dashboard - K-dual</title>
      <Page.Root className="mt-8">
        <Page.Section className="mb-8">
          <Page.Content>
            <GreetingSection
              userName="이재혁"
              currentWeek={learningMainData?.progressInfo?.currentWeek ?? 0}
            />
          </Page.Content>
        </Page.Section>
        <Page.Section>
          <Page.Content className="grid grid-cols-[7fr_3fr] gap-6">
            <div>
              {learningMainData && (
                <CurrentWeekReport
                  schedule={
                    learningMainData!.weeklySchedule[learningMainData!.progressInfo.currentWeek - 1]
                  }
                />
              )}
            </div>
            <div>
              <UserOverview lmsId={courseData?.courseList[0]?.lmsId ?? -1} />
            </div>
          </Page.Content>
        </Page.Section>
      </Page.Root>
    </>
  );
};

export default DashboardPage;
