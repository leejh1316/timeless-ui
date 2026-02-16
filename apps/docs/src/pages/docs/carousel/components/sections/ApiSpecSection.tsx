import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";
import { CodeBlock } from "@src/components/common";

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>
      Carousel 컴포넌트의 모든 하위 컴포넌트, Props, 커스텀 타입 및 Data Attribute에 대한 상세 명세입니다.
    </Document.Paragraph>

    <Document.Heading2>Carousel.Root</Document.Heading2>
    <Document.Paragraph mb={4}>캐러셀의 최상위 컨테이너 컴포넌트입니다.</Document.Paragraph>
    <PropsTable rows={rootProps} />

    <Document.Heading2>Carousel.Container</Document.Heading2>
    <Document.Paragraph mb={4}>
      슬라이드 뷰포트를 정의하는 컴포넌트입니다. 표준 <InlineCode>div</InlineCode> Props를 모두 지원합니다.
    </Document.Paragraph>

    <Document.Heading2>Carousel.Track</Document.Heading2>
    <Document.Paragraph mb={4}>
      슬라이드 트랙 컨테이너입니다. 표준 <InlineCode>div</InlineCode> Props를 모두 지원합니다.
    </Document.Paragraph>

    <Document.Heading2>Carousel.Item</Document.Heading2>
    <Document.Paragraph mb={4}>
      개별 슬라이드 아이템입니다. 표준 <InlineCode>div</InlineCode> Props를 모두 지원합니다.
    </Document.Paragraph>

    <Document.Heading2>Carousel.PrevButton / Carousel.NextButton</Document.Heading2>
    <Document.Paragraph mb={4}>이전/다음 슬라이드로 이동하는 네비게이션 버튼 컴포넌트입니다.</Document.Paragraph>
    <PropsTable rows={navigationButtonProps} />

    <Document.Heading2>Carousel.CurrentIndex</Document.Heading2>
    <Document.Paragraph mb={4}>
      현재 슬라이드의 인덱스를 표시하는 컴포넌트입니다. 1부터 시작하는 값을 자동으로 렌더링합니다.
    </Document.Paragraph>
    <PropsTable rows={currentIndexProps} />

    <Document.Heading2>Carousel.TotalCount</Document.Heading2>
    <Document.Paragraph mb={4}>전체 슬라이드 개수를 표시하는 컴포넌트입니다. 값을 자동으로 렌더링합니다.</Document.Paragraph>
    <PropsTable rows={totalCountProps} />

    <Document.Heading2>Carousel.IndicatorWrapper</Document.Heading2>
    <Document.Paragraph mb={4}>인디케이터들을 감싸는 컨테이너 컴포넌트입니다.</Document.Paragraph>
    <PropsTable rows={indicatorWrapperProps} />

    <Document.Heading2>Carousel.Indicator</Document.Heading2>
    <Document.Paragraph mb={4}>개별 인디케이터 버튼 컴포넌트입니다.</Document.Paragraph>
    <PropsTable rows={indicatorProps} />

    <Document.Heading2>커스텀 타입</Document.Heading2>

    <Document.Heading3>CarouselApi</Document.Heading3>
    <Document.Paragraph mb={4}>
      Embla Carousel의 API 인스턴스 타입입니다. <InlineCode>setApi</InlineCode>를 통해 얻을 수 있으며, 캐러셀을 프로그래밍 방식으로 제어할
      수 있습니다.
    </Document.Paragraph>
    <CodeBlock code={`type CarouselApi = UseEmblaCarouselType[1]`} language="typescript" className="mb-8" />

    <Document.Heading3>CarouselOptions</Document.Heading3>
    <Document.Paragraph mb={4}>
      Embla Carousel의 옵션 타입입니다. <InlineCode>align</InlineCode>, <InlineCode>loop</InlineCode>,{" "}
      <InlineCode>slidesToScroll</InlineCode> 등 다양한 옵션을 설정할 수 있습니다. 자세한 내용은 Embla Carousel 공식 문서를 참조하세요.
    </Document.Paragraph>
    <CodeBlock code={`type CarouselOptions = Parameters<typeof useEmblaCarousel>[0]`} language="typescript" className="mb-8" />

    <Document.Heading3>CarouselPlugin</Document.Heading3>
    <Document.Paragraph mb={4}>
      Embla Carousel의 플러그인 타입입니다. <InlineCode>Autoplay</InlineCode>, <InlineCode>AutoScroll</InlineCode> 등의 플러그인을 배열로
      전달할 수 있습니다.
    </Document.Paragraph>
    <CodeBlock code={`type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1]`} language="typescript" className="mb-8" />

    <Document.Heading3>CarouselModuleProps&lt;E&gt;</Document.Heading3>
    <Document.Paragraph mb={4}>
      모듈 컴포넌트(PrevButton, NextButton 등)의 공통 Props 타입입니다. <InlineCode>carouselApi</InlineCode>를 통해 외부 API를 주입할 수
      있습니다.
    </Document.Paragraph>
    <CodeBlock
      code={`type CarouselModuleProps<E extends React.ElementType> =
  PrimitivePropsWithRef<E> & {
    carouselApi?: CarouselApi | null;
  }`}
      language="typescript"
      className="mb-8"
    />

    <Document.Heading3>CarouselPluginParameters</Document.Heading3>
    <Document.Paragraph mb={4}>
      <InlineCode>useAutoplay</InlineCode>와 <InlineCode>useAutoScroll</InlineCode> 훅의 파라미터 타입입니다.
    </Document.Paragraph>
    <CodeBlock
      code={`type CarouselPluginParameters = {
  api: CarouselApi | null;
  defaultState?: 'playing' | 'paused';
  state?: 'playing' | 'paused';
  onStateChange?: (state: 'playing' | 'paused') => void;
}`}
      language="typescript"
    />
    <Document.Heading2>Data Attributes</Document.Heading2>
    <Document.Paragraph mb={4}>
      Carousel 컴포넌트에서 사용되는 Data Attribute 목록입니다. 이 속성들을 활용하여 CSS 선택자로 스타일링할 수 있습니다.
    </Document.Paragraph>
    <AttributeTable rows={attributeRows} />

    <Document.Heading2>Hooks</Document.Heading2>

    <Document.Heading3>useCarouselApi</Document.Heading3>
    <Document.Paragraph mb={4}>
      외부 API 또는 컨텍스트 API를 반환하는 훅입니다. Carousel 컴포넌트를 확장할때 주로 사용합니다.
    </Document.Paragraph>
    <CodeBlock code={`useCarouselApi(externalApi: CarouselApi | null): CarouselApi`} language="typescript" className="mb-8" />

    <Document.Heading3>useCurrentIndex</Document.Heading3>
    <Document.Paragraph mb={4}>현재 슬라이드 인덱스를 반환하는 훅입니다. 0부터 시작합니다.</Document.Paragraph>
    <CodeBlock code={`useCurrentIndex(api: CarouselApi | null): number`} language="typescript" className="mb-8" />

    <Document.Heading3>useTotalCount</Document.Heading3>
    <Document.Paragraph mb={4}>전체 슬라이드 개수를 반환하는 훅입니다.</Document.Paragraph>
    <CodeBlock code={`useTotalCount(api: CarouselApi | null): number`} language="typescript" className="mb-8" />

    <Document.Heading3>useCanScroll</Document.Heading3>
    <Document.Paragraph mb={4}>특정 방향으로 스크롤 가능한지 여부와 스크롤 함수를 반환하는 훅입니다.</Document.Paragraph>
    <CodeBlock
      code={`useCanScroll(
  api: CarouselApi | null,
  direction: 'prev' | 'next'
): { isCanScroll: boolean; scroll?: () => void }`}
      language="typescript"
      className="mb-8"
    />

    <Document.Heading3>useAutoplay</Document.Heading3>
    <Document.Paragraph mb={4}>Autoplay 플러그인을 제어하는 훅입니다. 재생/일시정지 상태와 제어 함수를 반환합니다.</Document.Paragraph>
    <CodeBlock
      code={`useAutoplay(params: CarouselPluginParameters): {
  isPlaying: boolean;
  handleResetOrStop: () => void;
  toggleAutoplay: () => void;
}`}
      language="typescript"
      className="mb-8"
    />

    <Document.Heading3>useAutoScroll</Document.Heading3>
    <Document.Paragraph mb={4}>AutoScroll 플러그인을 제어하는 훅입니다. 재생/일시정지 상태와 제어 함수를 반환합니다.</Document.Paragraph>
    <CodeBlock
      code={`useAutoScroll(params: CarouselPluginParameters): {
  isPlaying: boolean;
  handleResetOrStop: () => void;
  toggleAutoplay: () => void; 
}`}
      language="typescript"
      className="mb-8"
    />
  </section>
);

