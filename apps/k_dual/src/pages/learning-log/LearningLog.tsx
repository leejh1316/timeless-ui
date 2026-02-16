import { Page } from "@src/components/layout/Page";
import CourseInfo from "./components/section/CourseInfo";
import { useFetchLmsMain, useFetchLmsProgress } from "@src/api/endpoints/lms";
import { useFetchMyCourseList } from "@src/api/endpoints/my";
import { useState } from "react";
import { useParams } from "react-router";
import MyCourseWidget from "@src/components/widget/MyCourseWidget";
import { Button, Modal } from "@timeless-ui/react";
import { Card } from "@src/components/base/Card";
import CourseChange from "./components/section/CourseChange";
import CourseOverviewWidget from "@src/components/widget/CourseOverviewWidget";
import NoticeWidget from "@src/components/widget/NoticeWidget";
import Curriculum from "./components/section/Curriculum";
import { Skeleton } from "@src/components/base/Skeleton";

const LearningLog = () => {
  const params = useParams<{ id: string }>();

  const { data: courseData, isSuccess: isCourseLoaded, isLoading: isCourseLoading } = useFetchMyCourseList();

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

  const { data, isLoading: isMainLoading } = useFetchLmsMain(
    {
      id: params.id ?? courseData?.courseList[0]?.lmsId!,
    },
    isCourseLoaded && isProgressLoaded,
  );

  const isLoading = isCourseLoading || isProgressLoading || isMainLoading;

  return (
    <>
      <title>Learning Log - {data?.courseName ?? "K-dual"}</title>
      <Page.Root className="mt-6 space-y-4 md:mt-10 md:space-y-6">
        <Page.Section className="">
          <Page.Content className="flex flex-col gap-4 md:grid md:grid-cols-[7fr_3fr] md:items-center md:justify-between md:gap-x-6">
            <h2 className="text-xl font-bold md:text-2xl">{isLoading ? <Skeleton className="h-8 w-64 rounded-xl" /> : data?.courseName}</h2>
            <div className="w-full md:w-auto">
              <CourseChange />
            </div>
          </Page.Content>
        </Page.Section>
        <Page.Section>
          {(isLoading || (isProgressLoaded && isCourseLoaded)) && (
            <Page.Content className="flex flex-col gap-6 md:grid md:grid-cols-[7fr_3fr] md:gap-x-6">
              <div className="flex min-w-0 flex-col gap-y-4 md:gap-y-6">
                <Curriculum weekSchedules={data?.weeklySchedule} progressStatus={progressData?.progress} isLoading={isLoading} />
              </div>
              <div className="flex max-h-full min-w-0 flex-col gap-y-4 md:gap-y-6">
                <CourseInfo lmsData={data} isLoading={isLoading} />
                {isLoading ? (
                  <>
                    <Skeleton className="h-40 w-full rounded-xl" />
                    <Skeleton className="h-40 w-full rounded-xl" />
                  </>
                ) : (
                  <>
                    <NoticeWidget noticeList={data?.noticeList ?? []} viewAllLink="" />
                    <CourseOverviewWidget lmsId={params.id ?? courseData?.courseList[0]?.lmsId ?? -1} />
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
