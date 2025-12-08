import { WeeklySchedule } from "@src/api/schema/lms/lms-main";
import { Button } from "@src/components/base/Button";
import { Card } from "@src/components/base/Card";
import { Label } from "@src/components/base/Label";
import clsx from "clsx";
import { PenTool } from "lucide-react";
import { useNavigate } from "react-router";

interface CurrentWeekReportProps {
  schedule: WeeklySchedule;
  courseId?: number;
}
const CurrentWeekReport = ({ schedule, courseId }: CurrentWeekReportProps) => {
  const navigate = useNavigate();
  return (
    <Card.Root className={clsx("h-fit w-full overflow-hidden p-6 md:p-10")} pointed>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div>
            {schedule.isEvaluation && (
              <Label color="secondary" className="mb-0.5">
                수행평가
              </Label>
            )}
            <h3 className="mb-2 text-2xl font-bold">{schedule.week}주차 학습일지</h3>
            <p className="flex items-center gap-1.5 break-keep text-sm font-semibold text-teal-600">
              {schedule.title}
            </p>
          </div>
          <div className="mt-4 text-sm text-gray-500">{schedule.period.replace(/\-/g, ".")}</div>
        </div>
        <div className="flex w-full shrink-0 gap-x-3 md:w-auto">
          <Button
            onClick={() => navigate(`/learning-log/${courseId}/detail/${schedule.week}`)}
            className={clsx(
              "rounded-xl border-none bg-teal-600 px-4 py-3.5 text-[15px] font-semibold text-white hover:bg-teal-700",
              "flex w-full items-center justify-center gap-2 md:w-auto",
            )}
          >
            <PenTool size={18} className="rotate-180 -scale-x-100" />
            작성 시작하기
          </Button>
        </div>
      </div>
    </Card.Root>
  );
};

export default CurrentWeekReport;
