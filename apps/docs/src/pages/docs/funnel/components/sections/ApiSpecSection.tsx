import { Document } from "@src/components/ui/Document";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────────────────────
 * API Spec Section
 * ──────────────────────────────────────────────────────────────*/

const rootProps: PropsTableRow[] = [
  {
    name: "funnel",
    type: "ReturnType<typeof useFunnel>",
    description: "useFunnel 훅의 반환값으로, 퍼널의 상태와 제어 함수를 포함합니다.",
  },
];

const stepProps: PropsTableRow[] = [
  {
    name: "step",
    type: "string",
    description: "현재 단계를 식별하는 고유한 이름입니다. useFunnel의 steps 배열에 정의된 값과 일치해야 합니다.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    description: "해당 단계에서 렌더링할 콘텐츠입니다.",
  },
];

const nextProps: PropsTableRow[] = [
  {
    name: "stepData",
    type: "object | undefined",
    description: "다음 단계로 이동할 때 저장할 현재 단계의 데이터입니다.",
  },
  {
    name: "onClick",
    type: "(e: React.MouseEvent<HTMLButtonElement>) => void",
    description: "클릭 이벤트 핸들러입니다. 내부 동작 이후 추가로 실행됩니다.",
  },
];

const prevProps: PropsTableRow[] = [
  {
    name: "stepData",
    type: "object | undefined",
    description: "이전 단계로 이동할 때 저장할 현재 단계의 데이터입니다.",
  },
  {
    name: "onClick",
    type: "(e: React.MouseEvent<HTMLButtonElement>) => void",
    description: "클릭 이벤트 핸들러입니다. 내부 동작 이후 추가로 실행됩니다.",
  },
];

const cancelProps: PropsTableRow[] = [
  {
    name: "isResettable",
    type: "boolean",
    defaultValue: "true",
    description: "취소 시 퍼널을 초기 상태로 리셋할지 여부를 결정합니다.",
  },
  {
    name: "onClick",
    type: "(e: React.MouseEvent<HTMLButtonElement>) => void",
    description: "클릭 이벤트 핸들러입니다. 내부 동작 이후 추가로 실행됩니다.",
  },
];

const completeProps: PropsTableRow[] = [
  {
    name: "onClick",
    type: "(e: React.MouseEvent<HTMLButtonElement>) => void",
    description: "클릭 이벤트 핸들러입니다. 내부 동작 이후 추가로 실행됩니다.",
  },
];

const useFunnelParamsProps: PropsTableRow[] = [
  {
    name: "steps",
    type: "readonly TStep[]",
    description: "퍼널의 모든 단계를 순서대로 정의하는 배열입니다. readonly로 선언하는 것을 권장합니다.",
  },
  {
    name: "step",
    type: "TStep",
    description: "외부에서 제어하는 현재 단계입니다. 제공하지 않으면 내부 상태로 관리됩니다.",
  },
  {
    name: "defaultStep",
    type: "TStep",
    description: "초기 단계를 지정합니다. 기본값은 steps 배열의 첫 번째 요소입니다.",
  },
  {
    name: "defaultData",
    type: "TData",
    defaultValue: "{}",
    description: "퍼널 데이터의 초기값입니다.",
  },
  {
    name: "onStepChange",
    type: "(step: TStep) => void",
    description: "단계가 변경될 때 호출되는 콜백 함수입니다.",
  },
  {
    name: "onComplete",
    type: "(finalData: TData) => void",
    description: "퍼널이 완료될 때 호출되는 콜백 함수로, 수집된 모든 데이터를 인자로 받습니다.",
  },
  {
    name: "onNext",
    type: "() => void",
    description: "다음 단계로 이동할 때 호출되는 콜백 함수입니다.",
  },
  {
    name: "onPrev",
    type: "() => void",
    description: "이전 단계로 이동할 때 호출되는 콜백 함수입니다.",
  },
  {
    name: "onCancel",
    type: "() => void",
    description: "퍼널이 취소될 때 호출되는 콜백 함수입니다.",
  },
];

