import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";
import { useState } from "react";
import { Funnel, useFunnel } from "@timeless-ui/react";

/* ──────────────────────────────────────────────────────────────
 * Example Section
 * ──────────────────────────────────────────────────────────────*/

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>
      실무에서 자주 사용되는 다양한 퍼널 패턴을 확인하세요. 각 예제는 실제 프로덕션 환경에서 활용할 수 있는 구현 방식을 보여줍니다.
    </Document.Paragraph>

    <Document.Heading2>데이터 수집</Document.Heading2>
    <Document.Paragraph mb={6}>
      각 단계에서 입력받은 데이터를 <InlineCode>stepData</InlineCode> prop으로 전달하여 수집할 수 있습니다. 수집된 데이터는{" "}
      <InlineCode>funnel.data</InlineCode>에서 확인할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <DataCollectionDemo />
    </PreviewContainer>
    <CodeBlock code={dataCollectionCode} className="mb-10" />

    <Document.Heading2>제어 컴포넌트</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>step</InlineCode>과 <InlineCode>onStepChange</InlineCode>를 사용하여 외부에서 퍼널 상태를 제어할 수 있습니다. 이를 통해
      URL 동기화나 복잡한 상태 관리가 가능합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ControlledDemo />
    </PreviewContainer>
    <CodeBlock code={controlledCode} className="mb-10" />

    <Document.Heading2>특정 스텝으로 이동</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>funnel.goTo</InlineCode>를 사용하여 순차 진행을 무시하고 특정 단계로 바로 이동할 수 있습니다. 스텝을 건너뛰거나 특정
      단계로 빠르게 점프할 때 유용합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ConditionalStepDemo />
    </PreviewContainer>
    <CodeBlock code={conditionalStepCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────────────────────
 * Data Collection Demo
 * ──────────────────────────────────────────────────────────────*/

type UserData = {
  name?: string;
  email?: string;
  phone?: string;
};

const DataCollectionDemo = () => {
  const [formData, setFormData] = useState<UserData>({});
  const funnel = useFunnel<"이름" | "이메일" | "전화번호", UserData>({
    steps: ["이름", "이메일", "전화번호"] as const,
    defaultData: {},
    onComplete: (data) => {
      setFormData(data);
    },
  });

  return (
    <div className="w-full max-w-md">
      <Funnel.Root funnel={funnel}>
        <Funnel.Step step="이름">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">이름을 입력하세요</h3>
            <input
              type="text"
              defaultValue={funnel.data.name}
              placeholder="홍길동"
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
              onChange={(e) => funnel.updateData({ name: e.target.value })}
            />
            <Funnel.Next
              stepData={{ name: funnel.data.name }}
              className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              다음
            </Funnel.Next>
          </div>
        </Funnel.Step>

        <Funnel.Step step="이메일">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">이메일을 입력하세요</h3>
            <input
              type="email"
              defaultValue={funnel.data.email}
              placeholder="example@email.com"
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
              onChange={(e) => funnel.updateData({ email: e.target.value })}
            />
            <div className="flex gap-2">
              <Funnel.Prev className="flex-1 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                이전
              </Funnel.Prev>
              <Funnel.Next
                stepData={{ email: funnel.data.email }}
                className="flex-1 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
              >
                다음
              </Funnel.Next>
            </div>
          </div>
        </Funnel.Step>

        <Funnel.Step step="전화번호">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">전화번호를 입력하세요</h3>
            <input
              type="tel"
              defaultValue={funnel.data.phone}
              placeholder="010-1234-5678"
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
              onChange={(e) => funnel.updateData({ phone: e.target.value })}
            />
            <div className="flex gap-2">
              <Funnel.Prev className="flex-1 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                이전
              </Funnel.Prev>
              <Funnel.Complete className="flex-1 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
                완료
              </Funnel.Complete>
            </div>
          </div>
        </Funnel.Step>
      </Funnel.Root>

      {Object.keys(formData).length > 0 && (
        <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm font-semibold text-neutral-900">수집된 데이터:</p>
          <pre className="mt-2 text-xs text-neutral-600">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

const dataCollectionCode = `type UserData = {
  name?: string;
  email?: string;
  phone?: string;
};

const DataCollectionDemo = () => {
  const [formData, setFormData] = useState<UserData>({});
  const funnel = useFunnel<"이름" | "이메일" | "전화번호", UserData>({
    steps: ["이름", "이메일", "전화번호"] as const,
    defaultData: {},
    onComplete: (data) => {
      setFormData(data);
    },
  });

  return (
    <div className="w-full max-w-md">
      <Funnel.Root funnel={funnel}>
        <Funnel.Step step="이름">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">이름을 입력하세요</h3>
            <input
              type="text"
              defaultValue={funnel.data.name}
              placeholder="홍길동"
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
              onChange={(e) => funnel.updateData({ name: e.target.value })}
            />
            <Funnel.Next
              stepData={{ name: funnel.data.name }}
              className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              다음
            </Funnel.Next>
          </div>
        </Funnel.Step>

        <Funnel.Step step="이메일">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">이메일을 입력하세요</h3>
            <input
              type="email"
              defaultValue={funnel.data.email}
              placeholder="example@email.com"
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
              onChange={(e) => funnel.updateData({ email: e.target.value })}
            />
            <div className="flex gap-2">
              <Funnel.Prev className="flex-1 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                이전
              </Funnel.Prev>
              <Funnel.Next
                stepData={{ email: funnel.data.email }}
                className="flex-1 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
              >
                다음
              </Funnel.Next>
            </div>
          </div>
        </Funnel.Step>

        <Funnel.Step step="전화번호">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">전화번호를 입력하세요</h3>
            <input
              type="tel"
              defaultValue={funnel.data.phone}
              placeholder="010-1234-5678"
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
              onChange={(e) => funnel.updateData({ phone: e.target.value })}
            />
            <div className="flex gap-2">
              <Funnel.Prev className="flex-1 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                이전
              </Funnel.Prev>
              <Funnel.Complete className="flex-1 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
                완료
              </Funnel.Complete>
            </div>
          </div>
        </Funnel.Step>
      </Funnel.Root>

      {Object.keys(formData).length > 0 && (
        <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm font-semibold text-neutral-900">수집된 데이터:</p>
          <pre className="mt-2 text-xs text-neutral-600">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};`;

/* ──────────────────────────────────────────────────────────────
 * Controlled Demo
 * ──────────────────────────────────────────────────────────────*/

const ControlledDemo = () => {
  const [currentStep, setCurrentStep] = useState<"시작" | "진행중" | "종료">("시작");
  const funnel = useFunnel({
    steps: ["시작", "진행중", "종료"] as const,
    step: currentStep,
    onStepChange: setCurrentStep,
  });

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 flex gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
        <span className="text-sm font-medium text-neutral-700">상태:</span>
        <span className="text-sm text-neutral-900">{currentStep}</span>
      </div>

      <div className="mb-4 flex gap-2 rounded-lg">
        <button
          onClick={() => setCurrentStep("시작")}
          className="rounded-md border border-neutral-300 px-3 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          시작
        </button>
        <button
          onClick={() => setCurrentStep("진행중")}
          className="rounded-md border border-neutral-300 px-3 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          진행중
        </button>
        <button
          onClick={() => setCurrentStep("종료")}
          className="rounded-md border border-neutral-300 px-3 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          종료
        </button>
      </div>

      <Funnel.Root funnel={funnel}>
        <Funnel.Step step="시작">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">시작 단계</h3>
            <p className="text-sm text-neutral-600">외부 상태와 동기화되는 퍼널입니다.</p>
            <Funnel.Next className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
              다음
            </Funnel.Next>
          </div>
        </Funnel.Step>

        <Funnel.Step step="진행중">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">진행 단계</h3>
            <p className="text-sm text-neutral-600">상단의 외부 상태가 업데이트됩니다.</p>
            <div className="flex gap-2">
              <Funnel.Prev className="flex-1 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                이전
              </Funnel.Prev>
              <Funnel.Next className="flex-1 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
                다음
              </Funnel.Next>
            </div>
          </div>
        </Funnel.Step>

        <Funnel.Step step="종료">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">종료 단계</h3>
            <p className="text-sm text-neutral-600">제어 컴포넌트 패턴을 활용한 퍼널입니다.</p>
            <Funnel.Prev className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
              이전
            </Funnel.Prev>
          </div>
        </Funnel.Step>
      </Funnel.Root>
    </div>
  );
};

const controlledCode = `const ControlledDemo = () => {
  const [currentStep, setCurrentStep] = useState<"시작" | "진행중" | "종료">("시작");
  const funnel = useFunnel({
    steps: ["시작", "진행중", "종료"] as const,
    step: currentStep,
    onStepChange: setCurrentStep,
  });


  return (
    <div className="w-full max-w-md">
      <div className="mb-4 flex gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
        <span className="text-sm font-medium text-neutral-700">외부 상태:</span>
        <span className="text-sm text-neutral-900">{currentStep}</span>
      </div>
      
      <div className="mb-4 flex gap-2 rounded-lg">
        <button
          onClick={() => setCurrentStep("시작")}
          className="rounded-md border border-neutral-300 px-3 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          시작
        </button>
        <button
          onClick={() => setCurrentStep("진행중")}
          className="rounded-md border border-neutral-300 px-3 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          진행중
        </button>
        <button
          onClick={() => setCurrentStep("종료")}
          className="rounded-md border border-neutral-300 px-3 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          종료
        </button>
      </div>

      <Funnel.Root funnel={funnel}>
        <Funnel.Step step="시작">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">시작 단계</h3>
            <p className="text-sm text-neutral-600">외부 상태와 동기화되는 퍼널입니다.</p>
            <Funnel.Next className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
              다음
            </Funnel.Next>
          </div>
        </Funnel.Step>

        <Funnel.Step step="진행중">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">진행 단계</h3>
            <p className="text-sm text-neutral-600">상단의 외부 상태가 업데이트됩니다.</p>
            <div className="flex gap-2">
              <Funnel.Prev className="flex-1 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                이전
              </Funnel.Prev>
              <Funnel.Next className="flex-1 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
                다음
              </Funnel.Next>
            </div>
          </div>
        </Funnel.Step>

        <Funnel.Step step="종료">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">종료 단계</h3>
            <p className="text-sm text-neutral-600">제어 컴포넌트 패턴을 활용한 퍼널입니다.</p>
            <Funnel.Prev className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
              이전
            </Funnel.Prev>
          </div>
        </Funnel.Step>
      </Funnel.Root>
    </div>
  );
};`;

/* ──────────────────────────────────────────────────────────────
 * Conditional Step Demo
 * ──────────────────────────────────────────────────────────────*/

const ConditionalStepDemo = () => {
  const funnel = useFunnel({
    steps: ["시작", "1단계", "2단계", "3단계", "완료"] as const,
  });

  return (
    <div className="w-full max-w-md">
      <Funnel.Root funnel={funnel}>
        <Funnel.Step step="시작">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">시작</h3>
            <p className="text-sm text-neutral-600">goTo를 사용하여 특정 단계로 바로 이동할 수 있습니다.</p>
            <div className="flex gap-2">
              <Funnel.Next className="flex-1 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                순차 진행
              </Funnel.Next>
              <button
                onClick={() => funnel.goTo("3단계")}
                className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                3단계로 바로 이동
              </button>
            </div>
          </div>
        </Funnel.Step>

        <Funnel.Step step="1단계">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">1단계</h3>
            <p className="text-sm text-neutral-600">첫 번째 단계입니다.</p>
            <div className="flex gap-2">
              <Funnel.Prev className="flex-1 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                이전
              </Funnel.Prev>
              <Funnel.Next className="flex-1 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
                다음
              </Funnel.Next>
            </div>
          </div>
        </Funnel.Step>

        <Funnel.Step step="2단계">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">2단계</h3>
            <p className="text-sm text-neutral-600">다음 단계를 건너뛰고 바로 완료 단계로 이동할 수 있습니다.</p>
            <div className="flex gap-2">
              <Funnel.Prev className="flex-1 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                이전
              </Funnel.Prev>
              <Funnel.Next className="flex-1 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                다음
              </Funnel.Next>
              <button
                onClick={() => funnel.goTo("완료")}
                className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                건너뛰기
              </button>
            </div>
          </div>
        </Funnel.Step>

        <Funnel.Step step="3단계">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">3단계</h3>
            <p className="text-sm text-neutral-600">마지막 단계입니다.</p>
            <div className="flex gap-2">
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
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">완료</h3>
            <p className="text-sm text-neutral-600">모든 단계가 완료되었습니다.</p>
            <button
              onClick={() => funnel.goTo("시작")}
              className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              처음으로
            </button>
          </div>
        </Funnel.Step>
      </Funnel.Root>
    </div>
  );
};

const conditionalStepCode = `const ConditionalStepDemo = () => {
  const funnel = useFunnel({
    steps: ["시작", "1단계", "2단계", "3단계", "완료"] as const,
  });

  return (
    <div className="w-full max-w-md">
      <Funnel.Root funnel={funnel}>
        <Funnel.Step step="시작">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">시작</h3>
            <p className="text-sm text-neutral-600">goTo를 사용하여 특정 단계로 바로 이동할 수 있습니다.</p>
            <div className="flex gap-2">
              <Funnel.Next className="flex-1 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                순차 진행
              </Funnel.Next>
              <button
                onClick={() => funnel.goTo("3단계")}
                className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                3단계로 바로 이동
              </button>
            </div>
          </div>
        </Funnel.Step>

        <Funnel.Step step="1단계">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">1단계</h3>
            <p className="text-sm text-neutral-600">첫 번째 단계입니다.</p>
            <div className="flex gap-2">
              <Funnel.Prev className="flex-1 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                이전
              </Funnel.Prev>
              <Funnel.Next className="flex-1 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
                다음
              </Funnel.Next>
            </div>
          </div>
        </Funnel.Step>

        <Funnel.Step step="2단계">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">2단계</h3>
            <p className="text-sm text-neutral-600">다음 단계를 건너뛰고 바로 완료 단계로 이동할 수 있습니다.</p>
            <div className="flex gap-2">
              <Funnel.Prev className="flex-1 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                이전
              </Funnel.Prev>
              <Funnel.Next className="flex-1 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                다음
              </Funnel.Next>
              <button
                onClick={() => funnel.goTo("완료")}
                className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                건너뛰기
              </button>
            </div>
          </div>
        </Funnel.Step>

        <Funnel.Step step="3단계">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">3단계</h3>
            <p className="text-sm text-neutral-600">마지막 단계입니다.</p>
            <div className="flex gap-2">
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
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-neutral-900">완료</h3>
            <p className="text-sm text-neutral-600">모든 단계가 완료되었습니다.</p>
            <button
              onClick={() => funnel.goTo("시작")}
              className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              처음으로
            </button>
          </div>
        </Funnel.Step>
      </Funnel.Root>
    </div>
  );
};`;

export { ExampleSection };
