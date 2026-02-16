import { useState } from "react";
import { Image } from "@timeless-ui/ui";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Example Section
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>Image 컴포넌트의 다양한 활용 패턴을 확인하세요.</Document.Paragraph>

    {/* Fallback 이미지 */}
    <Document.Heading2>Fallback 이미지 사용</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>fallbackSrc</InlineCode> 속성을 사용하여 메인 이미지 로딩 실패 시 대체 이미지를 표시할 수 있습니다. 메인 이미지 URL을
      의도적으로 잘못된 값으로 설정하여 fallback 동작을 확인할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <FallbackDemo />
    </PreviewContainer>
    <CodeBlock code={fallbackCode} className="mb-10" />

    {/* 상태 변화 추적 */}
    <Document.Heading2>상태 변화 추적</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>onStatusChange</InlineCode> 콜백을 사용하여 이미지 로딩 상태 변화를 추적할 수 있습니다. 이를 통해 로딩 인디케이터나 에러
      메시지를 표시할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <StatusTrackingDemo />
    </PreviewContainer>
    <CodeBlock code={statusTrackingCode} className="mb-10" />

    {/* 지연 로딩 */}
    <Document.Heading2>지연 로딩</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>startLoading</InlineCode> 속성을 <InlineCode>false</InlineCode>로 설정하여 이미지 로딩을 지연시킬 수 있습니다. 사용자
      인터랙션이나 특정 조건에 따라 이미지를 로드하고 싶을 때 유용합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <LazyLoadingDemo />
    </PreviewContainer>
    <CodeBlock code={lazyLoadingCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Demo Components & Code
   ────────────────────────────────────────────── */

// Fallback Demo
const FallbackDemo = () => {
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => setKey((prev) => prev + 1)}
        className="rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
      >
        다시 로드하기
      </button>
      <Image.Root
        key={key}
        src="https://invalid-url-for-demo.com/error.jpg"
        fallbackSrc="https://images.unsplash.com/photo-1518895949257-7621c3c786d7"
        alt="대체 이미지"
        className="overflow-hidden rounded-lg"
      >
        <Image.View className="h-64 w-96" />
      </Image.Root>
    </div>
  );
};

const fallbackCode = `import { useState } from "react";
import { Image } from "@timeless-ui/ui";

const FallbackDemo = () => {
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => setKey((prev) => prev + 1)}
        className="rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
      >
        다시 로드하기
      </button>
      <Image.Root
        key={key}
        src="https://invalid-url-for-demo.com/error.jpg"
        fallbackSrc="https://images.unsplash.com/photo-1518895949257-7621c3c786d7"
        alt="대체 이미지"
        className="overflow-hidden rounded-lg"
      >
        <Image.View className="h-64 w-96" />
      </Image.Root>
    </div>
  );
};`;

// Status Tracking Demo
const StatusTrackingDemo = () => {
  const [status, setStatus] = useState("idle");
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setKey((prev) => prev + 1);
    setStatus("idle");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleReset}
        className="rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
      >
        다시 로드하기
      </button>
      <div className="rounded-md bg-neutral-100 px-4 py-2 text-sm text-neutral-700">
        현재 상태: <span className="font-semibold">{status}</span>
      </div>
      <Image.Root
        key={key}
        src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e"
        alt="바다 풍경"
        onStatusChange={setStatus}
        className="overflow-hidden rounded-lg"
      >
        <Image.View className="h-64 w-96" />
      </Image.Root>
    </div>
  );
};

const statusTrackingCode = `import { useState } from "react";
import { Image } from "@timeless-ui/ui";

const StatusTrackingDemo = () => {
  const [status, setStatus] = useState("idle");
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setKey((prev) => prev + 1);
    setStatus("idle");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleReset}
        className="rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
      >
        다시 로드하기
      </button>
      <div className="rounded-md bg-neutral-100 px-4 py-2 text-sm text-neutral-700">
        현재 상태: <span className="font-semibold">{status}</span>
      </div>
      <Image.Root
        key={key}
        src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e"
        alt="바다 풍경"
        onStatusChange={setStatus}
        className="overflow-hidden rounded-lg"
      >
        <Image.View className="h-64 w-96" />
      </Image.Root>
    </div>
  );
};`;

