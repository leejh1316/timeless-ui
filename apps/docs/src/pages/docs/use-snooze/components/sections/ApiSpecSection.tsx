import { CodeBlock } from "@src/components/common/CodeBlock";
import { ParameterTable, type ParameterTableRow } from "@src/components/common/ParameterTable";
import { ReturnTable, type ReturnTableRow } from "@src/components/common/ReturnTable";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";

const paramRows: ParameterTableRow[] = [
  {
    name: "key",
    type: "string",
    defaultValue: "—",
    description: "스토리지에 저장할 고유 키입니다. 여러 스누즈 인스턴스를 구분하기 위해 사용됩니다.",
  },
  {
    name: "duration",
    type: '"day" | number',
    defaultValue: "—",
    description: "다시 보지 않을 기간입니다. 'day'를 지정하면 24시간, 숫자를 지정하면 해당 밀리초 단위로 스누즈됩니다.",
  },
  {
    name: "storageType",
    type: '"local" | "session"',
    defaultValue: "'local'",
    description: "스토리지 타입을 지정합니다. 'local'은 브라우저를 닫아도 유지되고, 'session'은 탭을 닫으면 초기화됩니다.",
  },
  {
    name: "autoReactivate",
    type: "boolean",
    defaultValue: "false",
    description: "duration이 지나면 자동으로 다시 활성화할지 여부입니다. true일 경우 duration 후 isActive가 자동으로 true로 변경됩니다.",
  },
];

const returnRows: ReturnTableRow[] = [
  {
    name: "isActive",
    type: "boolean",
    description: "UI를 활성화(표시)해야 하는지 여부입니다. true일 때 UI를 렌더링하고, false일 때는 숨깁니다.",
  },
  {
    name: "snooze",
    type: "() => void",
    description:
      "UI를 비활성화(스누즈)할 때 호출하는 함수입니다. 호출 시 현재 시간 + duration을 스토리지에 저장하고 isActive를 false로 변경합니다.",
  },
];

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>
      <InlineCode>useSnooze</InlineCode> Hook의 매개변수 및 반환값 명세입니다.
    </Document.Paragraph>

    <Document.Heading2>Parameters</Document.Heading2>
    <Document.Paragraph mb={4}>
      <InlineCode>useSnooze</InlineCode>는 <InlineCode>UseSnoozeOptions</InlineCode> 객체를 매개변수로 받습니다.
    </Document.Paragraph>
    <ParameterTable rows={paramRows} className="mb-10" />

    <Document.Heading2>Return Values</Document.Heading2>
    <Document.Paragraph mb={4}>
      Hook은 튜플 형태로 <InlineCode>[isActive, snooze]</InlineCode>를 반환합니다. 배열 구조 분해를 통해 사용할 수 있습니다.
    </Document.Paragraph>
    <ReturnTable rows={returnRows} className="mb-10" />

    <Document.Heading2>타입 정의</Document.Heading2>
    <Document.Paragraph mb={4}>Hook에서 사용되는 주요 커스텀 타입 정의입니다.</Document.Paragraph>

    <Document.Heading3>UseSnoozeOptions</Document.Heading3>
    <Document.Paragraph mb={4}>
      <InlineCode>useSnooze</InlineCode> Hook에 전달하는 옵션 객체의 타입입니다.
    </Document.Paragraph>
    <CodeBlock code={useSnoozeOptionsCode} className="mb-10" language="typescript" />
  </section>
);

const useSnoozeOptionsCode = `type UseSnoozeOptions = {
  key: string; // 스토리지에 저장할 고유 키
  duration: "day" | number; // 다시 보지 않을 기간, "day" 또는 밀리초 단위 숫자
  storageType?: "local" | "session"; // 로컬 스토리지 또는 세션 스토리지 (기본값: "local")
  autoReactivate?: boolean; // duration이 지나면 자동으로 다시 활성화 (기본값: false)
};`;

export { ApiSpecSection };