const rootProps: PropsTableRow[] = [
  {
    name: "orientation",
    type: "'horizontal' | 'vertical'",
    defaultValue: "'horizontal'",
    description: "캐러셀의 스크롤 방향을 설정합니다.",
  },
  {
    name: "options",
    type: "CarouselOptions",
    defaultValue: "—",
    description: "Embla Carousel의 옵션을 설정합니다. align, loop, slidesToScroll 등을 포함합니다.",
  },
  {
    name: "plugins",
    type: "CarouselPlugin",
    defaultValue: "—",
    description: "Embla Carousel의 플러그인을 설정합니다. Autoplay, AutoScroll 등을 배열로 전달할 수 있습니다.",
  },
  {
    name: "setApi",
    type: "(api: CarouselApi) => void",
    defaultValue: "—",
    description: "Carousel API 인스턴스를 받아오는 콜백 함수입니다. 프로그래밍 방식으로 캐러셀을 제어할 때 사용합니다.",
  },
];

const navigationButtonProps: PropsTableRow[] = [
  {
    name: "carouselApi",
    type: "CarouselApi | null",
    defaultValue: "—",
    description: "외부 Carousel API를 주입할 수 있습니다. 미제공 시 컨텍스트의 API를 사용합니다.",
  },
];

const currentIndexProps: PropsTableRow[] = [
  {
    name: "carouselApi",
    type: "CarouselApi | null",
    defaultValue: "—",
    description: "외부 Carousel API를 주입할 수 있습니다. 미제공 시 컨텍스트의 API를 사용합니다.",
  },
];

