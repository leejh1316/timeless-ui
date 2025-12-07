import { Status, WeeklySchedule } from "@src/api/schema/lms/lms-main";
import { ProgressStatus } from "@src/api/schema/lms/lms-progress";
import { Button } from "@src/components/base/Button";
import { Card } from "@src/components/base/Card";
import { Label } from "@src/components/base/Label";
import { ProgressStatusEnum, ProgressStatusLabel } from "@src/const/ProgressStatus";
import { StatusEnum, StatusLabel } from "@src/const/Status";
import { Tabs } from "@timeless-ui/ui";
import clsx from "clsx";
import { FileX } from "lucide-react";
import { useMemo } from "react";
interface CurriculumProps {
  weekSchedules?: WeeklySchedule[];
  progressStatus?: ProgressStatus[];
}

const Curriculum = ({ weekSchedules, progressStatus }: CurriculumProps) => {
  const { completedSchedules, inProgressSchedules, notStartedSchedules } = useMemo(() => {
    const inProgressSchedules: WeeklySchedule[] = [];
    const notStartedSchedules: WeeklySchedule[] = [];
    const completedSchedules: WeeklySchedule[] = [];
    weekSchedules?.forEach((schedule) => {
      switch (schedule.status) {
        case StatusEnum.IN_PROGRESS:
          inProgressSchedules.push(schedule);
          break;
        case StatusEnum.NOT_STARTED:
          notStartedSchedules.push(schedule);
          break;
        case StatusEnum.COMPLETED:
          completedSchedules.push(schedule);
          break;
      }
    });
    return { inProgressSchedules, notStartedSchedules, completedSchedules };
  }, [weekSchedules]);
  return (
    <Card.Root className="py-8">
      <Card.Header className="mb-6 px-8">
        <Card.Title>주차별 학습일정</Card.Title>
      </Card.Header>
      <div className="">
        <Tabs.Root defaultValue="all">
          <Tabs.List className="relative flex gap-6 border-b border-gray-100 px-8">
            <Tabs.Trigger
              className="data-[active=true]:text-primary-600 cursor-pointer pb-2 text-sm font-semibold text-gray-400 transition-colors hover:text-gray-600"
              value="all"
            >
              전체
            </Tabs.Trigger>
            <Tabs.Trigger
              className="data-[active=true]:text-primary-600 cursor-pointer pb-2 text-sm font-semibold text-gray-400 transition-colors hover:text-gray-600"
              value={StatusEnum.IN_PROGRESS}
            >
              진행중
            </Tabs.Trigger>
            <Tabs.Trigger
              className="data-[active=true]:text-primary-600 cursor-pointer pb-2 text-sm font-semibold text-gray-400 transition-colors hover:text-gray-600"
              value={StatusEnum.NOT_STARTED}
            >
              미진행
            </Tabs.Trigger>
            <Tabs.Trigger
              className="data-[active=true]:text-primary-600 cursor-pointer pb-2 text-sm font-semibold text-gray-400 transition-colors hover:text-gray-600"
              value={StatusEnum.COMPLETED}
            >
              완료
            </Tabs.Trigger>
            <Tabs.Indicator className="bg-primary-500 bottom-0 -ml-1 box-content h-0.5 rounded-full px-1" />
          </Tabs.List>
          <div className="mt-4 px-5">
            <Tabs.Content value="all">
              {weekSchedules?.length !== 0 ? (
                weekSchedules?.map((weekSchedule, index) => (
                  <CurriculumItem
                    key={weekSchedule.week}
                    weekSchedule={weekSchedule}
                    progressStatus={progressStatus![index]}
                  />
                ))
              ) : (
                <EmptyState message="등록된 일정이 없습니다." />
              )}
            </Tabs.Content>
            <Tabs.Content value={StatusEnum.IN_PROGRESS}>
              {inProgressSchedules.length !== 0 ? (
                inProgressSchedules.map((weekSchedule, index) => (
                  <CurriculumItem
                    key={weekSchedule.week}
                    weekSchedule={weekSchedule}
                    progressStatus={progressStatus![index]}
                  />
                ))
              ) : (
                <EmptyState message="진행중인 일정이 없습니다." />
              )}
            </Tabs.Content>
            <Tabs.Content value={StatusEnum.NOT_STARTED}>
              {notStartedSchedules.length !== 0 ? (
                notStartedSchedules.map((weekSchedule, index) => (
                  <CurriculumItem
                    key={weekSchedule.week}
                    weekSchedule={weekSchedule}
                    progressStatus={progressStatus![index]}
                  />
                ))
              ) : (
                <EmptyState message="미진행 일정이 없습니다." />
              )}
            </Tabs.Content>
            <Tabs.Content value={StatusEnum.COMPLETED}>
              {completedSchedules.length !== 0 ? (
                completedSchedules.map((weekSchedule, index) => (
                  <CurriculumItem
                    key={weekSchedule.week}
                    weekSchedule={weekSchedule}
                    progressStatus={progressStatus![index]}
                  />
                ))
              ) : (
                <EmptyState message="완료된 일정이 없습니다." />
              )}
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </div>
    </Card.Root>
  );
};

