import { Carousel, useAutoplay } from "@timeless-ui/ui";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>
      다양한 활용 패턴을 통해 Carousel 컴포넌트의 기능을 확인하세요. 네비게이션 버튼, 인디케이터, 자동재생 등을 조합하여 원하는 형태의
      캐러셀을 구성할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading2>네비게이션 버튼</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>Carousel.PrevButton</InlineCode>과 <InlineCode>Carousel.NextButton</InlineCode>을 사용하여 이전/다음 슬라이드로 이동할 수
      있습니다. 더 이상 이동할 수 없는 방향의 버튼은 자동으로 비활성화됩니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <NavigationDemo />
    </PreviewContainer>
    <CodeBlock code={navigationCode} className="mb-10" />

    <Document.Heading2>인디케이터</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>Carousel.IndicatorWrapper</InlineCode>와 <InlineCode>Carousel.Indicator</InlineCode>를 사용하여 슬라이드 인디케이터를
      표시할 수 있습니다. 현재 활성 슬라이드는 <InlineCode>data-active</InlineCode> 속성으로 구분됩니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <IndicatorDemo />
    </PreviewContainer>
    <CodeBlock code={indicatorCode} className="mb-10" />

    <Document.Heading2>자동재생</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>Autoplay</InlineCode> 플러그인과 <InlineCode>useAutoplay</InlineCode> 훅을 사용하여 자동재생 기능을 구현할 수 있습니다.
      재생/일시정지를 제어하고 사용자 상호작용 시 동작을 커스터마이징할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <AutoplayDemo />
    </PreviewContainer>
    <CodeBlock code={autoplayCode} className="mb-10" />

    <Document.Heading2>세로 방향 캐러셀</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>orientation</InlineCode> 속성을 <InlineCode>'vertical'</InlineCode>로 설정하여 세로 방향 캐러셀을 구현할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <VerticalDemo />
    </PreviewContainer>
    <CodeBlock code={verticalCode} className="mb-10" />

    <Document.Heading2>여러 아이템 표시</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>options</InlineCode> 속성의 <InlineCode>slidesToScroll</InlineCode>과 CSS를 조합하여 한 번에 여러 슬라이드를 표시할 수
      있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <MultipleItemsDemo />
    </PreviewContainer>
    <CodeBlock code={multipleItemsCode} className="mb-10" />
  </section>
);

const NavigationDemo = () => (
  <div className="w-full max-w-md">
    <Carousel.Root>
      <div className="relative">
        <Carousel.Container>
          <Carousel.Track>
            <Carousel.Item>
              <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-100">
                <span className="text-title-2 text-neutral-600">슬라이드 1</span>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-200">
                <span className="text-title-2 text-neutral-600">슬라이드 2</span>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-300">
                <span className="text-title-2 text-neutral-600">슬라이드 3</span>
              </div>
            </Carousel.Item>
          </Carousel.Track>
        </Carousel.Container>
        <Carousel.PrevButton className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-opacity hover:bg-neutral-50 disabled:opacity-30">
          <ChevronLeft className="h-5 w-5" />
        </Carousel.PrevButton>
        <Carousel.NextButton className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-opacity hover:bg-neutral-50 disabled:opacity-30">
          <ChevronRight className="h-5 w-5" />
        </Carousel.NextButton>
      </div>
      <div className="mt-3 text-center text-sm text-neutral-500">
        <Carousel.CurrentIndex /> / <Carousel.TotalCount />
      </div>
    </Carousel.Root>
  </div>
);

const navigationCode = `const NavigationDemo = () => (
  <div className="w-full max-w-md">
    <Carousel.Root>
      <div className="relative">
        <Carousel.Container>
          <Carousel.Track>
            <Carousel.Item>
              <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-100">
                <span className="text-xl text-neutral-600">슬라이드 1</span>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-200">
                <span className="text-xl text-neutral-600">슬라이드 2</span>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-300">
                <span className="text-xl text-neutral-600">슬라이드 3</span>
              </div>
            </Carousel.Item>
          </Carousel.Track>
        </Carousel.Container>
        <Carousel.PrevButton className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-opacity hover:bg-neutral-50 disabled:opacity-30">
          <ChevronLeft className="h-5 w-5" />
        </Carousel.PrevButton>
        <Carousel.NextButton className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-opacity hover:bg-neutral-50 disabled:opacity-30">
          <ChevronRight className="h-5 w-5" />
        </Carousel.NextButton>
      </div>
      <div className="mt-3 text-center text-sm text-neutral-500">
        <Carousel.CurrentIndex /> / <Carousel.TotalCount />
      </div>
    </Carousel.Root>
  </div>
);`;

