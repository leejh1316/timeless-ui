import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";
import { Funnel, useFunnel } from "@timeless-ui/react";

/* ──────────────────────────────────────────────────────────────
 * Basic Usage Section
 * ──────────────────────────────────────────────────────────────*/

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      Funnel 컴포넌트는 다단계 프로세스를 구현할 때 사용합니다. <InlineCode>useFunnel</InlineCode> 훅으로 퍼널 상태를 관리하고,{" "}
      <InlineCode>Funnel.Root</InlineCode>에 전달하여 각 스텝을 렌더링합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

const BasicDemo = () => {
  const funnel = useFunnel({
    steps: ["약관동의", "정보입력", "완료"] as const,
    onComplete: () => {
      alert("퍼널이 완료되었습니다!");
    },
  });

  return (
    <Funnel.Root funnel={funnel}>
      <Funnel.Step step="약관동의">
        <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-neutral-900">서비스 이용약관</h3>
          <p className="text-sm text-neutral-600">서비스 이용약관에 동의해주세요.</p>
          <Funnel.Next className="mt-4 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
            다음
          </Funnel.Next>
        </div>
      </Funnel.Step>

      <Funnel.Step step="정보입력">
        <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-neutral-900">기본 정보 입력</h3>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
          />
          <div className="mt-4 flex gap-2">
            <Funnel.Prev className="flex-1 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
              이전
            </Funnel.Prev>
            <Funnel.Next className="flex-1 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
              다음
            </Funnel.Next>
          </div>
        </div>
      </Funnel.Step>

      <Funnel.Step step="완료">
        <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-neutral-900">가입 완료</h3>
          <p className="text-sm text-neutral-600">회원가입이 완료되었습니다!</p>
          <Funnel.Complete className="mt-4 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
            확인
          </Funnel.Complete>
        </div>
      </Funnel.Step>
    </Funnel.Root>
  );
};

const basicCode = `const BasicDemo = () => {
  const funnel = useFunnel({
    steps: ["약관동의", "정보입력", "완료"] as const,
    onComplete: () => alert("퍼널이 완료되었습니다!"),
  });

  return (
    <Funnel.Root funnel={funnel}>
      <Funnel.Step step="약관동의">
        <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-neutral-900">서비스 이용약관</h3>
          <p className="text-sm text-neutral-600">서비스 이용약관에 동의해주세요.</p>
          <Funnel.Next className="mt-4 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
            다음
          </Funnel.Next>
        </div>
      </Funnel.Step>

      <Funnel.Step step="정보입력">
        <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-neutral-900">기본 정보 입력</h3>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
          />
          <div className="mt-4 flex gap-2">
            <Funnel.Prev className="flex-1 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
              이전
            </Funnel.Prev>
            <Funnel.Next className="flex-1 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
              다음
            </Funnel.Next>
          </div>
        </div>
      </Funnel.Step>

      <Funnel.Step step="완료">
        <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-neutral-900">가입 완료</h3>
          <p className="text-sm text-neutral-600">회원가입이 완료되었습니다!</p>
          <Funnel.Complete className="mt-4 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
            확인
          </Funnel.Complete>
        </div>
      </Funnel.Step>
    </Funnel.Root>
  );
};`;

export { BasicUsageSection };