// Fit Options Demo
const FitOptionsDemo = () => (
  <div className="grid grid-cols-2 gap-4">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-neutral-700">cover (기본값)</p>
      <Image.Root
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="cover 예시"
        className="overflow-hidden rounded-lg border border-neutral-200"
      >
        <Image.View fit="cover" className="h-48 w-full" />
      </Image.Root>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-neutral-700">contain</p>
      <Image.Root
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="contain 예시"
        className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50"
      >
        <Image.View fit="contain" className="h-48 w-full" />
      </Image.Root>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-neutral-700">fill</p>
      <Image.Root
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="fill 예시"
        className="overflow-hidden rounded-lg border border-neutral-200"
      >
        <Image.View fit="fill" className="h-48 w-full" />
      </Image.Root>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-neutral-700">scale-down</p>
      <Image.Root
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="scale-down 예시"
        className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50"
      >
        <Image.View fit="scale-down" className="h-48 w-full" />
      </Image.Root>
    </div>
  </div>
);

const fitOptionsCode = `import { Image } from "@timeless-ui/ui";

const FitOptionsDemo = () => (
  <div className="grid grid-cols-2 gap-4">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-neutral-700">cover (기본값)</p>
      <Image.Root
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="cover 예시"
        className="overflow-hidden rounded-lg border border-neutral-200"
      >
        <Image.View fit="cover" className="h-48 w-full" />
      </Image.Root>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-neutral-700">contain</p>
      <Image.Root
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="contain 예시"
        className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50"
      >
        <Image.View fit="contain" className="h-48 w-full" />
      </Image.Root>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-neutral-700">fill</p>
      <Image.Root
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="fill 예시"
        className="overflow-hidden rounded-lg border border-neutral-200"
      >
        <Image.View fit="fill" className="h-48 w-full" />
      </Image.Root>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-neutral-700">scale-down</p>
      <Image.Root
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="scale-down 예시"
        className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50"
      >
        <Image.View fit="scale-down" className="h-48 w-full" />
      </Image.Root>
    </div>
  </div>
);`;

// Lazy Loading Demo
const LazyLoadingDemo = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [imageStatus, setImageStatus] = useState("");
  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => setShouldLoad(true)}
        disabled={shouldLoad}
        className="rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        이미지 로드하기
      </button>
      <div className="rounded-md bg-neutral-100 px-4 py-2 text-sm text-neutral-700">
        이미지 상태: <span className="font-semibold">{imageStatus}</span>
      </div>
      <Image.Root
        src="https://images.unsplash.com/photo-1511884642898-4c92249e20b6"
        alt="숲 풍경"
        startLoading={shouldLoad}
        className="overflow-hidden rounded-lg"
        onStatusChange={(status) => {
          setImageStatus(status);
        }}
      >
        <Image.View className="h-64 w-96" />
      </Image.Root>
    </div>
  );
};

const lazyLoadingCode = `import { useState } from "react";
import { Image } from "@timeless-ui/ui";

const LazyLoadingDemo = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => setShouldLoad(true)}
        disabled={shouldLoad}
        className="rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {shouldLoad ? "이미지 로딩 중..." : "이미지 로드하기"}
      </button>
      <Image.Root
        src="https://images.unsplash.com/photo-1511884642898-4c92249e20b6"
        alt="숲 풍경"
        startLoading={shouldLoad}
        className="overflow-hidden rounded-lg"
      >
        <Image.View className="h-64 w-96" />
      </Image.Root>
    </div>
  );
};`;

export { ExampleSection };
