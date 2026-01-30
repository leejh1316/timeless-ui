const MOCK_KEY = "k-dual-mock";

function mockInit() {
  const mockValue = localStorage.getItem(MOCK_KEY);
  if (mockValue === null) {
    localStorage.setItem(MOCK_KEY, "false");
  }
}
function mockClear() {
  localStorage.removeItem(MOCK_KEY);
}
function getMockMode() {
  return localStorage.getItem(MOCK_KEY) === "true";
}
function toggleMockMode() {
  const isMock = getMockMode();
  localStorage.setItem(MOCK_KEY, isMock ? "false" : "true");
}

export { mockInit, mockClear, getMockMode, toggleMockMode };
