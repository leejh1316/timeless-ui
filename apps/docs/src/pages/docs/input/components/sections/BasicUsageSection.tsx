import { Document } from "@src/components/ui/Document";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Input } from "@timeless-ui/ui";

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      Input 컴포넌트는 사용자로부터 텍스트 입력을 받는 기본 폼 요소입니다. Label과 Field를 조합하여 접근성을 갖춘 입력 필드를 구성할 수
      있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

const BasicDemo = () => (
  <div className="w-full max-w-sm">
    <Input.Root>
      <Input.Label className="text-body-3 text-ink-primary mb-2 block font-medium">이름</Input.Label>
      <Input.Field
        type="text"
        placeholder="이름을 입력하세요"
        className="text-body-3 w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none transition-colors focus:border-neutral-500"
      />
    </Input.Root>
  </div>
);

const basicCode = `import { Input } from "@timeless-ui/ui";

const BasicDemo = () => (
  <div className="w-full max-w-sm">
    <Input.Root>
      <Input.Label className="text-body-3 text-ink-primary mb-2 block font-medium">이름</Input.Label>
      <Input.Field
        type="text"
        placeholder="이름을 입력하세요"
        className="text-body-3 w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none transition-colors focus:border-neutral-500"
      />
    </Input.Root>
  </div>
);`;

export { BasicUsageSection };
