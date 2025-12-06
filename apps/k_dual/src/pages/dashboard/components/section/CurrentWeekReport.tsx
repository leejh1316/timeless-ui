import { WeeklySchedule } from "@src/api/schema/lms/lms-main";
import { Button } from "@src/components/base/Button";
import { Card } from "@src/components/base/Card";
import { Label } from "@src/components/base/Label";
import clsx from "clsx";
import { PenTool } from "lucide-react";

interface CurrentWeekReportProps {
  schedule: WeeklySchedule;
}
const CurrentWeekReport = ({ schedule }: CurrentWeekReportProps) => {
  return (
    <Card className={clsx("h-fit w-full overflow-hidden p-10")} pointed>
      <div className="flex items-center justify-between">
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
        <div className="flex gap-x-3">
          <Button
            className={clsx(
              "rounded-xl border-none bg-teal-600 px-4 py-3.5 text-[15px] font-semibold text-white hover:bg-teal-700",
              "flex items-center gap-2",
            )}
          >
            <PenTool size={18} className="rotate-180 -scale-x-100" />
            작성 시작하기
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeekReport;
