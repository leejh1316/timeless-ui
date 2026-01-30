const MOCK_KEY = "k-dual-mock";

function mockInit() {
  const mockValue = sessionStorage.getItem(MOCK_KEY);
  if (mockValue === null) {
    sessionStorage.setItem(MOCK_KEY, "false");
  }
}
function mockClear() {
  sessionStorage.removeItem(MOCK_KEY);
}
function getMockMode() {
  return sessionStorage.getItem(MOCK_KEY) === "true";
}
function setMockMode(value: boolean) {
  sessionStorage.setItem(MOCK_KEY, value ? "true" : "false");
}
export { mockInit, mockClear, getMockMode, setMockMode };
