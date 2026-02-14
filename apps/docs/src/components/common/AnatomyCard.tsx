import { Card } from "../ui/Card";
// 컴포넌트의 구조를 설명하는 카드 컴포넌트
interface AnatomyCardProps {
  title: string;
  description: string;
}
const AnatomyCard = ({ description, title }: AnatomyCardProps) => {
  return (
    <Card className="flex items-start gap-3 p-4">
      <div className="bg-icon-primary mt-1 h-2 w-2 shrink-0 rounded-full md:mt-1.5" />
      <div>
        <p className="font-code text-body-3 font-semibold">{title}</p>
        <p className="text-body-3 text-ink-tertiary mt-0.5">{description}</p>
      </div>
    </Card>
  );
};
AnatomyCard.displayName = "AnatomyCard";

export { AnatomyCard };
