enum ProgressStatusEnum {
  IN_PROGRESS = "IN_PROGRESS",
  NOT_STARTED = "NOT_STARTED",
  COMPLETED = "COMPLETED",
}
const ProgressStatusLabel = {
  [ProgressStatusEnum.IN_PROGRESS]: "부분작성",
  [ProgressStatusEnum.NOT_STARTED]: "미작성",
  [ProgressStatusEnum.COMPLETED]: "작성완료",
};
export { ProgressStatusEnum, ProgressStatusLabel };
