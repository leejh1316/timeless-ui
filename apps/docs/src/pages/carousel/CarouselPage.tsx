import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Carousel, CarouselApi, useAutoplay, useAutoScroll, useCurrentIndex, useTotalCount } from "@timeless-ui/ui";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";

const SLIDE_IMAGES = [
  "https://picsum.photos/400?random=2",
  "https://picsum.photos/400?random=3",
  "https://picsum.photos/400?random=1",
  "https://picsum.photos/400?random=4",
  "https://picsum.photos/400?random=5",
];

const Slide = ({ src, alt }: { src: string; alt: string }) => (
  <Carousel.Item className="relative h-64 w-full">
    <img src={src} alt={alt} className="h-full w-full object-cover" />
  </Carousel.Item>
);

export default function CarouselPage() {
  const rootPropsData = [
    {
      prop: "options",
      type: "CarouselOptions",
      defaultValue: "{}",
      description: "embla-carousel-react의 옵션 객체입니다. (e.g., { loop: true })",
    },
    {
      prop: "plugins",
      type: "CarouselPlugin[]",
      defaultValue: "[]",
      description: "embla-carousel-react의 플러그인 배열입니다.",
    },
    {
      prop: "orientation",
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: "캐러셀의 방향을 설정합니다.",
    },
    {
      prop: "setApi",
      type: "(api: CarouselApi) => void",
      defaultValue: "-",
      description: "캐러셀 API에 접근하기 위한 콜백 함수입니다.",
    },
  ];

  const example1Code = `
import { Carousel } from "@timeless-ui/ui";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SLIDE_IMAGES = [/* ... */];

export function Component() {
  return (
    <Carousel.Root className="w-full max-w-xl">
      <Carousel.Container>
        <Carousel.Track>
          {SLIDE_IMAGES.map((src, i) => (
            <Carousel.Item key={i} className="relative h-64">
              <img src={src} alt={\`Slide \${i + 1}\`} className="h-full w-full object-cover" />
            </Carousel.Item>
          ))}
        </Carousel.Track>
      </Carousel.Container>
      <Carousel.PrevButton className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white disabled:opacity-50">
        <ArrowLeft size={20} />
      </Carousel.PrevButton>
      <Carousel.NextButton className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white disabled:opacity-50">
        <ArrowRight size={20} />
      </Carousel.NextButton>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <Carousel.IndicatorWrapper className="flex items-center space-x-2">
          {SLIDE_IMAGES.map((_, i) => (
            <Carousel.Indicator
              key={i}
              index={i}
              className="h-2 w-2 rounded-full bg-white/50 data-[active=true]:bg-white"
            />
          ))}
        </Carousel.IndicatorWrapper>
      </div>
    </Carousel.Root>
  );
}
  `;

  const example2Code = `
import { Carousel, useAutoplay, useAutoScroll } from "@timeless-ui/ui";
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";
import { Play, Pause } from "lucide-react";

const AutoplayCarousel = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const { isPlaying, toggleAutoplay } = useAutoplay(api);

  return (
    <Carousel.Root
      setApi={setApi}
      plugins={[Autoplay({ delay: 2000, stopOnInteraction: false })]}
      options={{ loop: true }}
      className="w-full max-w-xl"
    >
      {/* ... Carousel Content ... */}
      <button onClick={toggleAutoplay} className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white">
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </Carousel.Root>
  );
};

const AutoScrollCarousel = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const { isPlaying, toggleAutoplay: toggleAutoScroll } = useAutoScroll(api);

  return (
    <Carousel.Root
      setApi={setApi}
      plugins={[AutoScroll({ speed: 1, stopOnInteraction: false })]}
      options={{ loop: true, align: "start" }}
      className="w-full max-w-xl"
    >
      {/* ... Carousel Content ... */}
      <button onClick={toggleAutoScroll} className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white">
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </Carousel.Root>
  );
};
  `;

  const example3Code = `
import { Carousel, CarouselApi, useCurrentIndex, useTotalCount } from "@timeless-ui/ui";
import { useState, useEffect, useCallback } from "react";

const ExternalController = ({ api }: { api: CarouselApi | null }) => {
  const currentIndex = useCurrentIndex(api);
  const totalCount = useTotalCount(api);

  const handlePrev = useCallback(() => api?.scrollPrev(), [api]);
  const handleNext = useCallback(() => api?.scrollNext(), [api]);
  const handleGoTo = (index: number) => api?.scrollTo(index);

  return (
    <div className="mt-4 flex items-center justify-center space-x-4">
      <button onClick={handlePrev}>Prev</button>
      <span>{currentIndex + 1} / {totalCount}</span>
      <button onClick={handleNext}>Next</button>
      <select onChange={(e) => handleGoTo(Number(e.target.value))} value={currentIndex}>
        {Array.from({ length: totalCount }).map((_, i) => (
          <option key={i} value={i}>Slide {i + 1}</option>
        ))}
      </select>
    </div>
  );
};

export function Component() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  return (
    <div>
      <Carousel.Root setApi={setApi} className="w-full max-w-xl">
        {/* ... Carousel Content ... */}
      </Carousel.Root>
      <ExternalController api={api} />
    </div>
  );
}
  `;

  const BasicCarousel = () => (
    <Carousel.Root className="w-full max-w-xl">
      <Carousel.Container>
        <Carousel.Track>
          {SLIDE_IMAGES.map((src, i) => (
            <Slide key={i} src={src} alt={`Slide ${i + 1}`} />
          ))}
        </Carousel.Track>
      </Carousel.Container>
      <Carousel.PrevButton className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-opacity disabled:opacity-0">
        <ArrowLeft size={20} />
      </Carousel.PrevButton>
      <Carousel.NextButton className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-opacity disabled:opacity-0">
        <ArrowRight size={20} />
      </Carousel.NextButton>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <Carousel.IndicatorWrapper className="flex items-center space-x-2">
          {SLIDE_IMAGES.map((_, i) => (
            <Carousel.Indicator
              key={i}
              index={i}
              className="h-2 w-2 rounded-full bg-white/50 transition-colors data-[active=true]:bg-white"
            />
          ))}
        </Carousel.IndicatorWrapper>
      </div>
    </Carousel.Root>
  );

  const AutoplayCarousel = memo(() => {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const { isPlaying, toggleAutoplay } = useAutoplay(api);

    return (
      <Carousel.Root
        setApi={setApi}
        plugins={[Autoplay({ delay: 2000, stopOnInteraction: false })]}
        options={{ loop: true }}
        className="w-full max-w-xl"
      >
        <Carousel.Container>
          <Carousel.Track>
            {SLIDE_IMAGES.map((src, i) => (
              <Slide key={i} src={src} alt={`Slide ${i + 1}`} />
            ))}
          </Carousel.Track>
        </Carousel.Container>
        <button
          onClick={toggleAutoplay}
          className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white"
          aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </Carousel.Root>
    );
  });

  const AutoScrollCarousel = memo(() => {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const { isPlaying, toggleAutoplay: toggleAutoScroll } = useAutoScroll(api);

    return (
      <Carousel.Root
        setApi={setApi}
        plugins={[AutoScroll({ speed: 1, stopOnInteraction: false })]}
        options={{ loop: true, align: "start", dragFree: true }}
        className="w-full max-w-xl"
      >
        <Carousel.Container>
          <Carousel.Track>
            {[...SLIDE_IMAGES, ...SLIDE_IMAGES].map((src, i) => (
              <Carousel.Item key={i} className="relative h-48 shrink-0" style={{ flexBasis: "40%" }}>
                <img src={src} alt={`Slide ${i + 1}`} className="h-full w-full object-cover" />
              </Carousel.Item>
            ))}
          </Carousel.Track>
        </Carousel.Container>
        <button
          onClick={toggleAutoScroll}
          className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white"
          aria-label={isPlaying ? "Pause autoscroll" : "Start autoscroll"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </Carousel.Root>
    );
  });

  const ExternalController = ({ api }: { api: CarouselApi | null }) => {
    const currentIndex = useCurrentIndex(api);
    const totalCount = useTotalCount(api);

    const handlePrev = useCallback(() => api?.scrollPrev(), [api]);
    const handleNext = useCallback(() => api?.scrollNext(), [api]);
    const handleGoTo = (index: number) => api?.scrollTo(index);

    if (!api) return null;

    return (
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <button onClick={handlePrev} className="rounded px-3 py-1 text-sm font-medium ring-1 ring-gray-300">
            Prev
          </button>
          <span>
            {currentIndex + 1} / {totalCount}
          </span>
          <button onClick={handleNext} className="rounded px-3 py-1 text-sm font-medium ring-1 ring-gray-300">
            Next
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="slide-select" className="text-sm">
            Go to:
          </label>
          <select
            id="slide-select"
            onChange={(e) => handleGoTo(Number(e.target.value))}
            value={currentIndex}
            className="rounded border-gray-300 text-sm"
          >
            {Array.from({ length: totalCount }).map((_, i) => (
              <option key={i} value={i}>
                Slide {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  const ControlledCarousel = () => {
    const [api, setApi] = useState<CarouselApi | null>(null);
    return (
      <div className="w-full max-w-xl">
        <Carousel.Root setApi={setApi}>
          <Carousel.Container>
            <Carousel.Track>
              {SLIDE_IMAGES.map((src, i) => (
                <Slide key={i} src={src} alt={`Slide ${i + 1}`} />
              ))}
            </Carousel.Track>
          </Carousel.Container>
        </Carousel.Root>
        <ExternalController api={api} />
      </div>
    );
  };

  return (
    <ComponentPageLayout
      title="Carousel"
      description="다양한 옵션과 플러그인을 지원하는 유연한 캐러셀 컴포넌트입니다. 키보드 탐색과 접근성을 완벽하게 지원합니다."
    >
      <ComponentPreview
        title="기본 캐러셀"
        description="가장 기본적인 형태의 캐러셀입니다. 이전/다음 버튼과 인디케이터를 포함합니다."
        code={example1Code}
      >
        <BasicCarousel />
      </ComponentPreview>

      <ComponentPreview
        title="플러그인"
        description="Autoplay와 AutoScroll 플러그인을 사용한 예제입니다."
        code={example2Code}
      >
        <div className="flex flex-col items-center gap-8">
          <div className="w-full">
            <h3 className="mb-4 text-lg font-semibold">Autoplay</h3>
            <AutoplayCarousel />
          </div>
          <div className="w-full">
            <h3 className="mb-4 text-lg font-semibold">AutoScroll (Marquee)</h3>
            <AutoScrollCarousel />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="외부에서 제어하기"
        description="setApi prop과 훅스를 사용하여 캐러셀 외부에서 상태를 읽고 제어할 수 있습니다."
        code={example3Code}
      >
        <ControlledCarousel />
      </ComponentPreview>

      <PropsTable data={rootPropsData} />
    </ComponentPageLayout>
  );
}
