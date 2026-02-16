import { Image } from "@timeless-ui/react";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Document } from "@src/components/ui/Document";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      Image 컴포넌트는 이미지 로딩 상태를 관리하고, fallback 이미지를 제공할 수 있는 컴포넌트입니다. 가장 기본적인 사용법은 다음과 같습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Demo Component & Code
   ────────────────────────────────────────────── */

const BasicDemo = () => (
  <Image.Root src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4" alt="산의 풍경" className="overflow-hidden rounded-lg">
    <Image.View className="h-64 w-96" />
  </Image.Root>
);

const basicCode = `import { Image } from "@timeless-ui/react";

const BasicDemo = () => (
  <Image.Root
    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
    alt="산의 풍경"
    className="overflow-hidden rounded-lg"
  >
    <Image.View className="h-64 w-96" />
  </Image.Root>
);`;

export { BasicUsageSection };