const IndicatorDemo = () => (
  <div className="w-full max-w-md">
    <Carousel.Root>
      <Carousel.Container>
        <Carousel.Track>
          <Carousel.Item>
            <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-100">
              <span className="text-xl text-neutral-600">슬라이드 1</span>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-200">
              <span className="text-xl text-neutral-600">슬라이드 2</span>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-300">
              <span className="text-xl text-neutral-600">슬라이드 3</span>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-400">
              <span className="text-xl text-neutral-600">슬라이드 4</span>
            </div>
          </Carousel.Item>
        </Carousel.Track>
      </Carousel.Container>
      <Carousel.IndicatorWrapper className="mt-4 flex justify-center gap-2">
        {(totalSnap) =>
          Array.from({ length: totalSnap }).map((_, index) => (
            <Carousel.Indicator
              key={index}
              index={index}
              className="h-2 w-2 rounded-full bg-neutral-300 transition-all data-[active=true]:w-6 data-[active=true]:bg-neutral-600"
            />
          ))
        }
      </Carousel.IndicatorWrapper>
    </Carousel.Root>
  </div>
);

const indicatorCode = `const IndicatorDemo = () => (
  <div className="w-full max-w-md">
    <Carousel.Root>
      <Carousel.Container>
        <Carousel.Track>
          <Carousel.Item>
            <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-100">
              <span className="text-xl text-neutral-600">슬라이드 1</span>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-200">
              <span className="text-xl text-neutral-600">슬라이드 2</span>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-300">
              <span className="text-xl text-neutral-600">슬라이드 3</span>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-400">
              <span className="text-xl text-neutral-600">슬라이드 4</span>
            </div>
          </Carousel.Item>
        </Carousel.Track>
      </Carousel.Container>
      <Carousel.IndicatorWrapper className="mt-4 flex justify-center gap-2">
        {(totalSnap) =>
          Array.from({ length: totalSnap }).map((_, index) => (
            <Carousel.Indicator
              key={index}
              index={index}
              className="h-2 w-2 rounded-full bg-neutral-300 transition-all data-[active=true]:w-6 data-[active=true]:bg-neutral-600"
            />
          ))
        }
      </Carousel.IndicatorWrapper>
    </Carousel.Root>
  </div>
);`;

const AutoplayDemo = () => {
  const [api, setApi] = useState<Parameters<typeof useAutoplay>[0]["api"]>(null);
  const { isPlaying, toggleAutoplay } = useAutoplay({
    api,
    defaultState: "playing",
  });

  return (
    <div className="w-full max-w-md">
      <Carousel.Root setApi={setApi} plugins={[Autoplay({ delay: 2000, stopOnInteraction: false })]}>
        <Carousel.Container>
          <Carousel.Track>
            <Carousel.Item>
              <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-100">
                <span className="text-xl text-neutral-600">슬라이드 1</span>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-200">
                <span className="text-xl text-neutral-600">슬라이드 2</span>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-300">
                <span className="text-xl text-neutral-600">슬라이드 3</span>
              </div>
            </Carousel.Item>
          </Carousel.Track>
        </Carousel.Container>
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={toggleAutoplay}
            className="flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2 text-sm text-white transition-colors hover:bg-neutral-700"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? "일시정지" : "재생"}
          </button>
          <div className="text-sm text-neutral-500">
            <Carousel.CurrentIndex /> / <Carousel.TotalCount />
          </div>
        </div>
      </Carousel.Root>
    </div>
  );
};

const autoplayCode = `const AutoplayDemo = () => {
  const [api, setApi] = useState<Parameters<typeof useAutoplay>[0]["api"]>(null);
  const { isPlaying, toggleAutoplay } = useAutoplay({
    api,
    defaultState: "playing",
  });

  return (
    <div className="w-full max-w-md">
      <Carousel.Root setApi={setApi} plugins={[Autoplay({ delay: 2000, stopOnInteraction: false })]}>
        <Carousel.Container>
          <Carousel.Track>
            <Carousel.Item>
              <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-100">
                <span className="text-title-2 text-neutral-600">슬라이드 1</span>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-200">
                <span className="text-title-2 text-neutral-600">슬라이드 2</span>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="flex h-48 items-center justify-center rounded-xl bg-neutral-300">
                <span className="text-title-2 text-neutral-600">슬라이드 3</span>
              </div>
            </Carousel.Item>
          </Carousel.Track>
        </Carousel.Container>
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={toggleAutoplay}
            className="flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2 text-sm text-white transition-colors hover:bg-neutral-700"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? "일시정지" : "재생"}
          </button>
          <div className="text-sm text-neutral-500">
            <Carousel.CurrentIndex /> / <Carousel.TotalCount />
          </div>
        </div>
      </Carousel.Root>
    </div>
  );
};`;

