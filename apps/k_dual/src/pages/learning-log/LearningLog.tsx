import { Page } from "@src/components/layout/Page";
import CourseInfo from "./components/section/CourseInfo";
import { useFetchLmsMain } from "@src/api/endpoints/lms";
import { useFetchMyCourseList } from "@src/api/endpoints/my";
import { useState } from "react";
import { useParams } from "react-router";
import MyCourseWidget from "@src/components/widget/MyCourseWidget";
import { Button, Modal } from "@timeless-ui/ui";
import { Card } from "@src/components/base/Card";
import CourseChange from "./components/section/CourseChange";

const LearningLog = () => {
  const params = useParams<{ id: string }>();
  const {
    data: courseData,
    isSuccess: isCourseLoaded,
    isLoading: isCourseLoading,
  } = useFetchMyCourseList();

  const { data, isError, error } = useFetchLmsMain(
    {
      id: params.id ?? courseData?.courseList[0]?.lmsId!,
    },
    isCourseLoaded,
  );

  return (
    <>
      <title>Learning Log - {data?.courseName ?? "K-dual"}</title>
      <Page.Root>
        <Page.Section className="mt-10">
          <Page.Content className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{data?.courseName}</h2>
            <CourseChange />
          </Page.Content>
        </Page.Section>
        <Page.Section>
          <Page.Content className="grid grid-cols-[7fr_3fr]">
            <div className="min-w-0"></div>
            <div className="flex min-w-0 flex-col gap-y-6">
              <CourseInfo lmsData={data} />
            </div>
          </Page.Content>
        </Page.Section>
      </Page.Root>
    </>
  );
};

export default LearningLog;
