import { ActivityForm, File as LmsFile } from "@src/api/schema/lms/lms-detail";
import { Card } from "@src/components/base/Card";
import { AlertDialog, Input, Textarea } from "@timeless-ui/ui";
import { useEffect, useRef, useState } from "react";
import DatePickerInput from "../input/DatePickerInput";
import { Delete, FileArchive, SquarePen, Trash, Trash2 } from "lucide-react";
import { Button } from "@src/components/base/Button";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import FileUploadArea from "../input/FileUploadArea";
import { useParams } from "react-router";
import { Label } from "@src/components/base/Label";
import { useLmsFileDelete, useLmsSave } from "@src/api/endpoints/lms";
import { useToastStore } from "@src/store/useToastStore";

interface EditFormProps {
  activityFormData: ActivityForm;
  file: LmsFile;
  fileGroupNo: string;
  studyInningNo: string;
  status: string;
}

// week -> inningId
const EditForm = ({ activityFormData, file, fileGroupNo, studyInningNo, status }: EditFormProps) => {
  const addToast = useToastStore((state) => state.addToast);
  const params = useParams<{ id: string; week: string }>();
  const [fileState, setFileState] = useState<File | null>(null);
  const [formState, setFormState] = useState({
    date: activityFormData.date || "",
    content: activityFormData.content || "",
    impression: activityFormData.impression || "",
  });

  const { mutateAsync: deleteFile, isPending: isDeleting } = useLmsFileDelete();
  const { mutateAsync: save, isPending: isSaving } = useLmsSave();

  const hasTask = activityFormData.feedback.length !== 0;
  const hasUploadedFile = fileGroupNo && fileGroupNo !== "0";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await save({
        "courseInningsInfo.InningNo": params.week!,
        inDate: formState.date,
        trContent: formState.content,
        impression: formState.impression,
        fileGroupNo,
        fileData: fileState,
        studyInningNo: studyInningNo,
        lmsId: params.id!,
        week: params.week!,
      });
      addToast({
        status: "success",
        title: "저장 완료",
        description: "학습활동서가 저장되었습니다.",
      });
      setFileState(null);
    } catch (error) {
      addToast({
        status: "error",
        title: "저장 실패",
        description: "학습활동서 저장에 실패했습니다.",
      });
    }
  };

  const isLoading = isSaving || isDeleting;
  const isApproved = status === "APPROVED";

  return (
    <Card.Root className="w-full p-5 md:p-6">
      <Card.Header>
        <Card.Title className="flex items-center">
          <SquarePen size={18} className="text-primary-600 mr-2" />
          활동 내용 작성
        </Card.Title>
      </Card.Header>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-600">훈련 일자</span>
          <DatePickerInput
            disabled={isApproved}
            value={new Date(formState.date)}
            defaultDisplayDate={new Date(formState.date)}
            onValueChange={(date) => {
              setFormState((prev) => ({
                ...prev,
                date: format(date, "yyyy-MM-dd", { locale: ko }),
              }));
            }}
          />
        </div>

        <Textarea.Root
          value={formState.content}
          onValueChange={(value) => {
            setFormState((prev) => ({ ...prev, content: value }));
          }}
        >
          <div className="mb-2 flex justify-between">
            <Textarea.Label className="text-sm font-medium text-gray-700">활동 내용</Textarea.Label>
            <div className="text-xs text-gray-500">
              <Textarea.Count /> / 800
            </div>
          </div>
          <Textarea.Field
            disabled={status === "APPROVED"}
            maxLength={800}
            className="focus-visible:ring-primary-600 min-h-[300px] w-full resize-none rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-[15px] leading-[1.6em] text-gray-900 ring ring-transparent outline-none md:min-h-[450px]"
            placeholder="활동 내용을 입력해주세요."
          />
        </Textarea.Root>

        <Textarea.Root
          value={formState.impression}
          onValueChange={(value) => {
            setFormState((prev) => ({ ...prev, impression: value }));
          }}
        >
          <div className="mb-2 flex justify-between">
            <Textarea.Label className="text-sm font-medium text-gray-700">소감</Textarea.Label>
            <div className="text-xs text-gray-500">
              <Textarea.Count /> / 200
            </div>
          </div>
          <Textarea.Field
            disabled={status === "APPROVED"}
            maxLength={200}
            className="focus-visible:ring-primary-600 min-h-[130px] w-full resize-none rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-[15px] leading-[1.6em] text-gray-900 ring ring-transparent outline-none"
            placeholder="소감을 작성해주세요."
          />
        </Textarea.Root>

        {hasTask && !hasUploadedFile && !fileState && <FileUploadArea onFileSelect={(file) => setFileState(file)} />}

        {file.link && (
          <div className="flex gap-x-2">
            <Button
              disabled={isLoading}
              className="w-full grow overflow-hidden rounded-lg bg-gray-50 hover:bg-gray-100"
              onClick={() => {
                window.location.href = `/kdual/${file.link}`;
              }}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2.5 truncate text-sm font-medium whitespace-nowrap text-gray-900">
                  <FileArchive className="shrink-0 text-gray-500" size={16} />
                  {file.label}
                </div>

                <Label color="primary">다운로드</Label>
              </div>
            </Button>
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild hidden={isApproved}>
                <Button
                  className="bg-danger-50! hover:bg-danger-100! text-danger-600! flex w-12 min-w-0 shrink-0 items-center justify-center rounded-lg px-3"
                  disabled={isLoading || isApproved}
                  loading={isDeleting}
                  color="danger"
                  spinnerColor="danger"
                >
                  <Trash2 size={16} />
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-black/40" />
                <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-1/2">
                  <Card.Root className="w-screen max-w-xs p-6 md:max-w-md">
                    <Card.Header>
                      <Card.Title>파일 삭제</Card.Title>
                    </Card.Header>
                    <div className="mb-4 text-gray-800">
                      정말로
                      <span className="bg-danger-100 text-danger-500 mx-1 rounded-md px-1 py-1 font-medium">{file.label}</span> 파일을
                      삭제하시겠습니까?
                      <div className="mt-2 text-sm text-gray-600">삭제시 현재 작업중인 내용이 사라집니다.</div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <AlertDialog.Cancel asChild>
                        <Button className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100">취소</Button>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action asChild>
                        <Button
                          className="bg-danger-100 hover:bg-danger-200 text-danger-600 rounded-lg px-4 py-2 text-sm font-medium"
                          loading={isDeleting}
                          spinnerColor="danger"
                          onClick={async () => {
                            await deleteFile(file.fileId);
                            addToast({
                              status: "success",
                              title: "파일 삭제",
                              description: "파일이 삭제되었습니다.",
                            });
                          }}
                        >
                          삭제
                        </Button>
                      </AlertDialog.Action>
                    </div>
                  </Card.Root>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
        )}

        {fileState && (
          <Button className="rounded-lg bg-gray-50 hover:bg-gray-100" onClick={() => setFileState(null)}>
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2.5 text-sm font-medium text-gray-900">
                <FileArchive className="text-gray-500" size={16} />
                {fileState.name}
              </div>

              <Label color="danger">삭제</Label>
            </div>
          </Button>
        )}
        {!isApproved && (
          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              loading={isSaving}
              className="bg-primary-600 hover:bg-primary-700 w-full rounded-lg px-4 py-3 text-sm font-medium text-white md:w-auto md:py-2"
            >
              저장
            </Button>
          </div>
        )}
      </form>
    </Card.Root>
  );
};

export default EditForm;