const VerticalDemo = () => (
  <div className="w-full max-w-md">
    <Carousel.Root orientation="vertical">
      <Carousel.Container className="">
        <Carousel.Track className="h-[400px]">
          <Carousel.Item>
            <div className="flex h-full items-center justify-center rounded-xl bg-neutral-100">
              <span className="text-xl text-neutral-600">슬라이드 1</span>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="flex h-full items-center justify-center rounded-xl bg-neutral-200">
              <span className="text-xl text-neutral-600">슬라이드 2</span>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="flex h-full items-center justify-center rounded-xl bg-neutral-300">
              <span className="text-xl text-neutral-600">슬라이드 3</span>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="flex h-full items-center justify-center rounded-xl bg-neutral-400">
              <span className="text-xl text-neutral-600">슬라이드 4</span>
            </div>
          </Carousel.Item>
        </Carousel.Track>
      </Carousel.Container>
    </Carousel.Root>
  </div>
);

const verticalCode = `const VerticalDemo = () => (
  <div className="w-full max-w-md">
    <Carousel.Root orientation="vertical">
      <Carousel.Container >
        <Carousel.Track className="h-[400px]">
          <Carousel.Item>
            <div className="flex h-full items-center justify-center rounded-xl bg-neutral-100">
              <span className="text-xl text-neutral-600">슬라이드 1</span>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="flex h-full items-center justify-center rounded-xl bg-neutral-200">
              <span className="text-xl text-neutral-600">슬라이드 2</span>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="flex h-full items-center justify-center rounded-xl bg-neutral-300">
              <span className="text-xl text-neutral-600">슬라이드 3</span>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="flex h-full items-center justify-center rounded-xl bg-neutral-400">
              <span className="text-xl text-neutral-600">슬라이드 4</span>
            </div>
          </Carousel.Item>
        </Carousel.Track>
      </Carousel.Container>
    </Carousel.Root>
  </div>
);`;

const MultipleItemsDemo = () => (
  <div className="w-full max-w-2xl">
    <Carousel.Root options={{ slidesToScroll: 2 }}>
      <Carousel.Container>
        <Carousel.Track className="-ml-3">
          <Carousel.Item className="basis-1/2! pl-3">
            <div className="flex h-40 items-center justify-center rounded-xl bg-neutral-100">
              <span className="text-lg text-neutral-600">1</span>
            </div>
          </Carousel.Item>
          <Carousel.Item className="basis-1/2! pl-3">
            <div className="flex h-40 items-center justify-center rounded-xl bg-neutral-200">
              <span className="text-lg text-neutral-600">2</span>
            </div>
          </Carousel.Item>
          <Carousel.Item className="basis-1/2! pl-3">
            <div className="flex h-40 items-center justify-center rounded-xl bg-neutral-300">
              <span className="text-lg text-neutral-600">3</span>
            </div>
          </Carousel.Item>
          <Carousel.Item className="basis-1/2! pl-3">
            <div className="flex h-40 items-center justify-center rounded-xl bg-neutral-400">
              <span className="text-lg text-neutral-600">4</span>
            </div>
          </Carousel.Item>
          <Carousel.Item className="basis-1/2! pl-3">
            <div className="flex h-40 items-center justify-center rounded-xl bg-neutral-500">
              <span className="text-lg text-neutral-50">5</span>
            </div>
          </Carousel.Item>
        </Carousel.Track>
      </Carousel.Container>
    </Carousel.Root>
  </div>
);

const multipleItemsCode = `const MultipleItemsDemo = () => (
  <div className="w-full max-w-2xl">
    <Carousel.Root options={{ slidesToScroll: 2 }}>
      <Carousel.Container>
        <Carousel.Track className="-ml-3">
          <Carousel.Item className="basis-1/2! pl-3">
            <div className="flex h-40 items-center justify-center rounded-xl bg-neutral-100">
              <span className="text-lg text-neutral-600">1</span>
            </div>
          </Carousel.Item>
          <Carousel.Item className="basis-1/2! pl-3">
            <div className="flex h-40 items-center justify-center rounded-xl bg-neutral-200">
              <span className="text-lg text-neutral-600">2</span>
            </div>
          </Carousel.Item>
          <Carousel.Item className="basis-1/2! pl-3">
            <div className="flex h-40 items-center justify-center rounded-xl bg-neutral-300">
              <span className="text-lg text-neutral-600">3</span>
            </div>
          </Carousel.Item>
          <Carousel.Item className="basis-1/2! pl-3">
            <div className="flex h-40 items-center justify-center rounded-xl bg-neutral-400">
              <span className="text-lg text-neutral-600">4</span>
            </div>
          </Carousel.Item>
          <Carousel.Item className="basis-1/2! pl-3">
            <div className="flex h-40 items-center justify-center rounded-xl bg-neutral-500">
              <span className="text-lg text-neutral-50">5</span>
            </div>
          </Carousel.Item>
        </Carousel.Track>
      </Carousel.Container>
    </Carousel.Root>
  </div>
);`;

export { ExampleSection };
