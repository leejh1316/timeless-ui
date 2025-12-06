import { useFetchHome } from "@src/api/endpoints/home";
import { useFetchLmsMain } from "@src/api/endpoints/lms";
import { useFetchMyCourseList, useFetchMyInfo } from "@src/api/endpoints/my";
import { Page } from "@src/components/layout/Page";
import NoticeWidget from "@src/components/widget/NoticeWidget";
import CurrentWeekReport from "./components/section/CurrentWeekReport";
import GreetingSection from "./components/section/GreetingSection";
import UserOverview from "./components/section/UserOverview";
import MyCourse from "./components/section/MyCourse";

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
              userName={myInfoData?.name ?? "User"}
              currentWeek={learningMainData?.progressInfo?.currentWeek ?? 0}
            />
          </Page.Content>
        </Page.Section>
        <Page.Section>
          <Page.Content className="grid gap-6 md:grid-cols-[6fr_4fr] lg:grid-cols-[7fr_3fr]">
            <div className="flex flex-col gap-6">
              {learningMainData && (
                <>
                  <CurrentWeekReport
                    schedule={
                      learningMainData!.weeklySchedule[
                        learningMainData!.progressInfo.currentWeek - 1
                      ]
                    }
                  />
                  <MyCourse defaultCourseData={courseData} />
                  <NoticeWidget noticeList={homeData?.noticeList ?? []} viewAllLink="/notices" />
                </>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <div className="sticky top-6 h-fit">
                <UserOverview lmsId={courseData?.courseList[0]?.lmsId ?? -1} />
              </div>
            </div>
          </Page.Content>
        </Page.Section>
      </Page.Root>
    </>
  );
};

export default DashboardPage;
