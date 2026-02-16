import { Status, WeeklySchedule } from "@src/api/schema/lms/lms-main";
import { ProgressStatus } from "@src/api/schema/lms/lms-progress";
import { Button } from "@src/components/base/Button";
import { Card } from "@src/components/base/Card";
import { Label, LabelColor } from "@src/components/base/Label";
import { Skeleton } from "@src/components/base/Skeleton";
import { ProgressStatusEnum, ProgressStatusLabel } from "@src/const/ProgressStatus";
import { StatusEnum, StatusLabel } from "@src/const/Status";
import { Tabs } from "@timeless-ui/react";
import clsx from "clsx";
import { FileX } from "lucide-react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
interface CurriculumProps {
  weekSchedules?: WeeklySchedule[];
  progressStatus?: ProgressStatus[];
  isLoading?: boolean;
}

const Curriculum = ({ weekSchedules, progressStatus, isLoading }: CurriculumProps) => {
  const tabs = useMemo(() => {
    const tabs: Record<string, { label: string; items: WeeklySchedule[] }> = {
      all: {
        label: "전체",
        items: [],
      },
      [ProgressStatusEnum.IN_PROGRESS]: {
        label: ProgressStatusLabel[ProgressStatusEnum.IN_PROGRESS],
        items: [],
      },
      [ProgressStatusEnum.NOT_STARTED]: {
        label: ProgressStatusLabel[ProgressStatusEnum.NOT_STARTED],
        items: [],
      },
      [ProgressStatusEnum.COMPLETED]: {
        label: ProgressStatusLabel[ProgressStatusEnum.COMPLETED],
        items: [],
      },
    };

    if (!weekSchedules || !progressStatus) return tabs;

    tabs["all"].items = weekSchedules;
    progressStatus.forEach((status, index) => {
      tabs[status.status].items.push(weekSchedules[index]);
    });

    return tabs;
  }, [weekSchedules, progressStatus]);

  return (
    <Card.Root className="py-6 md:py-8">
      <Card.Header className="mb-4 px-5 md:mb-6 md:px-8">
        <Card.Title>주차별 학습일정</Card.Title>
      </Card.Header>
      <div className="">
        <Tabs.Root defaultValue="all">
          <Tabs.List className="relative flex gap-4 border-b border-gray-100 px-5 md:gap-6 md:px-8">
            {Object.entries(tabs).map(([key, tab]) => (
              <Tabs.Trigger
                className="data-[active=true]:text-primary-600 cursor-pointer pb-2 text-sm font-semibold text-gray-400 transition-colors hover:text-gray-600"
                value={key}
                key={key}
              >
                {tab.label} ({tab.items.length})
              </Tabs.Trigger>
            ))}
            <Tabs.Indicator className="bg-primary-500 absolute bottom-0 -ml-1 box-content h-0.5 rounded-full px-1 transition-all" />
          </Tabs.List>

          <div className="mt-4 px-4 md:px-5">
            {Object.entries(tabs).map(([key, tab]) => (
              <Tabs.Content key={key} value={key}>
                <CurriculumList isLoading={isLoading!} weekSchedules={tab.items} progressStatus={progressStatus!} />
              </Tabs.Content>
            ))}
          </div>
        </Tabs.Root>
      </div>
    </Card.Root>
  );
};

interface CurriculumListProps {
  isLoading: boolean;
  weekSchedules: WeeklySchedule[];
  progressStatus: ProgressStatus[];
}
const CurriculumListSkeletons = () => (
  <div className="space-y-2">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center rounded-2xl p-3">
        <Skeleton className="mr-4 h-12 w-12 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    ))}
  </div>
);
const CurriculumList = ({ isLoading, weekSchedules, progressStatus }: CurriculumListProps) => {
  if (isLoading) {
    return <CurriculumListSkeletons />;
  }
  if (weekSchedules.length === 0) {
    return <EmptyState message="학습일정이 없습니다." />;
  }

  return weekSchedules.map((weekSchedule) => (
    <CurriculumItem key={weekSchedule.week} weekSchedule={weekSchedule} progressStatus={progressStatus[Number(weekSchedule.week) - 1]} />
  ));
};

interface CurriculumItemProps {
  weekSchedule: WeeklySchedule;
  progressStatus: ProgressStatus;
}
const CurriculumItem = ({ weekSchedule, progressStatus }: CurriculumItemProps) => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const progressColor: Record<ProgressStatusEnum, LabelColor> = {
    [ProgressStatusEnum.NOT_STARTED]: "danger",
    [ProgressStatusEnum.IN_PROGRESS]: "warning",
    [ProgressStatusEnum.COMPLETED]: "primary",
  };

  const labelStyle = "shrink-0 rounded-full! px-2.5! py-1! text-xs font-medium";

  const isCurrentWeek = weekSchedule.status === StatusEnum.IN_PROGRESS;
  const isNotStarted = weekSchedule.status === StatusEnum.NOT_STARTED;
  const isEvaluated = weekSchedule.isEvaluation;

  return (
    <Button
      asChild
      color="none"
      onClick={() =>
        navigate(`/learning-log/${params?.id ?? progressStatus.courseId}/detail/${weekSchedule.week}`, { viewTransition: true })
      }
    >
      <div className="group flex w-full cursor-pointer flex-col gap-2 rounded-2xl p-3 transition-all hover:bg-gray-50 md:flex-row md:items-center md:gap-0">
        <div className="flex w-full min-w-0 items-center md:w-auto md:flex-1">
          <div
            className={clsx("mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all", {
              "bg-gray-100 text-gray-500": !weekSchedule.isEvaluation,
              "bg-secondary-50 text-secondary-600": weekSchedule.isEvaluation,
            })}
          >
            {weekSchedule.week}주
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 truncate text-sm font-semibold text-gray-900 md:text-[15px]">{weekSchedule.title}</div>
            <div className="flex items-center gap-2 truncate text-[13px] text-gray-500">
              <span>{weekSchedule.period.replace(/\-/g, ".")}</span>
            </div>
          </div>
        </div>
        <div className="ml-16 flex flex-wrap gap-1 md:ml-4 md:justify-end">
          {/* 현재 진행 회차 */}
          {isCurrentWeek && (
            <Label color="info" className={labelStyle}>
              {StatusLabel[StatusEnum.IN_PROGRESS]}
            </Label>
          )}
          {/* 미진행 회차 */}
          {isNotStarted && (
            <Label color="default" className={labelStyle}>
              {StatusLabel[StatusEnum.NOT_STARTED]}
            </Label>
          )}
          {/* 보고서 작성 진행 상태 */}
          {!isNotStarted && (
            <Label color={progressColor[progressStatus.status]} className={labelStyle}>
              {ProgressStatusLabel[progressStatus.status]}
            </Label>
          )}
          {isEvaluated && (
            <Label color="secondary" className={labelStyle}>
              수행평가
            </Label>
          )}
        </div>
      </div>
    </Button>
  );
};

const EmptyState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-16 text-gray-400">
    <p className="text-sm font-medium text-gray-500">{message}</p>
  </div>
);
export default Curriculum;
