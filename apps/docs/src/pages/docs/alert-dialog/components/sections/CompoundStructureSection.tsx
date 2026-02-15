import { Document } from "@src/components/ui/Document";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { CodeBlock } from "@src/components/common/CodeBlock";
/* ──────────────────────────────────────────────
   Section Component
   ────────────────────────────────────────────── */

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      AlertDialog는 Compound Component 패턴으로 설계되어, 각 하위 컴포넌트를 조합하여 유연하게 구성할 수 있습니다. 아래는 AlertDialog를
      구성하는 모든 하위 컴포넌트의 역할입니다.
    </Document.Paragraph>

    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    {/* 기본적인 구조 사용법 */}
    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <Document.Paragraph mb={6}>
      아래 코드는 모든 하위 컴포넌트를 올바른 순서로 조립하는 기본 구조입니다. Root → Trigger → Portal → Overlay + Content → Cancel/Action
      순서로 중첩합니다.
    </Document.Paragraph>

    <CodeBlock code={anatomyCode} className="mb-8" />

    {/* 각 하위 컴포넌트 설명 */}
    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <div className="space-y-4">
      <div>
        <Document.Heading3>Root</Document.Heading3>
        <Document.Paragraph>
          AlertDialog의 모든 상태(열림/닫힘)를 관리하는 최상위 컨테이너입니다. open과 onOpenChange를 전달하면 Controlled 모드로 동작하고,
          생략하면 내부 상태로 자동 관리됩니다.
        </Document.Paragraph>
      </div>

      <div>
        <Document.Heading3>Trigger</Document.Heading3>
        <Document.Paragraph>
          다이얼로그를 여는 버튼 역할을 합니다. 클릭 시 Root의 상태가 open으로 전환됩니다. 비동기 onClick 핸들러를 지원하여 조건부로
          다이얼로그를 열 수 있습니다.
        </Document.Paragraph>
      </div>

      <div>
        <Document.Heading3>Portal</Document.Heading3>
        <Document.Paragraph>
          다이얼로그를 현재 DOM 위치가 아닌 body 최상단에 렌더링합니다. z-index 충돌이나 overflow: hidden에 의한 잘림 문제를 방지합니다.
        </Document.Paragraph>
      </div>

      <div>
        <Document.Heading3>Overlay</Document.Heading3>
        <Document.Paragraph>
          다이얼로그 뒤에 표시되는 반투명 배경입니다. data-status 속성("open" | "close")을 통해 페이드 인/아웃 애니메이션을 적용할 수
          있습니다. isDismissable이 true이면 클릭 시 다이얼로그가 닫힙니다.
        </Document.Paragraph>
      </div>

      <div>
        <Document.Heading3>Content</Document.Heading3>
        <Document.Paragraph>
          실제 다이얼로그 내용을 담는 영역입니다. 접근성을 위해 role="alertdialog"와 aria-modal="true"가 자동으로 적용되며, 열린 상태에서
          포커스가 내부에 트랩됩니다.
        </Document.Paragraph>
      </div>

      <div>
        <Document.Heading3>Cancel / Action</Document.Heading3>
        <Document.Paragraph>
          사용자의 응답을 처리하는 버튼입니다. Cancel은 취소 동작을, Action은 확인/실행 동작을 수행합니다. 두 버튼 모두 클릭 시 기본적으로
          다이얼로그가 닫히며, onClick에서 e.preventDefault()를 호출하면 닫힘을 방지하고 비동기 작업을 수행할 수 있습니다.
        </Document.Paragraph>
      </div>
    </div>
  </section>
);
/* ──────────────────────────────────────────────
   Anatomy Data
   ────────────────────────────────────────────── */

const anatomyItems = [
  { name: "AlertDialog.Root", desc: "상태를 관리하는 최상위 컨테이너" },
  { name: "AlertDialog.Trigger", desc: "다이얼로그를 여는 버튼" },
  { name: "AlertDialog.Portal", desc: "DOM 트리 밖에 렌더링하는 포털" },
  { name: "AlertDialog.Overlay", desc: "배경 오버레이 레이어" },
  { name: "AlertDialog.Content", desc: "다이얼로그 콘텐츠 영역" },
  { name: "AlertDialog.Cancel", desc: "취소 버튼 (닫힘 동작 포함)" },
  { name: "AlertDialog.Action", desc: "확인/실행 버튼 (닫힘 동작 포함)" },
];

/* ──────────────────────────────────────────────
   Code Snippets
   ────────────────────────────────────────────── */

const anatomyCode = `import { AlertDialog } from "@timeless-ui/ui";

<AlertDialog.Root>
  {/* 1. 다이얼로그를 여는 트리거 */}
  <AlertDialog.Trigger>열기</AlertDialog.Trigger>

  {/* 2. Portal로 DOM 최상단에 렌더링 */}
  <AlertDialog.Portal>

    {/* 3. 배경 오버레이 */}
    <AlertDialog.Overlay />

    {/* 4. 콘텐츠 영역 */}
    <AlertDialog.Content>
      <h3>제목</h3>
      <p>설명 텍스트</p>

      {/* 5. 액션 버튼들 */}
      <AlertDialog.Cancel>취소</AlertDialog.Cancel>
      <AlertDialog.Action>확인</AlertDialog.Action>
    </AlertDialog.Content>

  </AlertDialog.Portal>
</AlertDialog.Root>`;

export { CompoundStructureSection };
