import { NcsInfo, PeriodInfo } from "@src/api/schema/lms/lms-detail";
import { Card } from "@src/components/base/Card";
import { ApprovalStatusEnum, ApprovalStatusLabel } from "@src/const/ApprovalStatus";
import { StatusEnum, StatusLabel } from "@src/const/Status";

interface TrainingInfoProps {
  ncsInfo: NcsInfo;
  title: string;
  periodInfo: PeriodInfo;
  status: string;
}
const TrainingInfo = ({ ncsInfo, title, periodInfo, status }: TrainingInfoProps) => {
  return (
    <Card.Root className="p-6">
      <Card.Header>
        <Card.Title>훈련 정보</Card.Title>
      </Card.Header>
      <dl className="grid grid-cols-2 gap-x-2 gap-y-3 text-sm">
        <div className="col-span-2">
          <dt className="text-xs text-gray-600">진행기간</dt>
          <dd className="font-medium text-gray-900">{periodInfo?.period ?? "-"}</dd>
        </div>

        <div className="col-span-2">
          <dt className="text-xs text-gray-600">NCS 능력단위</dt>
          <dd className="font-medium text-gray-900">{ncsInfo?.unit ?? "-"}</dd>
        </div>

        <div className="col-span-2">
          <dt className="text-xs text-gray-600">NCS 능력단위요소</dt>
          <dd className="font-medium text-gray-900">{ncsInfo?.element ?? "-"}</dd>
        </div>

        <div className="">
          <dt className="text-xs text-gray-600">훈련시간</dt>
          <dd className="font-medium text-gray-900">{periodInfo.trainingHours ?? "-"}</dd>
        </div>
        <div className="">
          <dt className="text-xs text-gray-600">상태</dt>
          <dd className="font-medium text-gray-900">
            {ApprovalStatusLabel[status as ApprovalStatusEnum] ?? "-"}
          </dd>
        </div>
      </dl>
    </Card.Root>
  );
};

export default TrainingInfo;
