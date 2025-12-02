import clsx from "clsx";

interface GreetingSectionProps {
  userName: string;
  currentWeek: number;
}
const GreetingSection = ({ currentWeek, userName }: GreetingSectionProps) => {
  return (
    <div className="flex-col">
      <h1 className={clsx("mb-2 text-2xl font-light text-gray-600", "md:text-4xl")}>
        안녕하세요, <span className="font-bold text-gray-900">{userName}</span>님
      </h1>
      <p className={clsx("text-sm text-gray-600", "md:text-base")}>
        오늘도 힘찬 하루 되세요. {currentWeek}주차 과정이 진행 중입니다.
      </p>
    </div>
  );
};

export default GreetingSection;
