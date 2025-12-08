import { Card } from "@src/components/base/Card";

interface TaskFeedbackProps {
  taskFeedbackMessage?: string;
}
const TaskFeedback = ({ taskFeedbackMessage = "" }: TaskFeedbackProps) => {
  const messages = taskFeedbackMessage?.split("\n") || [];
  return (
    <Card.Root
      className="overflow-hidden p-5 md:p-6"
      pointed
      hidden={taskFeedbackMessage.length === 0}
    >
      <Card.Header>
        <Card.Title>과제</Card.Title>
      </Card.Header>
      <div className="space-y-2 whitespace-pre-wrap text-sm text-gray-800">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </Card.Root>
  );
};

export default TaskFeedback;