interface CurriculumItemProps {
  weekSchedule: WeeklySchedule;
  progressStatus: ProgressStatus;
}
const CurriculumItem = ({ weekSchedule, progressStatus }: CurriculumItemProps) => {
  const progressColor = {
    [ProgressStatusEnum.EMPTY]: "bg-danger-50 text-danger-600",
    [ProgressStatusEnum.PARTIAL]: "bg-rose-50 text-rose-600",
    [ProgressStatusEnum.COMPLETED]: "",
  };
  return (
    <Button asChild color="none">
      <div className="group flex cursor-pointer items-center rounded-2xl p-3 transition-all hover:bg-gray-50">
        <div
          className={clsx(
            "mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all",
            {
              "bg-gray-100 text-gray-500": !weekSchedule.isEvaluation,
              "bg-secondary-50 text-secondary-600": weekSchedule.isEvaluation,
            },
          )}
        >
          {weekSchedule.week}주
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 truncate text-[15px] font-semibold text-gray-900">
            {weekSchedule.title}
          </div>
          <div className="flex items-center gap-2 truncate text-[13px] text-gray-500">
            <span>{weekSchedule.period.replace(/\-/g, ".")}</span>
          </div>
        </div>
        <div className="ml-4 flex gap-1">
          {/* 완료 라벨 */}
          {progressStatus.status === ProgressStatusEnum.COMPLETED && (
            <Label
              color="primary"
              className={`rounded-full! px-2.5! py-1! shrink-0 text-xs font-medium`}
            >
              {ProgressStatusLabel[progressStatus.status]}
            </Label>
          )}
          {/* 미진행 */}
          {weekSchedule.status === StatusEnum.NOT_STARTED && (
            <Label
              color="default"
              className={`rounded-full! px-2.5! py-1! shrink-0 text-xs font-medium`}
            >
              {StatusLabel[weekSchedule.status]}
            </Label>
          )}
          {/* 진행중 라벨 */}
          {weekSchedule.status === StatusEnum.IN_PROGRESS && (
            <Label
              color="none"
              className={`rounded-full! px-2.5! py-1! shrink-0 bg-sky-50 text-xs font-medium text-sky-600`}
            >
              {StatusLabel[weekSchedule.status]}
            </Label>
          )}
          {/* 미작성 / 부분완료 */}
          {(weekSchedule.status === StatusEnum.COMPLETED ||
            weekSchedule.status === StatusEnum.IN_PROGRESS) &&
            (progressStatus.status === ProgressStatusEnum.PARTIAL ||
              progressStatus.status === ProgressStatusEnum.EMPTY) && (
              <Label
                color="none"
                className={`rounded-full! px-2.5! py-1! shrink-0 text-xs font-medium ${progressColor[progressStatus.status]}`}
              >
                {ProgressStatusLabel[progressStatus.status]}
              </Label>
            )}
          {/* 수행평가 라벨 */}
          {weekSchedule.isEvaluation && (
            <Label
              color="secondary"
              className={`rounded-full! px-2.5! py-1! shrink-0 text-xs font-medium`}
            >
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
