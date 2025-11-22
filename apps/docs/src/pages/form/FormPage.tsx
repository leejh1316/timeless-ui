import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Form } from "@timeless-ui/ui";
import { useState } from "react";

export default function FormPage() {
  const propsData = [
    {
      prop: "onClearServerErrors",
      type: "() => void",
      defaultValue: "-",
      description: "서버 에러를 초기화할 때 호출되는 콜백 함수입니다.",
    },
    {
      prop: "onSubmit",
      type: "React.FormEventHandler",
      defaultValue: "-",
      description: "폼 제출 시 호출되는 이벤트 핸들러입니다.",
    },
  ];

  const example1Code = `
import { Form } from "@timeless-ui/ui";

export function Component() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(Object.fromEntries(formData));
  };

  return (
    <Form.Root onSubmit={handleSubmit} className="w-[260px] space-y-4">
      <Form.Field name="email" className="grid gap-1">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-sm font-medium text-gray-900 dark:text-gray-100">
            이메일
          </Form.Label>
          <Form.Message
            className="text-xs text-red-500 opacity-80"
            match="valueMissing"
          >
            이메일을 입력해주세요
          </Form.Message>
          <Form.Message
            className="text-xs text-red-500 opacity-80"
            match="typeMismatch"
          >
            유효한 이메일 주소를 입력해주세요
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-blackA2 px-[10px] text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-violet11 hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] dark:bg-white/5 dark:text-white dark:shadow-white/20 dark:hover:shadow-white/40 dark:focus:shadow-white/60"
            type="email"
            required
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="password" className="grid gap-1">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-sm font-medium text-gray-900 dark:text-gray-100">
            비밀번호
          </Form.Label>
          <Form.Message
            className="text-xs text-red-500 opacity-80"
            match="valueMissing"
          >
            비밀번호를 입력해주세요
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-blackA2 px-[10px] text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-violet11 hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] dark:bg-white/5 dark:text-white dark:shadow-white/20 dark:hover:shadow-white/40 dark:focus:shadow-white/60"
            type="password"
            required
          />
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild>
        <button className="mt-2 box-border inline-flex h-[35px] w-full items-center justify-center rounded-[4px] bg-green-600 px-[15px] font-medium leading-none text-white shadow-[0_2px_10px] shadow-blackA4 hover:bg-green-700 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none dark:bg-green-700 dark:hover:bg-green-600">
          로그인
        </button>
      </Form.Submit>
    </Form.Root>
  );
}
  `;

  return (
    <ComponentPageLayout title="Form" description="접근성과 유효성 검사 기능을 제공하는 폼 컴포넌트입니다.">
      <ComponentPreview
        title="기본 로그인 폼"
        description="이메일과 비밀번호를 입력받는 기본적인 로그인 폼 예제입니다. HTML5 유효성 검사 속성(required, type='email')을 사용하여 클라이언트 측 유효성 검사를 수행합니다."
        code={example1Code}
      >
        <Form.Root
          className="w-[260px] space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            alert(JSON.stringify(Object.fromEntries(formData), null, 2));
          }}
        >
          <Form.Field name="email" className="grid gap-1">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-sm font-medium text-gray-900 dark:text-gray-100">이메일</Form.Label>
              <Form.Message className="text-xs text-red-500 opacity-80" match="valueMissing">
                이메일을 입력해주세요
              </Form.Message>
              <Form.Message className="text-xs text-red-500 opacity-80" match="typeMismatch">
                유효한 이메일 주소를 입력해주세요
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="bg-blackA2 text-violet11 shadow-blackA6 selection:bg-blackA6 selection:text-violet11 box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] dark:bg-white/5 dark:text-white dark:shadow-white/20 dark:hover:shadow-white/40 dark:focus:shadow-white/60"
                type="email"
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Field name="password" className="grid gap-1">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-sm font-medium text-gray-900 dark:text-gray-100">비밀번호</Form.Label>
              <Form.Message className="text-xs text-red-500 opacity-80" match="valueMissing">
                비밀번호를 입력해주세요
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="bg-blackA2 text-violet11 shadow-blackA6 selection:bg-blackA6 selection:text-violet11 box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] dark:bg-white/5 dark:text-white dark:shadow-white/20 dark:hover:shadow-white/40 dark:focus:shadow-white/60"
                type="password"
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Submit asChild>
            <button className="shadow-blackA4 mt-2 box-border inline-flex h-[35px] w-full items-center justify-center rounded-[4px] bg-green-600 px-[15px] font-medium leading-none text-white shadow-[0_2px_10px] hover:bg-green-700 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none dark:bg-green-700 dark:hover:bg-green-600">
              로그인
            </button>
          </Form.Submit>
        </Form.Root>
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
