import { CodeBlock } from "@src/components/common/CodeBlock";
import { ParameterTable, type ParameterTableRow } from "@src/components/common/ParameterTable";
import { ReturnTable, type ReturnTableRow } from "@src/components/common/ReturnTable";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";

const paramRows: ParameterTableRow[] = [
  {
    name: "itemCount",
    type: "number",
    defaultValue: "—",
    description: "[itemCount 모드] 네비게이션할 아이템의 총 개수입니다. 지정 시 selector는 사용할 수 없습니다.",
  },
  {
    name: "selector",
    type: "string",
    defaultValue: "—",
    description: "[selector 모드] 네비게이션 대상 요소를 선택하는 CSS 셀렉터입니다. 지정 시 itemCount는 사용할 수 없습니다.",
  },
  {
    name: "onNavigate",
    type: "OnNavigateFn",
    defaultValue: "—",
    description:
      "화살표 키로 항목 이동 시 호출되는 콜백 함수입니다. 이동 방향, 현재/이전 아이템 및 인덱스, 원본 키보드 이벤트 정보를 제공합니다.",
  },
  {
    name: "orientation",
    type: '"horizontal" | "vertical" | "both"',
    defaultValue: "'both'",
    description: "네비게이션 방향을 지정합니다. horizontal은 좌우 화살표, vertical은 상하 화살표, both는 모든 화살표 키를 활성화합니다.",
  },
  {
    name: "loop",
    type: "boolean",
    defaultValue: "true",
    description: "true일 경우 첫 번째 항목에서 위로 이동하면 마지막 항목으로, 마지막 항목에서 아래로 이동하면 첫 번째 항목으로 순환합니다.",
  },
  {
    name: "clickOnNavigate",
    type: "boolean",
    defaultValue: "false",
    description: "true일 경우 화살표 키로 항목 이동 시 해당 항목의 클릭 이벤트도 자동으로 발생시킵니다.",
  },
  {
    name: "initialIndex",
    type: "number",
    defaultValue: "-1",
    description: "초기 활성화 인덱스를 지정합니다. -1은 비활성화 상태를 의미합니다.",
  },
  {
    name: "isReady",
    type: "boolean",
    defaultValue: "true",
    description: "[selector 모드 전용] DOM이 준비되었는지를 나타냅니다. false일 경우 네비게이션이 비활성화됩니다.",
  },
];

const returnRows: ReturnTableRow[] = [
  {
    name: "rootRef",
    type: "RefObject<any>",
    description: "루트 요소에 할당할 ref입니다. 키보드 이벤트를 캡처하고 자식 요소들을 찾기 위해 사용됩니다.",
  },
  {
    name: "activeIndex",
    type: "number",
    description: "현재 활성화된 아이템의 인덱스입니다. -1일 경우 활성화된 아이템이 없음을 의미합니다.",
  },
  {
    name: "setActiveIndex",
    type: "React.Dispatch<React.SetStateAction<number>>",
    description: "활성화된 아이템의 인덱스를 수동으로 변경하는 함수입니다.",
  },
  {
    name: "activeElement",
    type: "HTMLElement | null",
    description: "현재 활성화된 아이템의 DOM 요소입니다. 활성화된 아이템이 없으면 null입니다.",
  },
  {
    name: "getItemProps",
    type: "(props: GetItemPropsOptions<E>) => ComponentPropsWithRef<E>",
    description:
      "[itemCount 모드 전용] 개별 아이템에 필요한 props(ref, onClick, data-arrow-navigation-active-item 등)를 주입하는 함수입니다.",
  },
  {
    name: "handleKeyDown",
    type: "(event: React.KeyboardEvent) => void",
    description: "루트 요소의 onKeyDown 이벤트에 연결할 핸들러입니다. 화살표 키 입력을 처리합니다.",
  },
];

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>
      <InlineCode>useArrowNavigation</InlineCode> Hook의 매개변수 및 반환값 명세입니다.
    </Document.Paragraph>

    <Document.Heading2>Parameters</Document.Heading2>
    <Document.Paragraph mb={4}>
      <InlineCode>useArrowNavigation</InlineCode>은 두 가지 모드를 지원합니다. <InlineCode>itemCount</InlineCode> 모드와{" "}
      <InlineCode>selector</InlineCode>모드가 있으며, 둘 중 하나만 지정해야 합니다.
    </Document.Paragraph>
    <ParameterTable rows={paramRows} className="mb-10" />

    <Document.Heading2>Return Values</Document.Heading2>
    <Document.Paragraph mb={4}>
      <InlineCode>itemCount</InlineCode> 모드에서는 모든 반환값을 사용할 수 있으며, <InlineCode>selector</InlineCode> 모드에서는{" "}
      <InlineCode>getItemProps</InlineCode>를 제외한 나머지 값들을 사용할 수 있습니다.
    </Document.Paragraph>
    <ReturnTable rows={returnRows} className="mb-10" />

    <Document.Heading2>타입 정의</Document.Heading2>
    <Document.Paragraph mb={4}>Hook에서 사용되는 주요 커스텀 타입 정의입니다.</Document.Paragraph>

    <Document.Heading3>OnNavigateFn</Document.Heading3>
    <Document.Paragraph mb={4}>화살표 키로 항목 이동 시 호출되는 콜백 함수의 타입입니다.</Document.Paragraph>
    <CodeBlock code={onNavigateFnCode} className="mb-8" language="typescript" />

    <Document.Heading3>GetItemPropsOptions</Document.Heading3>
    <Document.Paragraph mb={4}>
      <InlineCode>getItemProps</InlineCode> 함수에 전달하는 옵션 타입입니다. <InlineCode>index</InlineCode>는 필수이며, 추가로 해당 요소
      타입의 모든 props를 전달할 수 있습니다.
    </Document.Paragraph>
    <CodeBlock code={getItemPropsOptionsCode} className="mb-10" language="typescript" />
  </section>
);

const onNavigateFnCode = `type OnNavigateFn = (details: {
  direction: "next" | "prev"; // 이동 방향
  activeItem: HTMLElement; // 현재 활성화된 아이템
  prevItem: HTMLElement | null; // 이전 활성화된 아이템 (없을 수도 있음)
  activeIndex: number; // 현재 활성화된 인덱스
  prevIndex: number; // 이전 활성화 인덱스 (-1일 수도 있음)
  event: React.KeyboardEvent; // 원본 키보드 이벤트
}) => void;`;

const getItemPropsOptionsCode = `type GetItemPropsOptions<E extends React.ElementType = "div"> = 
  ComponentPropsWithRef<E> & { 
    index: number; // 해당 아이템의 인덱스 (필수)
  };`;

export { ApiSpecSection };
