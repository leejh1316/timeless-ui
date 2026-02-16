import { useArrowNavigation } from "@timeless-ui/ui";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      <InlineCode>useArrowNavigation</InlineCode> Hook은 키보드 화살표 키를 사용하여 포커스 가능한 항목들 사이를 탐색할 수 있도록 합니다.{" "}
      <InlineCode>itemCount</InlineCode> 모드에서는 <InlineCode>getItemProps</InlineCode> 함수를 통해 각 항목에 필요한 props를 주입하고,{" "}
      <InlineCode>handleKeyDown</InlineCode>을 루트 요소에 연결하여 화살표 키 네비게이션을 구현합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

const BasicDemo = () => {
  const items = ["홈", "프로필", "설정", "알림", "도움말"];
  const { rootRef, handleKeyDown, getItemProps, activeIndex } = useArrowNavigation<"button">({
    itemCount: items.length,
    orientation: "vertical",
  });

  return (
    <div ref={rootRef} onKeyDown={handleKeyDown} className="w-64 rounded-lg border border-neutral-200 bg-white p-2">
      {items.map((item, index) => (
        <button
          key={item}
          {...getItemProps({ index })}
          className={`w-full rounded-md px-4 py-2 text-left text-sm transition-colors ${
            activeIndex === index ? "bg-neutral-800 text-white" : "text-neutral-700 hover:bg-neutral-100"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

const basicCode = `const BasicDemo = () => {
  const items = ["홈", "프로필", "설정", "알림", "도움말"];
  const { rootRef, handleKeyDown, getItemProps, activeIndex } = useArrowNavigation({
    itemCount: items.length,
    orientation: "vertical",
  });

  return (
    <div ref={rootRef} onKeyDown={handleKeyDown} className="w-64 rounded-lg border border-neutral-200 bg-white p-2">
      {items.map((item, index) => (
        <button
          key={item}
          {...getItemProps({ index })}
          className={\`w-full rounded-md px-4 py-2 text-left text-sm transition-colors \${
            activeIndex === index ? "bg-neutral-800 text-white" : "text-neutral-700 hover:bg-neutral-100"
          }\`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};`;

export { BasicUsageSection };
