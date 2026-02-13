import { PropsTable } from "@src/components/common";
import { AnatomyCard } from "@src/components/common/AnatomyCard";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { AlertDialog } from "@timeless-ui/ui";
import { useState } from "react";
/* ──────────────────────────────────────────────
   Section Components
   ────────────────────────────────────────────── */

/** 페이지 최상단 Hero 영역 */
const PageHeader = () => (
  <section className="border-line-light border-b pb-10">
    <p className="text-body-2 text-primary mb-2 font-semibold">Component</p>
    <h1 className="text-headline-2 font-bold">AlertDialog</h1>
    <p className="text-body-1 text-ink-secondary mt-3 max-w-2xl">
      사용자에게 중요한 정보를 전달하거나 확인을 요청하는 모달 대화상자입니다.
      <br />
      접근성을 준수하며, 사용자가 명시적으로 응답하기 전까지 상호작용을 차단합니다.
    </p>
  </section>
);

/* ──────── Preview Container ──────── */
const PreviewContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`border-line-regular flex min-h-[200px] items-center justify-center rounded-2xl border bg-white p-10 ${className}`}>
    {children}
  </div>
);

/* ──────── Code Block (간이) ──────── */
const Code = ({ children }: { children: string }) => (
  <pre className="scrollbar overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-50 p-5 text-[13px] leading-relaxed">
    <code className="font-code text-ink-primary">{children}</code>
  </pre>
);

/* ──────── Inline Code ──────── */
const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="font-code rounded-md bg-neutral-100 px-1.5 py-0.5 text-[13px] text-rose-600">{children}</code>
);

/* ──────── Section Title ──────── */
const SectionTitle = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-headline-5 scroll-mt-20 font-bold">
    {children}
  </h2>
);

const SubSectionTitle = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h3 id={id} className="text-title-3 scroll-mt-20 font-semibold">
    {children}
  </h3>
);

/* ──────────────────────────────────────────────
   Demo : Basic
   ────────────────────────────────────────────── */
