import { Document } from "@src/components/ui/Document";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";
import { InlineCode } from "@src/components/ui/InlineCode";
import { CodeBlock } from "@src/components/common/CodeBlock";

/* ──────────────────────────────────────────────
   API Spec Section
   ────────────────────────────────────────────── */

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>
      FileUpload 컴포넌트의 전체 속성 및 타입 명세입니다. 각 하위 컴포넌트가 제공하는 props와 data attributes를 확인할 수 있습니다.
    </Document.Paragraph>

    {/* Root */}
    <Document.Heading2 mb={4}>FileUpload.Root</Document.Heading2>
    <Document.Paragraph mb={4}>파일 업로드의 최상위 컨테이너입니다. 파일 선택, 유효성 검사, 상태 관리를 담당합니다.</Document.Paragraph>
    <PropsTable rows={rootProps} className="mb-10" />

    {/* Trigger */}
    <Document.Heading2 mb={4}>FileUpload.Trigger</Document.Heading2>
    <Document.Paragraph mb={4}>파일 선택 대화상자를 여는 버튼입니다. Button 컴포넌트의 모든 props를 상속받습니다.</Document.Paragraph>
    <PropsTable rows={triggerProps} className="mb-4" />
    <AttributeTable rows={triggerAttributes} className="mb-10" />

    {/* DropZone */}
    <Document.Heading2 mb={4}>FileUpload.DropZone</Document.Heading2>
    <Document.Paragraph mb={4}>드래그 앤 드롭 영역을 제공하는 컴포넌트입니다.</Document.Paragraph>
    <AttributeTable rows={dropZoneAttributes} className="mb-10" />

    {/* List */}
    <Document.Heading2 mb={4}>FileUpload.List</Document.Heading2>
    <Document.Paragraph mb={4}>파일 목록을 렌더링하는 컨테이너입니다.</Document.Paragraph>
    <PropsTable rows={listProps} className="mb-10" />

    {/* Item */}
    <Document.Heading2 mb={4}>FileUpload.Item</Document.Heading2>
    <Document.Paragraph mb={4}>개별 파일 아이템을 표시하는 컴포넌트입니다.</Document.Paragraph>
    <PropsTable rows={itemProps} className="mb-10" />

    {/* ItemPreview */}
    <Document.Heading2 mb={4}>FileUpload.ItemPreview</Document.Heading2>
    <Document.Paragraph mb={4}>이미지 파일의 미리보기를 표시합니다. Image 컴포넌트를 기반으로 동작합니다.</Document.Paragraph>
    <PropsTable rows={itemPreviewProps} className="mb-10" />

    {/* ItemName */}
    <Document.Heading2 mb={4}>FileUpload.ItemName</Document.Heading2>
    <Document.Paragraph mb={4}>파일명을 자동으로 표시하는 컴포넌트입니다. 별도의 필수 props는 없습니다.</Document.Paragraph>
    <Document.Paragraph mb={10}>
      기본 HTML <InlineCode>span</InlineCode> 요소의 모든 속성을 상속받습니다.
    </Document.Paragraph>

    {/* ItemSize */}
    <Document.Heading2 mb={4}>FileUpload.ItemSize</Document.Heading2>
    <Document.Paragraph mb={4}>파일 크기를 포맷된 형식으로 표시합니다.</Document.Paragraph>
    <PropsTable rows={itemSizeProps} className="mb-10" />

    {/* ItemDeleteTrigger */}
    <Document.Heading2 mb={4}>FileUpload.ItemDeleteTrigger</Document.Heading2>
    <Document.Paragraph mb={4}>개별 파일을 삭제하는 버튼입니다. Button 컴포넌트를 기반으로 동작합니다.</Document.Paragraph>
    <PropsTable rows={itemDeleteTriggerProps} className="mb-4" />
    <AttributeTable rows={itemDeleteTriggerAttributes} className="mb-10" />

    {/* Custom Types Section */}
    <Document.Heading2 mb={4}>커스텀 타입</Document.Heading2>
    <Document.Paragraph mb={6}>
      FileUpload 컴포넌트에서 사용되는 특수한 타입들입니다. 이 타입들은 <InlineCode>@timeless-ui/react</InlineCode>에서 export되어 사용할 수
      있습니다.
    </Document.Paragraph>

    <Document.Heading3>ErrorCode</Document.Heading3>
    <Document.Paragraph mb={4}>파일 업로드 실패 시 발생할 수 있는 오류 코드입니다.</Document.Paragraph>
    <CodeBlock code={errorCodeType} language="typescript" className="mb-8" />

    <Document.Heading3>FileRejection</Document.Heading3>
    <Document.Paragraph mb={4}>유효성 검사에 실패한 파일의 정보를 담는 객체입니다.</Document.Paragraph>
    <CodeBlock code={fileRejectionType} language="typescript" className="mb-8" />

    <Document.Heading3>ByteStandard</Document.Heading3>
    <Document.Paragraph mb={4}>파일 크기 표시에 사용할 바이트 단위 기준입니다.</Document.Paragraph>
    <CodeBlock code={byteStandardType} language="typescript" className="mb-4" />
    <Document.Paragraph mb={8}>
      <InlineCode>'si'</InlineCode>는 1000 기반 (KB = 1000 bytes), <InlineCode>'iec'</InlineCode>는 1024 기반 (KiB = 1024 bytes) 단위를
      사용합니다.
    </Document.Paragraph>

    <Document.Heading3>FileSizeUnit</Document.Heading3>
    <Document.Paragraph mb={4}>파일 크기 단위입니다.</Document.Paragraph>
    <CodeBlock code={fileSizeUnitType} language="typescript" className="mb-8" />

    <Document.Heading3>MaxSizeOptions</Document.Heading3>
    <Document.Paragraph mb={4}>
      파일의 최대 크기를 지정하는 객체 형식입니다. 숫자와 단위를 분리하여 직관적으로 제한을 설정할 수 있습니다.
    </Document.Paragraph>
    <CodeBlock code={maxSizeOptionsType} language="typescript" className="mb-8" />

    <Document.Heading3>MaxSizeProp</Document.Heading3>
    <Document.Paragraph mb={4}>
      <InlineCode>maxSize</InlineCode> prop에 전달할 수 있는 타입입니다. 바이트 단위의 숫자 또는 MaxSizeOptions 객체를 사용할 수 있습니다.
    </Document.Paragraph>
    <CodeBlock code={maxSizePropType} language="typescript" className="mb-4" />
    <Document.Paragraph mb={8}>
      예시: <InlineCode>5242880</InlineCode> 또는 <InlineCode>{"{ value: 5, unit: 'MB' }"}</InlineCode>
    </Document.Paragraph>
  </section>
);

