import { Card } from "@src/components/base/Card";
import { UserCircle } from "lucide-react";

const CourseInfo = () => {
  return (
    <Card className="relative overflow-hidden p-6" pointed>
      <div className="mb-1.5 flex justify-between text-[13px] font-medium text-gray-500">
        <span>2025년 2학기</span>
        <span className="font-bold text-teal-600">진행중</span>
      </div>
      <div className="mb-2 text-xl font-extrabold leading-tight">일학습병행학부</div>
      <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
        <UserCircle size={16} /> 전우치 교수님
        <span className="rounded bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-500">
          3학점
        </span>
        <span className="rounded bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-500">
          수강 1명
        </span>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex justify-between text-[13px] font-semibold text-gray-900">
          <span>진도율</span>
          <span>12 / 15주차</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-[80%] rounded-full bg-teal-600"></div>
        </div>
        <div className="mt-1.5 text-right text-xs font-normal text-gray-500">
          총 OJT 훈련시간 90hr 완료
        </div>
      </div>
    </Card>
  );
};

export default CourseInfo;
