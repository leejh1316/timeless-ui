import { Page } from "@src/components/layout/Page";
import CourseInfo from "./components/section/CourseInfo";
import { useFetchLmsMain, useFetchLmsProgress } from "@src/api/endpoints/lms";
import { useFetchMyCourseList } from "@src/api/endpoints/my";
import { useState } from "react";
import { useParams } from "react-router";
import MyCourseWidget from "@src/components/widget/MyCourseWidget";
import { Button, Modal } from "@timeless-ui/ui";
import { Card } from "@src/components/base/Card";
import CourseChange from "./components/section/CourseChange";
import CourseOverviewWidget from "@src/components/widget/CourseOverviewWidget";
import NoticeWidget from "@src/components/widget/NoticeWidget";
import Curriculum from "./components/section/Curriculum";
import { Skeleton } from "@src/components/base/Skeleton";

const LearningLog = () => {
  const params = useParams<{ id: string }>();
  const {
    data: courseData,
    isSuccess: isCourseLoaded,
    isLoading: isCourseLoading,
  } = useFetchMyCourseList();

  const {
    data: progressData,
    isSuccess: isProgressLoaded,
    isLoading: isProgressLoading,
  } = useFetchLmsProgress(
    {
      lmsId: params.id ?? courseData?.courseList[0]?.lmsId!,
    },
    isCourseLoaded,
  );
  const {
    data,
    isError,
    error,
    isLoading: isMainLoading,
  } = useFetchLmsMain(
    {
      id: params.id ?? courseData?.courseList[0]?.lmsId!,
    },
    isCourseLoaded && isProgressLoaded,
  );

  const isLoading = isCourseLoading || isProgressLoading || isMainLoading;

  return (
    <>
      <title>Learning Log - {data?.courseName ?? "K-dual"}</title>
      <Page.Root className="mt-10 space-y-6">
        <Page.Section className="">
          <Page.Content className="grid grid-cols-[7fr_3fr] items-center justify-between gap-x-6">
            <h2 className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-64 rounded-xl" /> : data?.courseName}
            </h2>
            <CourseChange />
          </Page.Content>
        </Page.Section>
        <Page.Section>
          {(isLoading || (isProgressLoaded && isCourseLoaded)) && (
            <Page.Content className="grid grid-cols-[7fr_3fr] gap-x-6">
              <div className="flex min-w-0 flex-col gap-y-6">
                <Curriculum
                  weekSchedules={data?.weeklySchedule}
                  progressStatus={progressData?.progress}
                  isLoading={isLoading}
                />
              </div>
              <div className="flex max-h-full min-w-0 flex-col gap-y-6">
                <CourseInfo lmsData={data} isLoading={isLoading} />
                {isLoading ? (
                  <>
                    <Skeleton className="h-40 w-full rounded-xl" />
                    <Skeleton className="h-40 w-full rounded-xl" />
                  </>
                ) : (
                  <>
                    <NoticeWidget noticeList={data?.noticeList ?? []} viewAllLink="" />
                    <CourseOverviewWidget
                      lmsId={params.id ?? courseData?.courseList[0]?.lmsId ?? -1}
                    />
                  </>
                )}
              </div>
            </Page.Content>
          )}
        </Page.Section>
      </Page.Root>
    </>
  );
};

export default LearningLog;