/* ──────────────────────────────────────────────
   Props Data
   ────────────────────────────────────────────── */

const rootProps: PropsTableRow[] = [
  {
    name: "value",
    type: "File[]",
    defaultValue: "—",
    description: "제어 모드에서 사용할 파일 배열",
  },
  {
    name: "defaultValue",
    type: "File[]",
    defaultValue: "[]",
    description: "비제어 모드에서 사용할 초기 파일 배열",
  },
  {
    name: "onValueChange",
    type: "(files: File[]) => void",
    defaultValue: "—",
    description: "파일 목록이 변경될 때 호출되는 콜백",
  },
  {
    name: "onFileUpload",
    type: "(file: File) => void",
    defaultValue: "—",
    description: "개별 파일이 추가될 때 호출되는 콜백",
  },
  {
    name: "onFileDelete",
    type: "(file: File) => void",
    defaultValue: "—",
    description: "개별 파일이 삭제될 때 호출되는 콜백",
  },
  {
    name: "name",
    type: "string",
    defaultValue: "—",
    description: "폼 제출 시 사용될 input의 name 속성",
  },
  {
    name: "accept",
    type: "string",
    defaultValue: "—",
    description: "허용할 파일 타입 (예: 'image/*', '.pdf,.doc')",
  },
  {
    name: "multiple",
    type: "boolean",
    defaultValue: "true",
    description: "여러 파일 선택 허용 여부",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "비활성화 상태",
  },
  {
    name: "maxSize",
    type: "MaxSizeProp",
    defaultValue: "Infinity",
    description: "개별 파일의 최대 크기 (바이트 또는 MaxSizeOptions 객체)",
  },
  {
    name: "maxFiles",
    type: "number",
    defaultValue: "Infinity",
    description: "업로드 가능한 최대 파일 개수",
  },
  {
    name: "setRejectMessage",
    type: "Partial<Record<ErrorCode, string>>",
    defaultValue: "—",
    description: "오류 메시지 커스터마이징",
  },
  {
    name: "onReject",
    type: "(rejections: FileRejection[]) => void",
    defaultValue: "—",
    description: "파일 검증 실패 시 호출되는 콜백",
  },
  {
    name: "allowDuplicates",
    type: "boolean",
    defaultValue: "false",
    description: "중복 파일 허용 여부",
  },
];

const triggerProps: PropsTableRow[] = [
  {
    name: "onClick",
    type: "React.MouseEventHandler<HTMLButtonElement>",
    defaultValue: "—",
    description: "클릭 이벤트 핸들러",
  },
];

