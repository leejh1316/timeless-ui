import { Feedbacks } from "@src/api/schema/lms/lms-detail";
import { Card } from "@src/components/base/Card";

interface FeedbackProps {
  feedbackData?: Feedbacks;
}
const Feedback = ({ feedbackData }: FeedbackProps) => {
  return (
    <Card.Root className="p-6">
      <Card.Header className="">
        <Card.Title>피드백</Card.Title>
      </Card.Header>
      <div></div>
    </Card.Root>
  );
};

export default Feedback;
