import { Document } from "@src/components/ui/Document";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";

/* ──────────────────────────────────────────────
   Compound Structure Section
   ────────────────────────────────────────────── */

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      FileUpload은 Compound Component 패턴을 사용하여 각 하위 컴포넌트가 명확한 역할을 수행하며, 유연하게 조합할 수 있습니다. 여러
      컴포넌트를 조합하여 파일 업로드 인터페이스를 자유롭게 구성할 수 있습니다.
    </Document.Paragraph>
    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <Document.Paragraph mb={4}>FileUpload 컴포넌트의 기본 구조는 다음과 같습니다.</Document.Paragraph>
    <CodeBlock code={anatomyCode} className="mb-8" />

    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3 mt={6}>FileUpload.Root</Document.Heading3>
    <Document.Paragraph mb={4}>
      파일 업로드의 최상위 컨테이너로, 모든 상태와 로직을 관리합니다. <InlineCode>files</InlineCode>와{" "}
      <InlineCode>onFilesChange</InlineCode>를 통해 선택된 파일 목록을 제어하며, <InlineCode>maxSize</InlineCode>,{" "}
      <InlineCode>maxFiles</InlineCode>, <InlineCode>accept</InlineCode> 등의 제약 조건을 설정합니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>FileUpload.Trigger</Document.Heading3>
    <Document.Paragraph mb={4}>
      파일 선택 대화상자를 여는 버튼입니다. 클릭 시 시스템의 파일 선택 창을 열어 사용자가 파일을 선택할 수 있도록 합니다. 기본적으로 Button
      컴포넌트를 기반으로 동작합니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>FileUpload.DropZone</Document.Heading3>
    <Document.Paragraph mb={4}>
      드래그 앤 드롭 영역을 제공하는 컴포넌트입니다. 사용자가 파일을 드래그하여 이 영역에 놓으면 자동으로 파일이 추가됩니다.{" "}
      <InlineCode>data-dragging</InlineCode> 속성을 통해 드래그 중인 상태를 스타일링할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>FileUpload.List</Document.Heading3>
    <Document.Paragraph mb={4}>
      선택된 파일 목록을 렌더링하는 컨테이너입니다. children으로 렌더 함수를 받아 각 파일에 대한 UI를 생성합니다. 함수는{" "}
      <InlineCode>file</InlineCode> 객체를 인자로 받습니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>FileUpload.Item</Document.Heading3>
    <Document.Paragraph mb={4}>
      개별 파일을 표시하는 아이템 컴포넌트입니다. <InlineCode>file</InlineCode> prop을 받아 해당 파일의 컨텍스트를 하위 컴포넌트에
      제공합니다. 내부에서 ItemPreview, ItemName, ItemSize 등의 세부 컴포넌트를 사용할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>FileUpload.ItemPreview</Document.Heading3>
    <Document.Paragraph mb={4}>
      이미지 파일의 미리보기를 표시합니다. 이미지가 아닌 파일의 경우 <InlineCode>fallback</InlineCode> prop을 통해 대체 UI를 표시할 수
      있습니다. 내부적으로 URL.createObjectURL을 사용하여 미리보기를 생성합니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>FileUpload.ItemName</Document.Heading3>
    <Document.Paragraph mb={4}>
      파일명을 표시하는 컴포넌트입니다. Item 컨텍스트로부터 파일 정보를 자동으로 가져와 표시합니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>FileUpload.ItemSize</Document.Heading3>
    <Document.Paragraph mb={4}>
      파일 크기를 사람이 읽기 쉬운 형식으로 표시합니다. <InlineCode>decimals</InlineCode> prop으로 소수점 자릿수를,{" "}
      <InlineCode>standard</InlineCode> prop으로 단위 기준(SI 또는 IEC)을 설정할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>FileUpload.ItemDeleteTrigger</Document.Heading3>
    <Document.Paragraph mb={4}>
      개별 파일을 삭제하는 버튼입니다. 클릭 시 해당 파일이 목록에서 제거됩니다. <InlineCode>onDelete</InlineCode> 콜백을 통해 삭제 전에 추가
      작업을 수행할 수 있습니다.
    </Document.Paragraph>
  </section>
);

/* ──────────────────────────────────────────────
   Anatomy Data
   ────────────────────────────────────────────── */

const anatomyItems = [
  { name: "FileUpload.Root", desc: "파일 업로드의 최상위 컨테이너이자 상태 관리자" },
  { name: "FileUpload.Trigger", desc: "파일 선택 대화상자를 여는 버튼" },
  { name: "FileUpload.DropZone", desc: "드래그 앤 드롭 영역 제공" },
  { name: "FileUpload.List", desc: "선택된 파일 목록 컨테이너" },
  { name: "FileUpload.Item", desc: "개별 파일 아이템" },
  { name: "FileUpload.ItemPreview", desc: "이미지 미리보기 표시" },
  { name: "FileUpload.ItemName", desc: "파일명 표시" },
  { name: "FileUpload.ItemSize", desc: "파일 크기 표시" },
  { name: "FileUpload.ItemDeleteTrigger", desc: "파일 삭제 버튼" },
];

const anatomyCode = `<FileUpload.Root value={files} onValueChange={setFiles}>
  <FileUpload.Trigger>파일 선택</FileUpload.Trigger>
  
  <FileUpload.DropZone>
    여기에 파일을 드래그하세요
  </FileUpload.DropZone>
  
  <FileUpload.List>
    {(files) =>
      files.map((file, index) => (
        <FileUpload.Item key={file.name} file={file} index={index}>
          <FileUpload.ItemPreview />
          <FileUpload.ItemName />
          <FileUpload.ItemSize />
          <FileUpload.ItemDeleteTrigger>삭제</FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      ))
    }
  </FileUpload.List>
</FileUpload.Root>`;

export { CompoundStructureSection };
