import { Document } from "@src/components/ui/Document";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { InlineCode } from "@src/components/ui/InlineCode";

const rootProps: PropsTableRow[] = [
  { name: "value", type: "number", defaultValue: "—", description: "카운터의 현재 값입니다. (Controlled)" },
  { name: "defaultValue", type: "number", defaultValue: "0", description: "카운터의 초기 값입니다. (Uncontrolled)" },
  { name: "onValueChange", type: "(value: number) => void", defaultValue: "—", description: "값이 변경될 때 호출되는 콜백함수입니다." },
  { name: "minValue", type: "number", defaultValue: "—", description: "입력 가능한 최소값입니다." },
  { name: "maxValue", type: "number", defaultValue: "—", description: "입력 가능한 최대값입니다." },
  { name: "step", type: "number", defaultValue: "1", description: "증가 및 감소 단계의 크기입니다." },
  { name: "disabled", type: "boolean", defaultValue: "false", description: "카운터 전체를 비활성화합니다." },
  { name: "name", type: "string", defaultValue: "—", description: "내부 hidden input에 적용될 name 속성입니다. 폼 전송 시 사용됩니다." },
  { name: "onIncrement", type: "(value: number) => void", defaultValue: "—", description: "증가 이벤트 발생 시 호출되는 콜백입니다." },
  { name: "onDecrement", type: "(value: number) => void", defaultValue: "—", description: "감소 이벤트 발생 시 호출되는 콜백입니다." },
];

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>전체 속성 및 타입 명세입니다.</Document.Paragraph>

    <Document.Heading2>Counter.Root</Document.Heading2>
    <PropsTable rows={rootProps} />

    <Document.Heading2>Counter.Value</Document.Heading2>
    <Document.Paragraph mb={4}>
      HTML <InlineCode>span</InlineCode> 태그의 속성을 상속받습니다.
    </Document.Paragraph>

    <Document.Heading2>Counter.Increment</Document.Heading2>
    <Document.Paragraph mb={4}>
      <InlineCode>Button</InlineCode> 컴포넌트의 속성을 상속받으며, <InlineCode>onClick</InlineCode> 이벤트는 내부 로직에 의해 관리됩니다.
    </Document.Paragraph>

    <Document.Heading2>Counter.Decrement</Document.Heading2>
    <Document.Paragraph mb={4}>
      <InlineCode>Button</InlineCode> 컴포넌트의 속성을 상속받으며, <InlineCode>onClick</InlineCode> 이벤트는 내부 로직에 의해 관리됩니다.
    </Document.Paragraph>
  </section>
);

export { ApiSpecSection };
