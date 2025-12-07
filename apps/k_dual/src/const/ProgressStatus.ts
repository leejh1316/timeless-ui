import { ProgressStatus } from "@src/api/schema/lms/lms-progress";
enum ProgressStatusEnum {
  PARTIAL = "PARTIAL",
  EMPTY = "EMPTY",
  COMPLETED = "COMPLETED",
}
const ProgressStatusLabel = {
  [ProgressStatusEnum.PARTIAL]: "부분작성",
  [ProgressStatusEnum.EMPTY]: "미작성",
  [ProgressStatusEnum.COMPLETED]: "작성완료",
};
export { ProgressStatusEnum, ProgressStatusLabel };
