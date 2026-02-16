import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { ExampleSection } from "./components/sections/ExampleSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";

/* ──────────────────────────────────────────────
   Button Documentation Page
   ────────────────────────────────────────────── */

const ButtonPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>Button</Document.Title>
    <Document.Description mb={10}>
      사용자의 클릭 인터랙션을 처리하는 기본 버튼 컴포넌트입니다. loading, disabled, pressed 상태를 자동으로 관리하며, 접근성을 준수합니다.
      다양한 스타일을 자유롭게 적용할 수 있습니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default ButtonPage;
