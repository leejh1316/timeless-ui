import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Button } from "@timeless-ui/ui";

export default function ButtonPage() {
  const propsData = [
    {
      prop: "loading",
      type: "boolean",
      defaultValue: "false",
      description: "버튼을 로딩 상태로 만듭니다.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "버튼을 비활성화합니다.",
    },
  ];

  const exampleCode = `
import { Button } from "@timeless-ui/ui";

export function Component() {
  return (
    <Button
      className="rounded-md bg-blue-500 px-4 py-2 text-white data-[hovered=true]:bg-blue-600 data-[pressed=true]:bg-blue-700"
    >
      Button
    </Button>
  );
}
`;

  const loadingExampleCode = `
import { Button } from "@timeless-ui/ui";

export function Component() {
  return (
    <Button
      loading
      className="rounded-md bg-blue-500 px-4 py-2 text-white data-[hovered=true]:bg-blue-600 data-[pressed=true]:bg-blue-700"
    >
      Button
    </Button>
  );
}
`;

  const disabledExampleCode = `
import { Button } from "@timeless-ui/ui";

export function Component() {
  return (
    <Button
      disabled
      className="rounded-md bg-gray-300 px-4 py-2 text-gray-500"
    >
      Button
    </Button>
  );
}
`;

  return (
    <ComponentPageLayout title="Button" description="다양한 상태를 가지는 버튼 컴포넌트입니다.">
      <ComponentPreview title="Default" code={exampleCode}>
        <Button className="rounded-md bg-blue-500 px-4 py-2 text-white data-[hovered=true]:bg-blue-600 data-[pressed=true]:bg-blue-700">
          Button
        </Button>
      </ComponentPreview>
      <ComponentPreview title="Loading" code={loadingExampleCode}>
        <Button
          loading
          className="rounded-md bg-blue-500 px-4 py-2 text-white data-[disabled=true]:bg-blue-500/30 data-[hovered=true]:bg-blue-600 data-[pressed=true]:bg-blue-700"
        >
          Button(html 속성 data에서 disabled=true 처리 됩니다.)
        </Button>
      </ComponentPreview>
      <ComponentPreview title="Disabled" code={disabledExampleCode}>
        <Button disabled className="rounded-md bg-gray-300 px-4 py-2 text-gray-500">
          Button
        </Button>
      </ComponentPreview>
      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