const triggerAttributes: AttributeTableRow[] = [
  { name: "data-disabled", value: "boolean | undefined", description: "버튼이 비활성화 상태일 때 존재" },
  { name: "data-state", value: "'open' | 'closed'", description: "파일 선택 대화상자의 열림/닫힘 상태" },
];

const dropZoneProps: PropsTableRow[] = [
  {
    name: "onDrop",
    type: "React.DragEventHandler<HTMLDivElement>",
    defaultValue: "—",
    description: "드롭 이벤트 핸들러",
  },
  {
    name: "onDragEnter",
    type: "React.DragEventHandler<HTMLDivElement>",
    defaultValue: "—",
    description: "드래그 진입 이벤트 핸들러",
  },
  {
    name: "onDragLeave",
    type: "React.DragEventHandler<HTMLDivElement>",
    defaultValue: "—",
    description: "드래그 벗어남 이벤트 핸들러",
  },
  {
    name: "onDragOver",
    type: "React.DragEventHandler<HTMLDivElement>",
    defaultValue: "—",
    description: "드래그 오버 이벤트 핸들러",
  },
];

const dropZoneAttributes: AttributeTableRow[] = [
  { name: "data-drag-over", value: "boolean | undefined", description: "파일이 드롭존 위에 드래그되고 있을 때 존재" },
  { name: "data-disabled", value: "boolean | undefined", description: "드롭존이 비활성화 상태일 때 존재" },
];

const listProps: PropsTableRow[] = [
  {
    name: "children",
    type: "React.ReactNode | ((files: File[]) => React.ReactNode)",
    defaultValue: "—",
    description: "파일 목록을 렌더링할 ReactNode 또는 파일 배열을 받는 렌더 함수",
  },
];

const itemProps: PropsTableRow[] = [
  {
    name: "file",
    type: "File",
    defaultValue: "—",
    description: "표시할 파일 객체 (필수)",
  },
  {
    name: "index",
    type: "number",
    defaultValue: "—",
    description: "파일 배열에서의 인덱스 (필수)",
  },
];

const itemPreviewProps: PropsTableRow[] = [
  {
    name: "width",
    type: "number | string",
    defaultValue: "—",
    description: "미리보기 이미지 너비",
  },
  {
    name: "height",
    type: "number | string",
    defaultValue: "—",
    description: "미리보기 이미지 높이",
  },
  {
    name: "fallback",
    type: "React.ReactNode",
    defaultValue: "—",
    description: "이미지가 아닌 파일일 때 표시할 대체 UI",
  },
];

const itemSizeProps: PropsTableRow[] = [
  {
    name: "decimals",
    type: "number",
    defaultValue: "2",
    description: "표시할 소수점 자릿수",
  },
  {
    name: "standard",
    type: "ByteStandard",
    defaultValue: "'iec'",
    description: "바이트 계산 기준 ('si' 또는 'iec')",
  },
];

const itemDeleteTriggerProps: PropsTableRow[] = [
  {
    name: "onClick",
    type: "React.MouseEventHandler<HTMLButtonElement>",
    defaultValue: "—",
    description: "클릭 이벤트 핸들러",
  },
  {
    name: "onDelete",
    type: "(file: File) => void",
    defaultValue: "—",
    description: "파일 삭제 전 호출되는 콜백",
  },
  {
    name: "stopOnDeletePropagation",
    type: "boolean",
    defaultValue: "false",
    description: "onDelete 콜백 실행 후 기본 삭제 동작을 중단할지 여부",
  },
];

const itemDeleteTriggerAttributes: AttributeTableRow[] = [
  { name: "data-disabled", value: "boolean | undefined", description: "버튼이 비활성화 상태일 때 존재" },
];

/* ──────────────────────────────────────────────
   Type Code Strings
   ────────────────────────────────────────────── */

const errorCodeType = `type ErrorCode = 
  | 'file-too-large' 
  | 'file-invalid-type' 
  | 'too-many-files' 
  | 'duplicate-file';`;

const fileRejectionType = `interface FileRejection {
  file: File;
  errors: {
    code: ErrorCode;
    message: string;
  }[];
}`;

const byteStandardType = `type ByteStandard = 'si' | 'iec';`;

const fileSizeUnitType = `type FileSizeUnit = 'Byte' | 'KB' | 'MB' | 'GB' | 'TB';`;

const maxSizeOptionsType = `interface MaxSizeOptions {
  value: number;
  unit: FileSizeUnit;
  standard?: ByteStandard;
}`;

const maxSizePropType = `type MaxSizeProp = number | MaxSizeOptions;`;

export { ApiSpecSection };
