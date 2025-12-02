import { Button } from "@src/components/base/Button";
import { Card } from "@src/components/base/Card";
import clsx from "clsx";
import { Clock, PenTool } from "lucide-react";

interface CurrentWeekReportProps {
  currentWeek: number;
}
const CurrentWeekReport = () => {
  return (
    <Card className={clsx("rounded-3xl! overflow-hidden p-10")} pointed>
      <div className="flex items-center justify-between">
        <div>
          <div>
            <h3 className="mb-2 text-2xl font-bold">12주차 학습일지</h3>
            <p className="flex items-center gap-1.5 text-sm font-semibold text-teal-600">
              <Clock size={14} /> 마감까지 2일 남음
            </p>
          </div>
          <div className="mt-4 text-sm text-gray-500">PBL OJT 진행 및 신뢰성 검증</div>
        </div>
        <div className="flex gap-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-xl text-teal-600">
            <PenTool size={20} className="rotate-180 -scale-x-100" />
          </div>
          <Button
            className={clsx(
              "rounded-xl border-none bg-teal-600 px-8 py-3.5 text-[15px] font-semibold text-white hover:bg-teal-700",
            )}
          >
            작성 시작하기
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeekReport;
