import { useFetchMyCourseList } from "@src/api/endpoints/my";
import { Button } from "@src/components/base/Button";
import MyCourseWidget from "@src/components/widget/MyCourseWidget";
import { Modal } from "@timeless-ui/ui";
import { useState } from "react";

const CourseChange = () => {
  const { data: courseData } = useFetchMyCourseList();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Modal.Root open={modalOpen} onOpenChange={setModalOpen}>
      <Modal.Trigger asChild>
        <Button color="primary" className="rounded-xl p-3 text-sm font-bold transition-all">
          일지변경
        </Button>
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay className="bg-black/20" />
        <Modal.Content className="w-[90vw] max-w-3xl rounded-lg p-6">
          <MyCourseWidget
            title="수강선택"
            defaultCourseData={courseData}
            className="h-[340px]"
            onNavigate={(courseId) => {
              setModalOpen(false);
            }}
          />
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
};
export default CourseChange;
