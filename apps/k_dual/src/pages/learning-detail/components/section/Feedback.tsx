import { Feedbacks } from "@src/api/schema/lms/lms-detail";
import { Card } from "@src/components/base/Card";

interface FeedbackProps {
  feedbackData?: Feedbacks;
}
const Feedback = ({ feedbackData }: FeedbackProps) => {
  return (
    <Card.Root className="p-5 md:p-6">
      <Card.Header className="">
        <Card.Title>피드백</Card.Title>
      </Card.Header>

      <div>
        <div>
          <span className="mb-2 inline-block text-sm font-medium text-gray-600">현장교사</span>
          <p className="text-sm text-gray-800">
            {feedbackData?.companyTeacher || "등록된 피드백이 없습니다."}
          </p>
        </div>
        <div className="my-3 h-px bg-gray-100" />
        <div>
          <span className="mb-2 inline-block text-sm font-medium text-gray-600">지도교수</span>
          <p className="text-sm text-gray-800">
            {feedbackData?.professor || "등록된 피드백이 없습니다."}
          </p>
        </div>
      </div>
    </Card.Root>
  );
};

export default Feedback;