const useFunnelReturnProps: PropsTableRow[] = [
  {
    name: "currentStep",
    type: "TStep",
    description: "현재 활성화된 단계입니다.",
  },
  {
    name: "data",
    type: "TData",
    description: "퍼널 전체에서 수집된 데이터입니다.",
  },
  {
    name: "steps",
    type: "readonly TStep[]",
    description: "퍼널의 모든 단계 배열입니다.",
  },
  {
    name: "goNext",
    type: "(stepData?: Partial<TData>) => void",
    description: "다음 단계로 이동합니다. stepData를 전달하면 현재 단계의 데이터를 저장합니다.",
  },
  {
    name: "goPrev",
    type: "(stepData?: Partial<TData>) => void",
    description: "이전 단계로 이동합니다. stepData를 전달하면 현재 단계의 데이터를 저장합니다.",
  },
  {
    name: "goTo",
    type: "(step: TStep) => void",
    description: "특정 단계로 직접 이동합니다.",
  },
  {
    name: "cancel",
    type: "() => void",
    description: "퍼널을 취소합니다. onCancel 콜백을 호출합니다.",
  },
  {
    name: "reset",
    type: "() => void",
    description: "퍼널을 초기 상태로 리셋합니다.",
  },
  {
    name: "complete",
    type: "() => void",
    description: "현재 수집된 데이터와 함께 onComplete 콜백을 호출합니다.",
  },
  {
    name: "updateData",
    type: "(newData: Partial<TData>) => void",
    description: "퍼널 데이터를 업데이트합니다.",
  },
  {
    name: "hasPrev",
    type: "boolean",
    description: "이전 단계가 존재하는지 여부입니다.",
  },
  {
    name: "hasNext",
    type: "boolean",
    description: "다음 단계가 존재하는지 여부입니다.",
  },
  {
    name: "isLastStep",
    type: "boolean",
    description: "현재 단계가 마지막 단계인지 여부입니다.",
  },
  {
    name: "currentStepIndex",
    type: "number",
    description: "현재 단계의 인덱스입니다. 0부터 시작합니다.",
  },
];

const attributeRows: AttributeTableRow[] = [
  {
    name: "data-active",
    value: "boolean",
    description: "Funnel.Step이 현재 활성화된 상태인지 나타냅니다.",
  },
];

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>
      Funnel 컴포넌트와 useFunnel 훅의 전체 속성 및 타입 명세입니다. 각 컴포넌트는 명시된 속성 외에도 해당 HTML 요소의 기본 속성을 모두
      지원합니다.
      <br />
      이후 다른 컴포넌트에 funnel을 prop으로 전달하거나
      <InlineCode>useFunnelContext</InlineCode> 훅을 사용하여 퍼널 상태에 접근할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading2 mb={4}>useFunnel</Document.Heading2>
    <Document.Paragraph mb={4}>
      퍼널의 상태와 제어 함수를 제공하는 훅입니다. 제네릭 타입 <InlineCode>TStep</InlineCode>은 단계의 타입을,{" "}
      <InlineCode>TData</InlineCode>는 수집할 데이터의 타입을 지정합니다.
    </Document.Paragraph>

    <Document.Heading3>Parameters</Document.Heading3>
    <PropsTable rows={useFunnelParamsProps} className="mb-8" />

    <Document.Heading3>Returns</Document.Heading3>
    <PropsTable rows={useFunnelReturnProps} className="mb-10" />

    <Document.Heading2 mb={4}>Funnel.Root</Document.Heading2>
    <Document.Paragraph mb={4}>
      퍼널의 루트 컨테이너로, <InlineCode>useFunnel</InlineCode> 훅의 반환값을 전달받아 하위 컴포넌트들에게 퍼널 상태를 제공합니다.
    </Document.Paragraph>
    <PropsTable rows={rootProps} className="mb-10" />

    <Document.Heading2 mb={4}>Funnel.Step</Document.Heading2>
    <Document.Paragraph mb={4}>
      각 단계의 콘텐츠를 렌더링하는 컴포넌트입니다. <InlineCode>{"<div>"}</InlineCode> 요소의 모든 속성을 지원합니다.
    </Document.Paragraph>
    <PropsTable rows={stepProps} className="mb-10" />

    <Document.Heading2 mb={4}>Funnel.Next</Document.Heading2>
    <Document.Paragraph mb={4}>
      다음 단계로 이동하는 버튼 컴포넌트입니다. <InlineCode>{"<button>"}</InlineCode> 요소의 모든 속성을 지원합니다.
    </Document.Paragraph>
    <PropsTable rows={nextProps} className="mb-10" />

    <Document.Heading2 mb={4}>Funnel.Prev</Document.Heading2>
    <Document.Paragraph mb={4}>
      이전 단계로 이동하는 버튼 컴포넌트입니다. <InlineCode>{"<button>"}</InlineCode> 요소의 모든 속성을 지원합니다. 첫 번째 단계에서는
      자동으로 비활성화됩니다.
    </Document.Paragraph>
    <PropsTable rows={prevProps} className="mb-10" />

    <Document.Heading2 mb={4}>Funnel.Cancel</Document.Heading2>
    <Document.Paragraph mb={4}>
      퍼널을 취소하는 버튼 컴포넌트입니다. <InlineCode>{"<button>"}</InlineCode> 요소의 모든 속성을 지원합니다.
    </Document.Paragraph>
    <PropsTable rows={cancelProps} className="mb-10" />

    <Document.Heading2 mb={4}>Funnel.Complete</Document.Heading2>
    <Document.Paragraph mb={4}>
      퍼널을 완료하는 버튼 컴포넌트입니다. <InlineCode>{"<button>"}</InlineCode> 요소의 모든 속성을 지원합니다.
    </Document.Paragraph>
    <PropsTable rows={completeProps} className="mb-10" />

    <Document.Heading2 mb={4}>Data Attributes</Document.Heading2>
    <AttributeTable rows={attributeRows} className="mb-10" />
  </section>
);

export { ApiSpecSection };
