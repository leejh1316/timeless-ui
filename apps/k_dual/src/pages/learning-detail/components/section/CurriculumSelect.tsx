import { TrainingInfo } from "@src/api/schema/lms/lms-detail";
import { Card } from "@src/components/base/Card";
import { Select } from "@src/components/base/Select";
import { useNavigate, useParams } from "react-router";

interface CurriculumSelectProps {
  traningData: TrainingInfo;
}
const CurriculumSelect = ({ traningData }: CurriculumSelectProps) => {
  const params = useParams<{ id: string; week: string }>();
  const defaultCurriculum = traningData.inningList.find((inning) => inning.isSelected);
  const navigate = useNavigate();
  return (
    <Select.Root
      defaultValue={defaultCurriculum?.value}
      onValueChange={(value) => {
        navigate(`/learning-log/${params.id}/detail/${value}`, { viewTransition: true });
      }}
    >
      <Select.Trigger className="rounded-xl! hover:bg-gray-50! w-full border border-gray-200">
        <Select.Value placeholder="훈련선택" className="truncate whitespace-nowrap" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.View>
          <Select.Content className="max-w-xs md:max-w-[unset]">
            {traningData.inningList.map((inning) => (
              <Select.Item
                key={inning.value}
                textValue={inning.label}
                value={inning.value}
                className="text-sm!"
              >
                {inning.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.View>
      </Select.Portal>
    </Select.Root>
  );
};

export default CurriculumSelect;
