import { useFetchLmsLearningDetail } from "@src/api/endpoints/lms";
import { Button } from "@src/components/base/Button";
import { Page } from "@src/components/layout/Page";
import { ArrowLeft } from "lucide-react";
import { To, useNavigate, useParams } from "react-router";
import CurriculumSelect from "./components/section/CurriculumSelect";
import Feedback from "./components/section/Feedback";
import EditForm from "./components/section/EditForm";
import TaskFeedback from "./components/section/TaskFeedback";

const LearningDetail = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string; week: string }>();
  const { data, isSuccess, isLoading, isFetching, dataUpdatedAt } = useFetchLmsLearningDetail({
    lmsId: params.id!,
    week: params.week!,
  });
  return (
    <>
      <Page.Root className="mt-10 space-y-6">
        <Page.Section>
          <Page.Content className="grid grid-cols-[7fr_3fr] gap-x-6">
            <div className="flex min-w-0 items-center">
              <Button
                onClick={() => {
                  navigate(`/learning-log/${params.id}`, { viewTransition: true });
                }}
                color="none"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-800"
              >
                <ArrowLeft size={20} className="" />
              </Button>
              <h2 className="ml-3 text-2xl font-bold">학습활동서 작성</h2>
            </div>
            <div className="w-full min-w-0">
              {isSuccess && <CurriculumSelect traningData={data.trainingInfo} />}
            </div>
          </Page.Content>
        </Page.Section>
        {isSuccess && (
          <Page.Section key={dataUpdatedAt}>
            <Page.Content className="grid grid-cols-[7fr_3fr] gap-x-6">
              <div className="flex min-w-0 flex-col gap-y-6">
                <EditForm
                  activityFormData={data.activityForm}
                  file={data.file}
                  fileGroupNo={data.fileGroupNo}
                  studyInningNo={data.studyInningNo}
                />
              </div>
              <div className="flex min-w-0 flex-col gap-y-6">
                <Feedback feedbackData={data.feedbacks} />
                <TaskFeedback taskFeedbackMessage={data.activityForm.feedback} />
              </div>
            </Page.Content>
          </Page.Section>
        )}
      </Page.Root>
    </>
  );
};
export default LearningDetail;
