import { LmsMain } from "@src/api/schema/lms/lms-main";
import { Card } from "@src/components/base/Card";
import { Label } from "@src/components/base/Label";
import { Skeleton } from "@src/components/base/Skeleton";
import { UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface CourseInfoProps {
  lmsData?: LmsMain;
  isLoading?: boolean;
}
const CourseInfo = ({ lmsData, isLoading }: CourseInfoProps) => {
  const { courseInfo, progressInfo, weeklySchedule, semesterList } = lmsData ?? {};
  const completedWeekCount =
    weeklySchedule?.filter((week) => week.status === "completed").length ?? 0;
  const totalWeekCount = weeklySchedule?.length ?? 0;
  const progressPercentage = totalWeekCount
    ? Math.round((completedWeekCount / totalWeekCount) * 100)
    : 0;

  return (
    <Card.Root className="relative overflow-hidden p-6" pointed>
      <Card.Header>
        <Card.Title>과목정보</Card.Title>
      </Card.Header>

      <dl className="grid grid-cols-2 gap-x-2 gap-y-3 text-sm">
        <div className="col-span-2">
          <dt className="text-xs text-gray-600">년도/학기</dt>
          <dd className="font-medium text-gray-900">
            {isLoading ? <Skeleton className="h-5 w-24" /> : (courseInfo?.semester ?? "-")}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-gray-600">지도교수</dt>
          <dd className="break-all font-medium text-gray-900">
            {isLoading ? <Skeleton className="h-5 w-16" /> : (courseInfo?.professorName ?? "-")}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-gray-600">학부</dt>
          <dd className="font-medium text-gray-900">
            {isLoading ? <Skeleton className="h-5 w-20" /> : (courseInfo?.departmentName ?? "-")}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-gray-600">학점</dt>
          <dd className="font-medium text-gray-900">
            {isLoading ? <Skeleton className="h-5 w-8" /> : (courseInfo?.credits ?? "-")}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-gray-600">수강인원</dt>
          <dd className="break-all text-gray-900">
            {isLoading ? (
              <Skeleton className="h-5 w-12" />
            ) : (
              (courseInfo?.studentCount.replace("수강", "") ?? "-")
            )}
          </dd>
        </div>
      </dl>
      <div className="my-4 h-px bg-gray-100" />
      <div>
        <div className="mb-2 flex justify-between text-[13px] font-semibold text-gray-900">
          <span>진도율</span>
          <span>
            {isLoading ? (
              <Skeleton className="h-4 w-16" />
            ) : (
              `${completedWeekCount} / ${totalWeekCount}주차`
            )}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          {isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <div
              className="bg-primary-600 h-full rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          )}
        </div>
        <div className="mt-1.5 text-right text-xs font-normal text-gray-500">
          {isLoading ? (
            <div className="flex justify-end">
              <Skeleton className="h-4 w-10" />
            </div>
          ) : (
            `${progressInfo?.totalHours}시간`
          )}
        </div>
      </div>
    </Card.Root>
  );
};

export default CourseInfo;
