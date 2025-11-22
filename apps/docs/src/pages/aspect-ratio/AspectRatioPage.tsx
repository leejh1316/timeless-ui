import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { AspectRatio } from "@timeless-ui/ui";
import React from "react";

// 실제 AspectRatio 컴포넌트를 import 해야 합니다.
// 예시로 div를 사용하겠습니다.

export function AspectRatioPage() {
  const propsData = [
    {
      prop: "ratio",
      type: "number",
      defaultValue: "1",
      description: "고정할 가로 세로 비율입니다. (가로 / 세로)",
    },
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "내부에 표시될 콘텐츠입니다.",
    },
  ];

  const example1Code = `
import { AspectRatio } from "@/components/ui/AspectRatio";

export function Component() {
  return (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1576075796007-423c5e8f5b6b?w=800"
          alt="Landscape"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  );
}
  `;

  const example2Code = `
import { AspectRatio } from "@/components/ui/AspectRatio";

export function Component() {
  return (
    <div className="w-[300px]">
      <AspectRatio ratio={1}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800"
          alt="Square"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="AspectRatio"
      description="자식 요소의 가로 세로 비율을 고정시켜주는 컨테이너 컴포넌트입니다."
    >
      <ComponentPreview
        title="16:9 비율"
        description="가장 일반적인 비디오 및 디스플레이 비율입니다."
        code={example1Code}
      >
        <div className="w-full max-w-[450px]">
          <AspectRatio
            ratio={16 / 9}
            className="flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700"
          >
            <img
              src="https://placehold.co/800x450/a9a9a9/ffffff?text=16:9+Image"
              alt="Placeholder 16:9"
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="1:1 비율"
        description=" 정사각형 비율로, 프로필 이미지나 갤러리 썸네일에 자주 사용됩니다."
        code={example2Code}
      >
        <div className="w-full max-w-[300px]">
          <AspectRatio ratio={1} className="flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700">
            <img
              src="https://placehold.co/600x600/a9a9a9/ffffff?text=1:1+Image"
              alt="Placeholder 1:1"
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