const BasicDemo = () => (
  <AlertDialog.Root>
    <AlertDialog.Trigger className="inline-flex h-10 items-center justify-center rounded-lg bg-neutral-900 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 active:bg-neutral-950">
      삭제하기
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="z-1000 fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
      <AlertDialog.Content className="z-1000 fixed left-1/2 top-1/2 w-[min(90vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-title-3 font-semibold">정말 삭제하시겠습니까?</h3>
        <p className="text-body-2 text-ink-secondary mt-2">이 작업은 되돌릴 수 없습니다. 데이터가 영구적으로 삭제됩니다.</p>
        <div className="mt-6 flex justify-end gap-3">
          <AlertDialog.Cancel className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
            취소
          </AlertDialog.Cancel>
          <AlertDialog.Action className="inline-flex h-9 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700">
            삭제
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

/* ──────────────────────────────────────────────
   Demo : Controlled
   ────────────────────────────────────────────── */
const ControlledDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger className="bg-primary hover:bg-primary-700 active:bg-primary-800 inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-semibold text-white shadow-sm transition-colors">
          구독 취소
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="z-1000 fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
          <AlertDialog.Content className="z-1000 fixed left-1/2 top-1/2 w-[min(90vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-title-3 font-semibold">구독을 취소하시겠습니까?</h3>
            <p className="text-body-2 text-ink-secondary mt-2">현재 구독 기간이 끝나면 프리미엄 기능을 이용할 수 없습니다.</p>
            <div className="mt-6 flex justify-end gap-3">
              <AlertDialog.Cancel className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
                유지하기
              </AlertDialog.Cancel>
              <AlertDialog.Action className="inline-flex h-9 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700">
                구독 취소
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
      <span className="text-body-3 text-ink-tertiary">
        상태: <InlineCode>{open ? "open" : "closed"}</InlineCode>
      </span>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Demo : Non-dismissable
   ────────────────────────────────────────────── */
const NonDismissableDemo = () => (
  <AlertDialog.Root isDismissable={false}>
    <AlertDialog.Trigger className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 text-sm font-semibold text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50 active:bg-neutral-100">
      약관 동의
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="z-1000 fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
      <AlertDialog.Content className="z-1000 fixed left-1/2 top-1/2 w-[min(90vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-title-3 font-semibold">서비스 이용약관에 동의해 주세요</h3>
        <p className="text-body-2 text-ink-secondary mt-2">서비스를 이용하려면 약관에 동의해야 합니다. 외부 클릭으로 닫을 수 없습니다.</p>
        <div className="mt-6 flex justify-end gap-3">
          <AlertDialog.Cancel className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
            거부
          </AlertDialog.Cancel>
          <AlertDialog.Action className="inline-flex h-9 items-center justify-center rounded-lg bg-neutral-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-neutral-800">
            동의
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

/* ──────────────────────────────────────────────
   Demo : Async Action
   ────────────────────────────────────────────── */
const AsyncActionDemo = () => {
  const [loading, setLoading] = useState(false);

  const handleAction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 자동 닫힘 방지
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="inline-flex h-10 items-center justify-center rounded-lg bg-amber-500 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 active:bg-amber-700">
        계정 비활성화
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="z-1000 fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
        <AlertDialog.Content className="z-1000 fixed left-1/2 top-1/2 w-[min(90vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
          <h3 className="text-title-3 font-semibold">계정을 비활성화하시겠습니까?</h3>
          <p className="text-body-2 text-ink-secondary mt-2">비활성화 후 30일 이내에 다시 활성화할 수 있습니다.</p>
          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel
              disabled={loading}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50"
            >
              취소
            </AlertDialog.Cancel>
            <AlertDialog.Action
              onClick={handleAction}
              disabled={loading}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-amber-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  처리 중...
                </span>
              ) : (
                "비활성화"
              )}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

/* ──────────────────────────────────────────────
   Props Table
   ────────────────────────────────────────────── */
interface PropRow {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

const PropsTableComp = ({ title, data }: { title: string; data: PropRow[] }) => (
  <div>
    <h4 className="text-title-4 mb-3 font-semibold">{title}</h4>
    <div className="overflow-x-auto rounded-xl border border-neutral-200">
      <PropsTable rows={data} />
    </div>
  </div>
);

/* ──────────────────────────────────────────────
   Props Data
   ────────────────────────────────────────────── */
const rootProps: PropRow[] = [
  { name: "open", type: "boolean", defaultValue: "—", description: "다이얼로그의 열림 상태를 제어합니다." },
  { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "초기 열림 상태를 설정합니다." },
  { name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "—", description: "열림 상태가 변경될 때 호출됩니다." },
  { name: "isDismissable", type: "boolean", defaultValue: "true", description: "오버레이 클릭 시 닫힘 여부를 설정합니다." },
  { name: "lockScroll", type: "boolean", defaultValue: "—", description: "열린 상태에서 스크롤 잠금 여부를 설정합니다." },
  {
    name: "onCloseAfter",
    type: "() => void",
    defaultValue: "—",
    description: "닫힘 애니메이션이 완료된 후 호출됩니다.",
  },
];

const triggerProps: PropRow[] = [
  {
    name: "onClick",
    type: "(e: MouseEvent) => void | Promise<void>",
    defaultValue: "—",
    description: "클릭 시 호출됩니다. Promise를 반환하면 완료 후 다이얼로그가 열립니다.",
  },
];

const actionCancelProps: PropRow[] = [
  {
    name: "onClick",
    type: "(e: MouseEvent) => void | Promise<void>",
    defaultValue: "—",
    description: "클릭 시 호출됩니다. preventDefault()를 호출하면 자동 닫힘을 방지할 수 있습니다.",
  },
];

/* ──────────────────────────────────────────────
   Main Page
   ────────────────────────────────────────────── */
const AlertDialogPage = () => {
  return (
    <div className="space-y-16 pb-20">
      <PageHeader />

      {/* ─── Installation ─── */}
      <section className="space-y-4">
        <SectionTitle id="installation">Installation</SectionTitle>
        <Code>{`import { AlertDialog } from "@timeless-ui/ui";`}</Code>
      </section>

      {/* ─── Basic Usage ─── */}
      <section className="space-y-5">
        <SectionTitle id="basic-usage">Basic Usage</SectionTitle>
        <p className="text-body-2 text-ink-secondary">
          가장 기본적인 AlertDialog 사용 예시입니다. Trigger 버튼을 클릭하면 다이얼로그가 열리고, Cancel 또는 Action 버튼으로 닫을 수
          있습니다.
        </p>
        <PreviewContainer>
          <BasicDemo />
        </PreviewContainer>
        <CodeBlock
          code={`<AlertDialog.Root>
  <AlertDialog.Trigger>삭제하기</AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Overlay />
    <AlertDialog.Content>
      <h3>정말 삭제하시겠습니까?</h3>
      <p>이 작업은 되돌릴 수 없습니다.</p>
      <AlertDialog.Cancel>취소</AlertDialog.Cancel>
      <AlertDialog.Action>삭제</AlertDialog.Action>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>`}
        ></CodeBlock>
        <Code>
          {`<AlertDialog.Root>
  <AlertDialog.Trigger>삭제하기</AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Overlay />
    <AlertDialog.Content>
      <h3>정말 삭제하시겠습니까?</h3>
      <p>이 작업은 되돌릴 수 없습니다.</p>
      <AlertDialog.Cancel>취소</AlertDialog.Cancel>
      <AlertDialog.Action>삭제</AlertDialog.Action>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>`}
        </Code>
      </section>

      {/* ─── Controlled ─── */}
      <section className="space-y-5">
        <SectionTitle id="controlled">Controlled</SectionTitle>
        <p className="text-body-2 text-ink-secondary">
          <InlineCode>open</InlineCode>과 <InlineCode>onOpenChange</InlineCode>를 사용하여 외부에서 열림 상태를 직접 제어할 수 있습니다.
        </p>
        <PreviewContainer>
          <ControlledDemo />
        </PreviewContainer>
        <Code>
          {`const [open, setOpen] = useState(false);

<AlertDialog.Root open={open} onOpenChange={setOpen}>
  <AlertDialog.Trigger>구독 취소</AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Overlay />
    <AlertDialog.Content>
      <h3>구독을 취소하시겠습니까?</h3>
      <AlertDialog.Cancel>유지하기</AlertDialog.Cancel>
      <AlertDialog.Action>구독 취소</AlertDialog.Action>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>`}
        </Code>
      </section>

      {/* ─── Non-dismissable ─── */}
      <section className="space-y-5">
        <SectionTitle id="non-dismissable">Non-dismissable</SectionTitle>
        <p className="text-body-2 text-ink-secondary">
          <InlineCode>isDismissable=&#123;false&#125;</InlineCode>를 설정하면 오버레이 클릭으로 닫을 수 없습니다. 사용자가 반드시 버튼을
          통해 응답해야 합니다.
        </p>
        <PreviewContainer>
          <NonDismissableDemo />
        </PreviewContainer>
        <Code>
          {`<AlertDialog.Root isDismissable={false}>
  <AlertDialog.Trigger>약관 동의</AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Overlay />
    <AlertDialog.Content>
      <h3>서비스 이용약관에 동의해 주세요</h3>
      <AlertDialog.Cancel>거부</AlertDialog.Cancel>
      <AlertDialog.Action>동의</AlertDialog.Action>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>`}
        </Code>
      </section>

      {/* ─── Async Action ─── */}
      <section className="space-y-5">
        <SectionTitle id="async-action">Async Action</SectionTitle>
        <p className="text-body-2 text-ink-secondary">
          Action 버튼의 <InlineCode>onClick</InlineCode>에서 <InlineCode>preventDefault()</InlineCode>를 호출하고 비동기 작업을 수행할 수
          있습니다. 작업이 완료될 때까지 로딩 상태를 표시하는 예시입니다.
        </p>
        <PreviewContainer>
          <AsyncActionDemo />
        </PreviewContainer>
        <Code>
          {`const handleAction = async (e) => {
  e.preventDefault(); // 자동 닫힘 방지
  setLoading(true);
  await someAsyncOperation();
  setLoading(false);
};

<AlertDialog.Action onClick={handleAction}>
  {loading ? "처리 중..." : "비활성화"}
</AlertDialog.Action>`}
        </Code>
      </section>

      {/* ─── Anatomy ─── */}
      <section className="space-y-5">
        <SectionTitle id="anatomy">Anatomy</SectionTitle>
        <p className="text-body-2 text-ink-secondary">AlertDialog는 다음과 같은 하위 컴포넌트로 구성됩니다.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: "AlertDialog.Root", desc: "상태를 관리하는 최상위 컨테이너" },
            { name: "AlertDialog.Trigger", desc: "다이얼로그를 여는 버튼" },
            { name: "AlertDialog.Portal", desc: "DOM 트리 밖에 렌더링하는 포털" },
            { name: "AlertDialog.Overlay", desc: "배경 오버레이 레이어" },
            { name: "AlertDialog.Content", desc: "다이얼로그 콘텐츠 영역" },
            { name: "AlertDialog.Cancel", desc: "취소 버튼 (닫힘 동작 포함)" },
            { name: "AlertDialog.Action", desc: "확인/실행 버튼 (닫힘 동작 포함)" },
          ].map((item) => (
            <AnatomyCard key={item.name} title={item.name} description={item.desc} />
            // <div key={item.name} className="flex items-start gap-3 rounded-xl border border-neutral-200 p-4">
            //   <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-neutral-900" />
            //   <div>
            //     <p className="font-code text-body-3 font-semibold">{item.name}</p>
            //     <p className="text-body-4 text-ink-tertiary mt-0.5">{item.desc}</p>
            //   </div>
            // </div>
          ))}
        </div>
      </section>

      {/* ─── API Reference ─── */}
      <section className="space-y-8">
        <SectionTitle id="api-reference">API Reference</SectionTitle>

        <SubSectionTitle id="root-props">Root</SubSectionTitle>
        <PropsTableComp title="" data={rootProps} />

        <SubSectionTitle id="trigger-props">Trigger</SubSectionTitle>
        <p className="text-body-2 text-ink-secondary">
          <InlineCode>Button</InlineCode> 컴포넌트를 확장합니다. 모든 버튼 속성을 지원합니다.
        </p>
        <PropsTableComp title="" data={triggerProps} />

        <SubSectionTitle id="portal-props">Portal</SubSectionTitle>
        <p className="text-body-2 text-ink-secondary">
          Floating UI의 <InlineCode>FloatingPortalProps</InlineCode>를 확장합니다.
        </p>

        <SubSectionTitle id="overlay-props">Overlay</SubSectionTitle>
        <p className="text-body-2 text-ink-secondary">
          <InlineCode>div</InlineCode> 엘리먼트의 모든 속성을 지원합니다. <InlineCode>data-status</InlineCode>와{" "}
          <InlineCode>data-state</InlineCode> 속성으로 애니메이션을 제어할 수 있습니다.
        </p>

        <SubSectionTitle id="content-props">Content</SubSectionTitle>
        <p className="text-body-2 text-ink-secondary">
          <InlineCode>div</InlineCode> 엘리먼트의 모든 속성을 지원합니다. <InlineCode>role=&quot;alertdialog&quot;</InlineCode>와{" "}
          <InlineCode>aria-modal=&quot;true&quot;</InlineCode>가 자동으로 적용됩니다.
        </p>

        <SubSectionTitle id="cancel-action-props">Cancel / Action</SubSectionTitle>
        <PropsTableComp title="" data={actionCancelProps} />
      </section>

      {/* ─── Accessibility ─── */}
      <section className="space-y-5">
        <SectionTitle id="accessibility">Accessibility</SectionTitle>
        <div className="space-y-3">
          {[
            'role="alertdialog" 와 aria-modal="true"가 Content에 자동 적용됩니다.',
            "열린 상태에서 포커스가 다이얼로그 내부로 트랩됩니다.",
            "ESC 키 또는 오버레이 클릭으로 닫을 수 있습니다 (isDismissable 설정에 따라).",
            "닫힐 때 포커스가 Trigger 요소로 자동 복원됩니다.",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-body-2 text-ink-secondary">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AlertDialogPage;
