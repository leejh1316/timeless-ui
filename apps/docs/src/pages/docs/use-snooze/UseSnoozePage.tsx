import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";
import { ExampleSection } from "./components/sections/ExampleSection";

/* ──────────────────────────────────────────────
   useSnooze Documentation Page
   ────────────────────────────────────────────── */

const UseSnoozePage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>useSnooze</Document.Title>
    <Document.Description mb={10}>
      특정 기간 동안 UI 요소의 표시를 숨기는(스누즈) 기능을 제공하는 Hook입니다. 사용자가 스누즈를 활성화하면 지정된 기간 동안 해당 UI가
      표시되지 않으며, 로컬/세션 스토리지에 상태가 저장됩니다. 공지사항, 배너, 프로모션 팝업 등에 활용할 수 있습니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default UseSnoozePage;
