enum ApprovalStatusEnum {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
}
const ApprovalStatusLabel = {
  [ApprovalStatusEnum.APPROVED]: "승인",
  [ApprovalStatusEnum.PENDING]: "미승인",
};
export { ApprovalStatusEnum, ApprovalStatusLabel };
