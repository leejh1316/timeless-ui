import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Image, InView } from "@timeless-ui/ui";

export default function ImagePage() {
  const propsData = [
    {
      prop: "src",
      type: "string",
      defaultValue: "-",
      description: "이미지의 주소(URL)입니다.",
    },
    {
      prop: "alt",
      type: "string",
      defaultValue: "-",
      description: "이미지의 대체 텍스트입니다.",
    },
    {
      prop: "fallbackSrc",
      type: "string",
      defaultValue: "-",
      description: "기본 src 로딩에 실패했을 때 보여줄 대체 이미지 주소입니다.",
    },
    {
      prop: "fit",
      type: "'fill' | 'contain' | 'cover' | 'none' | 'scale-down'",
      defaultValue: "'cover'",
      description: "CSS의 object-fit 속성과 동일하게 작동합니다.",
    },
    {
      prop: "startLoading",
      type: "boolean",
      defaultValue: "true",
      description: "false로 설정 시 이미지 로딩을 시작하지 않습니다. 지연 로딩에 유용합니다.",
    },
    {
      prop: "onStatusChange",
      type: "(status: ImageStatus) => void",
      defaultValue: "-",
      description: "이미지의 로딩 상태가 변경될 때마다 호출되는 콜백 함수입니다.",
    },
  ];

  const example1Code = `
import { Image } from "@/components/ui/Image";

export function Component() {
  return (
    <div className="w-64 h-40">
      <Image 
        src="https://images.unsplash.com/photo-1576075796007-423c5e8f5b6b"
        alt="A beautiful landscape"
        fit="cover"
        className="w-full h-full rounded-md"
      />
    </div>
  );
}
  `;

  const example2Code = `
import { Image } from "@/components/ui/Image";

export function Component() {
  return (
    <div className="w-64 h-40">
      <Image 
        src="https://invalid-url/image.jpg" // 존재하지 않는 이미지 주소
        fallbackSrc="https://placehold.co/600x400/f87171/ffffff?text=Fallback"
        alt="Fallback example"
        fit="contain"
        className="w-full h-full rounded-md bg-gray-100 dark:bg-gray-800"
      />
    </div>
  );
}
  `;

  const example3Code = `
import { Image } from "@/components/ui/Image";
import { InView } from "@/components/ui/InView";
import { useState } from "react";

export function Component() {
  const [shouldLoad, setShouldLoad] = useState(false);

  return (
    <InView onEnter={() => setShouldLoad(true)} once={true}>
      <div className="w-64 h-40 bg-gray-200 dark:bg-gray-800 rounded-md">
        <Image 
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174"
          alt="Lazy loaded office"
          fit="cover"
          startLoading={shouldLoad}
          className="w-full h-full rounded-md"
        />
      </div>
    </InView>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="Image"
      description="이미지 로딩 상태 관리와 폴백(Fallback) 기능을 지원하여 안정적인 이미지 표시를 돕는 컴포넌트입니다."
    >
      <ComponentPreview
        title="기본 사용법"
        description="`fit` 속성을 사용하여 컨테이너에 이미지를 채울 수 있습니다. `cover`, `contain` 등 다양한 옵션을 제공합니다."
        code={example1Code}
      >
        <div className="h-70 w-64">
          <Image.Root
            src="https://picsum.photos/400?random=2"
            alt="A beautiful landscape"
            className="h-full w-full rounded-lg object-cover data-[status=loading]:bg-gray-500"
          >
            <Image.View fit="cover" className="h-full" />
          </Image.Root>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="폴백(Fallback) 이미지"
        description="기본 `src` 로딩에 실패하면 `fallbackSrc`에 지정된 이미지를 대신 보여줍니다."
        code={example2Code}
      >
        <div className="h-70 w-64">
          <Image.Root
            src="https://picsum.photo33s/400?random=5"
            fallbackSrc="https://placehold.co/600x400/f87171/ffffff?text=Fallback"
            alt="Fallback example"
            className="h-full w-full rounded-lg bg-gray-100 dark:bg-gray-800"
          >
            <Image.View fit="contain" className="h-full" />
          </Image.Root>
        </div>
      </ComponentPreview>
      <ComponentPreview
        title="지연 로딩(Lazy Loading)"
        description="InView 컴포넌트와 함께 사용하여 이미지가 뷰포트에 들어왔을 때 로딩을 시작할 수 있습니다."
        code={example3Code}
      >
        <div className="h-72 w-full overflow-y-scroll rounded-lg border bg-gray-100 p-8 dark:border-gray-700 dark:bg-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400">
            아래로 스크롤하여 이미지를 로드하세요 👇
          </p>
          <div className="h-96"></div>
          {/* InView와 Image를 결합한 실제 구현 예제 */}
          <InView once={true}>
            {({ isVisible }) => (
              <div className="h-48 w-full max-w-[400px] rounded-lg bg-gray-200 dark:bg-gray-700">
                <Image.Root
                  src="https://picsum.photos/400?random=1"
                  alt="Lazy loaded office"
                  startLoading={isVisible}
                  className="h-full w-full rounded-lg object-cover"
                >
                  <Image.View fit="cover" className="h-full w-full" />
                </Image.Root>
              </div>
            )}
          </InView>
          <div className="h-80"></div>
        </div>
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
