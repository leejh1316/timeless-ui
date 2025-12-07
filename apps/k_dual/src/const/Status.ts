import { Status } from "@src/api/schema/lms/lms-main";

enum StatusEnum {
  IN_PROGRESS = "in-progress",
  NOT_STARTED = "not-started",
  COMPLETED = "completed",
}
const StatusLabel = {
  [StatusEnum.IN_PROGRESS]: "진행중",
  [StatusEnum.NOT_STARTED]: "미진행",
  [StatusEnum.COMPLETED]: "완료",
};
export { StatusEnum, StatusLabel };
