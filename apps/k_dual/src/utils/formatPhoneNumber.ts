export function formatPhoneNumber(value: string): string {
  if (!value) return "";

  // 1. 숫자만 남기고 모두 제거 (하이픈, 공백 등 제거)
  const clean = value.replace(/\D/g, "");

  // 2. 11자리 (010-1234-5678)
  if (clean.length === 11) {
    return clean.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }

  // 3. 10자리 (서울 02-1234-5678 또는 구형 011-123-4567)
  if (clean.length === 10) {
    if (clean.startsWith("02")) {
      return clean.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
    }
    return clean.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }

  // 패턴에 안 맞으면 그냥 원본 반환
  return value;
}
