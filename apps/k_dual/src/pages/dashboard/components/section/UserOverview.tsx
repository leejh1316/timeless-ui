import { useFetchLmsProgress } from "@src/api/endpoints/lms";
import { LmsProgress } from "@src/api/schema/lms/lms-progress";
import { Card } from "@src/components/base/Card";
import CircularProgress from "@src/components/base/CircularProgress";
import { Skeleton } from "@src/components/base/Skeleton";
import { useEffect, useState } from "react";

// 유저 학습활동 진행률
interface UserOverviewProps {
  lmsId: number;
}
const UserOverview = ({ lmsId }: UserOverviewProps) => {
  const { data, isLoading } = useFetchLmsProgress({ lmsId }, lmsId !== -1);
  const [percent, setPercent] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!data) return;
    const total = data.weeks.length;
    const completed = data.progress.filter((progress) => progress.status === "COMPLETED").length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    setPercent(percent);
    setCompletedCount(completed);
    setTotalCount(total);
  }, [data]);
  return (
    <Card.Root className="h-fit w-full p-8">
      <div className="flex flex-col">
        <Card.Header>
          <Card.Title className="text-base! tracking-wide text-gray-500">학습진행률</Card.Title>
        </Card.Header>
        {isLoading ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <Skeleton className="mb-2 h-8 w-24 rounded-md bg-gray-100" />
                <Skeleton className="h-4 w-20 rounded-md bg-gray-100" />
              </div>
              <Skeleton className="h-10 w-10 rounded-full bg-gray-100" />
            </div>
            <div className="my-5 h-px bg-gray-200"></div>
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="mb-2 h-8 w-24 rounded-md bg-gray-100" />
                <Skeleton className="h-4 w-20 rounded-md bg-gray-100" />
              </div>
            </div>
          </>
        ) : (
          <>
            <UserOverViewProgress percent={percent} />
            <div className="mb-5 h-px bg-gray-200"></div>
            <UserOverviewAbsolute completedCount={completedCount} totalCount={totalCount} />
          </>
        )}
      </div>
    </Card.Root>
  );
};

interface UserOverViewProgressProps {
  percent: number;
}
const UserOverViewProgress = ({ percent }: UserOverViewProgressProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <div className="text-[32px] font-extrabold text-gray-900">{percent}%</div>
        <div className="mt-1 text-sm text-gray-500">전체 진행률</div>
      </div>
      <CircularProgress percent={percent} size={40} strokeWidth={4} />
    </div>
  );
};

interface UserOverviewAbsoluteProps {
  totalCount: number;
  completedCount: number;
}
const UserOverviewAbsolute = ({ completedCount, totalCount }: UserOverviewAbsoluteProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-[32px] font-extrabold text-gray-900">
          {completedCount} / {totalCount}
        </div>
        <div className="mt-1 text-sm text-gray-500">작성 완료 (주)</div>
      </div>
    </div>
  );
};

export default UserOverview;
export { UserOverViewProgress, UserOverviewAbsolute };
