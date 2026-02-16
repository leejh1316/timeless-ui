import { Carousel } from "@timeless-ui/react";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      Carousel은 여러 콘텐츠를 슬라이드 형태로 표시하고 탐색할 수 있는 컴포넌트입니다. <InlineCode>Carousel.Root</InlineCode> 내부에{" "}
      <InlineCode>Carousel.Container</InlineCode>, <InlineCode>Carousel.Track</InlineCode>, <InlineCode>Carousel.Item</InlineCode>을
      조합하여 기본 구조를 만들 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

const BasicDemo = () => (
  <div className="w-full max-w-md">
    <Carousel.Root>
      <Carousel.Container>
        <Carousel.Track className="-ml-2">
          <Carousel.Item className="pl-2">
            <div className="flex h-60 items-center justify-center rounded-xl bg-neutral-100">
              <span className="text-title-2 text-neutral-600">슬라이드 1</span>
            </div>
          </Carousel.Item>
          <Carousel.Item className="pl-2">
            <div className="flex h-60 items-center justify-center rounded-xl bg-neutral-200">
              <span className="text-title-2 text-neutral-600">슬라이드 2</span>
            </div>
          </Carousel.Item>
          <Carousel.Item className="pl-2">
            <div className="flex h-60 items-center justify-center rounded-xl bg-neutral-300">
              <span className="text-title-2 text-neutral-600">슬라이드 3</span>
            </div>
          </Carousel.Item>
        </Carousel.Track>
      </Carousel.Container>
    </Carousel.Root>
  </div>
);

const basicCode = `const BasicDemo = () => (
  <div className="w-full max-w-md">
    <Carousel.Root>
      <Carousel.Container>
        <Carousel.Track className="-ml-2">
          <Carousel.Item className="pl-2">
            <div className="flex h-60 items-center justify-center rounded-xl bg-neutral-100">
              <span className="text-xl text-neutral-600">슬라이드 1</span>
            </div>
          </Carousel.Item>
          <Carousel.Item className="pl-2">
            <div className="flex h-60 items-center justify-center rounded-xl bg-neutral-200">
              <span className="text-xl text-neutral-600">슬라이드 2</span>
            </div>
          </Carousel.Item>
          <Carousel.Item className="pl-2">
            <div className="flex h-60 items-center justify-center rounded-xl bg-neutral-300">
              <span className="text-xl text-neutral-600">슬라이드 3</span>
            </div>
          </Carousel.Item>
        </Carousel.Track>
      </Carousel.Container>
    </Carousel.Root>
  </div>
);`;

export { BasicUsageSection };
