import { useFetchHome } from "@src/api/endpoints/home";
import { useFetchLmsMain } from "@src/api/endpoints/lms";
import { useFetchMyCourseList, useFetchMyInfo } from "@src/api/endpoints/my";
import { Page } from "@src/components/layout/Page";
import MyCourseWidget from "@src/components/widget/MyCourseWidget";
import NoticeWidget from "@src/components/widget/NoticeWidget";
import DashboardSkeleton from "./components/loading/DashboardSkeleton";
import CurrentWeekReport from "./components/section/CurrentWeekReport";
import GreetingSection from "./components/section/GreetingSection";
import CourseOverviewWidget from "../../components/widget/CourseOverviewWidget";

const DashboardPage = () => {
  const {
    data: myInfoData,
    isSuccess: isMyInfoLoaded,
    isLoading: isMyInfoLoading,
  } = useFetchMyInfo();
  const { isSuccess: isHomeLoaded, data: homeData, isLoading: isHomeLoading } = useFetchHome();
  const {
    data: courseData,
    isSuccess: isCourseLoaded,
    isLoading: isCourseLoading,
  } = useFetchMyCourseList();
  const {
    data: learningMainData,
    isSuccess: isLearningMainLoaded,
    isLoading: isLearningMainLoading,
  } = useFetchLmsMain(
    { id: courseData?.courseList[0]?.lmsId! },
    courseData?.courseList[0]?.lmsId !== undefined,
  );

  const isLoading = isMyInfoLoading || isHomeLoading || isCourseLoading || isLearningMainLoading;
  const isLoaded = isMyInfoLoaded && isHomeLoaded && isCourseLoaded && isLearningMainLoaded;
  return (
    <>
      <title>Dashboard - K-dual</title>
      {isLoading && <DashboardSkeleton />}
      {isLoaded && (
        <Page.Root className="mt-6 md:mt-8">
          <Page.Section className="mb-6 md:mb-8">
            <Page.Content>
              <GreetingSection
                userName={myInfoData?.name ?? "User"}
                currentWeek={learningMainData?.progressInfo?.currentWeek ?? 0}
              />
            </Page.Content>
          </Page.Section>
          <Page.Section>
            <Page.Content className="grid gap-4 md:grid-cols-[6fr_4fr] md:gap-6 lg:grid-cols-[7fr_3fr]">
              <div className="flex flex-col gap-4 md:gap-6">
                <CurrentWeekReport
                  schedule={
                    learningMainData!.weeklySchedule[learningMainData!.progressInfo.currentWeek - 1]
                  }
                  courseId={courseData?.courseList[0]?.lmsId}
                />
                <MyCourseWidget className="min-h-[330px]" defaultCourseData={courseData} />
                <NoticeWidget noticeList={homeData?.noticeList ?? []} viewAllLink="/notices" />
              </div>
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="sticky top-6 h-fit">
                  <CourseOverviewWidget lmsId={courseData?.courseList[0]?.lmsId ?? -1} />
                </div>
              </div>
            </Page.Content>
          </Page.Section>
        </Page.Root>
      )}
    </>
  );
};

export default DashboardPage;
