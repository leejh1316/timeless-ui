import { useFetchMyCourseList } from "@src/api/endpoints/my";
import { Course, MyCourseListSchema } from "@src/api/schema/my/my-course";
import { Card } from "@src/components/base/Card";
import { Select } from "@src/components/base/Select";

import { useState } from "react";

interface MyCourseProps {
  defaultCourseData?: MyCourseListSchema;
}
const MyCourse = ({ defaultCourseData }: MyCourseProps) => {
  const [selectedSemester, setSelectedSemester] = useState<string | null>(
    defaultCourseData?.semesterList[0]?.value ?? null,
  );
  const { data, isLoading } = useFetchMyCourseList(
    selectedSemester ? { sTermNo: selectedSemester, sordertype: "ASC" } : undefined,
  );

  const courseList: Course[] = data?.courseList ?? defaultCourseData?.courseList ?? [];
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">수강 내역</span>
      </div>
      <Card className="w-full px-8 py-6">
        <Select.Root
          value={selectedSemester}
          onValueChange={(value) => {
            setSelectedSemester(value as string);
          }}
        >
          <Select.Trigger>
            <Select.Value placeholder="학기 선택" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.View>
              <Select.Content>
                {defaultCourseData?.semesterList.map((semester) => (
                  <Select.Item
                    value={semester.value}
                    textValue={semester.label}
                    key={semester.value}
                  >
                    {semester.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.View>
          </Select.Portal>
        </Select.Root>
        <div className="mt-6 flex flex-col gap-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            courseList.map((course: Course) => (
              <div key={course.lmsId}>
                {course.courseName} - {course.yearSemester}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default MyCourse;
