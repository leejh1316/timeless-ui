import { useArrowNavigation } from "@timeless-ui/react";
import { useState } from "react";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>
      <InlineCode>useArrowNavigation</InlineCode>의 다양한 활용 패턴을 확인하세요.
    </Document.Paragraph>

    <Document.Heading2>Selector 모드</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>selector</InlineCode> prop을 사용하면 CSS 셀렉터로 네비게이션 대상을 지정할 수 있습니다. 동적으로 아이템이 추가되거나
      제거되는 경우에 유용합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <SelectorModeDemo />
    </PreviewContainer>
    <CodeBlock code={selectorModeCode} className="mb-10" />

    <Document.Heading2>Horizontal Orientation</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>orientation</InlineCode>을 <InlineCode>'horizontal'</InlineCode>로 설정하면 좌우 화살표 키만 활성화됩니다. 탭이나
      페이지네이션 등에 적합합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <HorizontalDemo />
    </PreviewContainer>
    <CodeBlock code={horizontalCode} className="mb-10" />

    <Document.Heading2>onNavigate 콜백 활용</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>onNavigate</InlineCode> 콜백을 사용하여 항목 이동 시 추가 동작을 수행할 수 있습니다. 이동 방향, 현재/이전 아이템 정보 등을
      활용할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <OnNavigateDemo />
    </PreviewContainer>
    <CodeBlock code={onNavigateCode} className="mb-10" />

    <Document.Heading2>Loop 비활성화</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>loop</InlineCode>을 <InlineCode>false</InlineCode>로 설정하면 첫 번째 항목과 마지막 항목에서 더 이상 순환하지 않습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <NoLoopDemo />
    </PreviewContainer>
    <CodeBlock code={noLoopCode} className="mb-10" />
  </section>
);

// ─── Selector Mode Demo ───────────────────────────────────────
const SelectorModeDemo = () => {
  const [items, setItems] = useState(["항목 1", "항목 2", "항목 3"]);
  const { rootRef, handleKeyDown } = useArrowNavigation({
    selector: "[data-nav-item]",
    orientation: "vertical",
  });

  const addItem = () => {
    setItems((prev) => [...prev, `항목 ${prev.length + 1}`]);
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={addItem}
        className="w-fit rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
      >
        항목 추가
      </button>
      <div ref={rootRef} onKeyDown={handleKeyDown} className="w-64 rounded-lg border border-neutral-200 bg-white p-2">
        {items.map((item) => (
          <button
            key={item}
            data-nav-item
            className="w-full rounded-md px-4 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100 data-[arrow-navigation-active-item='true']:bg-neutral-800 data-[arrow-navigation-active-item='true']:text-white"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

const selectorModeCode = `const SelectorModeDemo = () => {
  const [items, setItems] = useState(["항목 1", "항목 2", "항목 3"]);
  const { rootRef, handleKeyDown } = useArrowNavigation<'button'>({
    selector: "[data-nav-item]",
    orientation: "vertical",
  });

  const addItem = () => {
    setItems((prev) => [...prev, \`항목 \${prev.length + 1}\`]);
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={addItem}
        className="w-fit rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
      >
        항목 추가
      </button>
      <div ref={rootRef} onKeyDown={handleKeyDown} className="w-64 rounded-lg border border-neutral-200 bg-white p-2">
        {items.map((item) => (
          <button
            key={item}
            data-nav-item
            className="w-full rounded-md px-4 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100 data-[arrow-navigation-active-item='true']:bg-neutral-800 data-[arrow-navigation-active-item='true']:text-white"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};`;

// ─── Horizontal Demo ──────────────────────────────────────────
const HorizontalDemo = () => {
  const tabs = ["개요", "사양", "리뷰", "관련 상품"];
  const { rootRef, handleKeyDown, getItemProps, activeIndex } = useArrowNavigation({
    itemCount: tabs.length,
    orientation: "horizontal",
  });

  return (
    <div ref={rootRef} onKeyDown={handleKeyDown} className="inline-flex gap-1 rounded-lg bg-neutral-100 p-1">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          {...getItemProps({ index })}
          className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
            activeIndex === index ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const horizontalCode = `const HorizontalDemo = () => {
  const tabs = ["개요", "사양", "리뷰", "관련 상품"];
  const { rootRef, handleKeyDown, getItemProps, activeIndex } = useArrowNavigation<'button'>({
    itemCount: tabs.length,
    orientation: "horizontal",
  });

  return (
    <div ref={rootRef} onKeyDown={handleKeyDown} className="inline-flex gap-1 rounded-lg bg-neutral-100 p-1">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          {...getItemProps({ index })}
          className={\`rounded-md px-6 py-2 text-sm font-medium transition-colors \${
            activeIndex === index ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-600 hover:text-neutral-900"
          }\`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};`;

// ─── OnNavigate Demo ──────────────────────────────────────────
const OnNavigateDemo = () => {
  const [log, setLog] = useState<string>("");
  const items = ["첫 번째", "두 번째", "세 번째", "네 번째"];
  const { rootRef, handleKeyDown, getItemProps, activeIndex } = useArrowNavigation({
    itemCount: items.length,
    orientation: "vertical",
    onNavigate: ({ direction, activeIndex }) => {
      setLog(`${direction === "next" ? "다음" : "이전"} 항목으로 이동 → 인덱스: ${activeIndex}`);
    },
  });

  return (
    <div className="flex flex-col gap-4">
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
      {log && <div className="rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700">{log}</div>}
    </div>
  );
};

const onNavigateCode = `const OnNavigateDemo = () => {
  const [log, setLog] = useState<string>("");
  const items = ["첫 번째", "두 번째", "세 번째", "네 번째"];
  const { rootRef, handleKeyDown, getItemProps, activeIndex } = useArrowNavigation<'button'>({
    itemCount: items.length,
    orientation: "vertical",
    onNavigate: ({ direction, activeIndex }) => {
      setLog(\`\${direction === "next" ? "다음" : "이전"} 항목으로 이동 → 인덱스: \${activeIndex}\`);
    },
  });

  return (
    <div className="flex flex-col gap-4">
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
      {log && (
        <div className="rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700">{log}</div>
      )}
    </div>
  );
};`;

// ─── No Loop Demo ─────────────────────────────────────────────
const NoLoopDemo = () => {
  const items = ["시작", "중간", "끝"];
  const { rootRef, handleKeyDown, getItemProps, activeIndex } = useArrowNavigation({
    itemCount: items.length,
    orientation: "vertical",
    loop: false,
  });

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-neutral-600">첫 번째 항목에서는 위로, 마지막 항목에서는 아래로 이동할 수 없습니다.</p>
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
    </div>
  );
};

const noLoopCode = `const NoLoopDemo = () => {
  const items = ["시작", "중간", "끝"];
  const { rootRef, handleKeyDown, getItemProps, activeIndex } = useArrowNavigation<'button'>({
    itemCount: items.length,
    orientation: "vertical",
    loop: false,
  });

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-neutral-600">첫 번째 항목에서는 위로, 마지막 항목에서는 아래로 이동할 수 없습니다.</p>
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
    </div>
  );
};`;

export { ExampleSection };
