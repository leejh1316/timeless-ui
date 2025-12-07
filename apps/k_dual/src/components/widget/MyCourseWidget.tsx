import { useFetchMyCourseList } from "@src/api/endpoints/my";
import { Course, MyCourseListSchema } from "@src/api/schema/my/my-course";
import { Button } from "@src/components/base/Button";
import { Card, CardProps } from "@src/components/base/Card";
import { Label } from "@src/components/base/Label";
import { Select } from "@src/components/base/Select";
import { Skeleton } from "@src/components/base/Skeleton";
import clsx from "clsx";

import { useState } from "react";
import { useNavigate } from "react-router";

interface MyCourseWidgetProps extends CardProps {
  defaultCourseData?: MyCourseListSchema;
  title?: string;
  onNavigate?: (courseId: number | string) => void;
}
const MyCourseWidget = ({
  defaultCourseData,
  title = "수강 내역",
  className,
  onNavigate,
  ...props
}: MyCourseWidgetProps) => {
  const [selectedSemester, setSelectedSemester] = useState<string | null>(
    defaultCourseData?.semesterList[0]?.value ?? null,
  );
  const { data, isLoading } = useFetchMyCourseList(
    selectedSemester ? { sTermNo: selectedSemester, sordertype: "ASC" } : undefined,
  );

  const courseList: Course[] = data?.courseList ?? defaultCourseData?.courseList ?? [];
  return (
    <Card.Root className={clsx("@container w-full py-6", className)} {...props}>
      <Card.Header className="flex items-center justify-between px-8">
        <div className="flex items-center justify-between">
          <Card.Title className="text-lg font-bold text-gray-900">{title}</Card.Title>
        </div>
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
      </Card.Header>
      <div className="flex flex-col px-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center p-3">
              <Skeleton className="mr-4 h-[46px] w-[46px] rounded-xl bg-gray-100" />
              <div className="min-w-0 flex-1">
                <Skeleton className="mb-1.5 h-4 w-3/4 rounded-md bg-gray-100" />
                <Skeleton className="h-3.5 w-1/2 rounded-md bg-gray-100" />
              </div>
              <Skeleton className="ml-4 h-6 w-16 rounded-full bg-gray-100" />
            </div>
          ))
        ) : courseList.length > 0 ? (
          courseList.map((course: Course) => (
            <CourseItem key={course.lmsId} course={course} onNavigate={onNavigate} />
          ))
        ) : (
          <div className="py-10 text-center text-sm text-gray-500">수강 내역이 없습니다.</div>
        )}
      </div>
    </Card.Root>
  );
};

interface CourseItemProps {
  course: Course;
  onNavigate?: (courseId: number | string) => void;
}
const CourseItem = ({ course, onNavigate }: CourseItemProps) => {
  const navigate = useNavigate();
  return (
    <Button
      asChild
      onClick={() => {
        navigate(`/learning-log/${course.lmsId}`);
        onNavigate?.(course.lmsId);
      }}
    >
      <div className="group flex cursor-pointer items-center rounded-2xl p-3 transition-all hover:bg-gray-50">
        <div className="@max-sm:hidden bg-primary-50 text-primary-600 mr-4 flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all">
          {course.credits}학점
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 truncate text-[15px] font-semibold text-gray-900">
            {course.courseName}
          </div>
          <div className="flex items-center gap-2 truncate text-[13px] text-gray-500">
            <span>{course.professor} 교수</span>
            {course.companyTeacher && (
              <>
                <span className="h-2.5 w-px bg-gray-300"></span>
                <span>{course.companyTeacher} 현장교사</span>
              </>
            )}
          </div>
        </div>
        <Label
          color="default"
          className="rounded-full! px-2.5! py-1! @max-sm:hidden! ml-4 shrink-0 text-xs font-medium"
        >
          {course.department}
        </Label>

        <Label color="primary" className="@max-sm:inline-block hidden">
          {course.credits}학점
        </Label>
      </div>
    </Button>
  );
};

export default MyCourseWidget;
