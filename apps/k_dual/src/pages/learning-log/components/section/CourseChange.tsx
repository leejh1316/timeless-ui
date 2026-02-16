import { useFetchMyCourseList } from "@src/api/endpoints/my";
import { Button } from "@src/components/base/Button";
import MyCourseWidget from "@src/components/widget/MyCourseWidget";
import { Modal } from "@timeless-ui/react";
import { SendToBack } from "lucide-react";
import { useState } from "react";

const CourseChange = () => {
  const { data: courseData } = useFetchMyCourseList();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Modal.Root open={modalOpen} onOpenChange={setModalOpen}>
      <Modal.Trigger asChild>
        <Button color="primary" className="w-full rounded-xl! p-3 px-6 text-sm font-bold transition-all">
          <div className="flex items-center justify-center">
            <SendToBack size={18} className="mr-2" />
            과목변경
          </div>
        </Button>
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay className="inset-0 z-40 bg-black/50 transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
        <Modal.Content className="fixed top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[calc(100vw-2rem)] max-w-3xl rounded-lg">
            <MyCourseWidget
              title="수강선택"
              defaultCourseData={courseData}
              className="min-h-[340px]"
              onNavigate={(courseId) => {
                setModalOpen(false);
              }}
            />
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
};
export default CourseChange;