const totalCountProps: PropsTableRow[] = [
  {
    name: "carouselApi",
    type: "CarouselApi | null",
    defaultValue: "—",
    description: "외부 Carousel API를 주입할 수 있습니다. 미제공 시 컨텍스트의 API를 사용합니다.",
  },
];

const indicatorWrapperProps: PropsTableRow[] = [
  {
    name: "carouselApi",
    type: "CarouselApi | null",
    defaultValue: "—",
    description: "외부 Carousel API를 주입할 수 있습니다. 미제공 시 컨텍스트의 API를 사용합니다.",
  },
  {
    name: "children",
    type: "ReactNode | ((totalSnap: number) => ReactNode)",
    defaultValue: "—",
    description: "자식 요소 또는 전체 슬라이드 개수를 받는 렌더 함수입니다.",
  },
];

const indicatorProps: PropsTableRow[] = [
  {
    name: "index",
    type: "number",
    defaultValue: "—",
    description: "인디케이터가 나타내는 슬라이드의 인덱스입니다. 필수 값입니다.",
  },
  {
    name: "carouselApi",
    type: "CarouselApi | null",
    defaultValue: "—",
    description: "외부 Carousel API를 주입할 수 있습니다. 미제공 시 컨텍스트의 API를 사용합니다.",
  },
  {
    name: "onClick",
    type: "(event: React.MouseEvent, api: CarouselApi) => void",
    defaultValue: "—",
    description: "인디케이터 클릭 시 호출되는 이벤트 핸들러입니다. 기본 동작(해당 슬라이드로 이동) 이후 실행됩니다.",
  },
];

const attributeRows: AttributeTableRow[] = [
  {
    name: "data-disabled",
    value: "boolean",
    description: "NavigationButton이 비활성화되었을 때 true로 설정됩니다. 더 이상 스크롤할 수 없는 방향의 버튼에 적용됩니다.",
  },
  {
    name: "data-active",
    value: "boolean",
    description: "Carousel.Indicator가 현재 활성 슬라이드를 나타낼 때 true로 설정됩니다.",
  },
  {
    name: "data-index",
    value: "number",
    description: "Carousel.Indicator의 인덱스 값이 설정됩니다.",
  },
];

export { ApiSpecSection };
