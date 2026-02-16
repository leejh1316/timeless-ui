import { CodeBlock } from "@src/components/common/CodeBlock";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Compound Structure Section
   ────────────────────────────────────────────── */

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      Image는 Compound Component 패턴을 사용하여 이미지 로딩 상태 관리와 표시를 분리합니다. 이를 통해 유연한 커스터마이징이 가능합니다.
    </Document.Paragraph>
    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <CodeBlock code={anatomyCode} className="mb-8" />

    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3>Image.Root</Document.Heading3>
    <Document.Paragraph mb={6}>
      이미지 로딩 상태를 관리하는 최상위 컨테이너입니다. <InlineCode>src</InlineCode>, <InlineCode>alt</InlineCode>,{" "}
      <InlineCode>fallbackSrc</InlineCode> 등의 속성을 받아 이미지 로딩 로직을 처리하고, Context를 통해 하위 컴포넌트에 상태를 전달합니다.{" "}
      <InlineCode>data-status</InlineCode> 속성을 통해 현재 로딩 상태를 확인할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Image.View</Document.Heading3>
    <Document.Paragraph mb={10}>
      실제 이미지를 렌더링하는 컴포넌트입니다. Root로부터 전달받은 <InlineCode>src</InlineCode>와 <InlineCode>alt</InlineCode>를 사용하여
      img 요소를 렌더링하며, <InlineCode>fit</InlineCode> 속성을 통해 이미지의 object-fit 스타일을 제어할 수 있습니다.
    </Document.Paragraph>
  </section>
);

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

const anatomyItems = [
  {
    name: "Image.Root",
    desc: "이미지 로딩 상태를 관리하는 최상위 컨테이너 컴포넌트",
  },
  {
    name: "Image.View",
    desc: "실제 이미지를 렌더링하고 표시하는 컴포넌트",
  },
];

const anatomyCode = `import { Image } from "@timeless-ui/ui";

<Image.Root src="..." alt="...">
  <Image.View />
</Image.Root>`;

export { CompoundStructureSection };
