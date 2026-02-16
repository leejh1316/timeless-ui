import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      Carousel은 Compound Component 패턴으로 설계되어 있어, 여러 하위 컴포넌트를 조합하여 다양한 형태의 캐러셀을 구성할 수 있습니다. 각 하위
      컴포넌트는 독립적인 역할을 수행하며, 필요에 따라 선택적으로 사용할 수 있습니다.
    </Document.Paragraph>
    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <Document.Paragraph mb={4}>Carousel의 기본 구조는 다음과 같이 조합됩니다.</Document.Paragraph>
    <CodeBlock code={anatomyCode} className="mb-8" />

    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3 mt={6}>Carousel.Root</Document.Heading3>
    <Document.Paragraph mb={4}>
      캐러셀의 최상위 컨테이너로, 모든 하위 컴포넌트를 감싸며 캐러셀의 전역 설정을 제공합니다. <InlineCode>orientation</InlineCode>,{" "}
      <InlineCode>options</InlineCode>, <InlineCode>plugins</InlineCode> 등의 설정을 전달할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Carousel.Container</Document.Heading3>
    <Document.Paragraph mb={4}>
      캐러셀의 뷰포트 영역을 정의하며, 슬라이드가 표시되는 영역을 제한합니다. 기본적으로 <InlineCode>overflow-hidden</InlineCode> 스타일이
      적용되어 있어 뷰포트를 벗어난 슬라이드는 숨겨집니다.
    </Document.Paragraph>

    <Document.Heading3>Carousel.Track</Document.Heading3>
    <Document.Paragraph mb={4}>
      실제 슬라이드들을 담는 트랙으로, 슬라이드 이동 시 이 요소가 이동합니다. 키보드 방향키를 통한 네비게이션을 지원하며,{" "}
      <InlineCode>orientation</InlineCode>에 따라 가로 또는 세로로 배치됩니다.
    </Document.Paragraph>

    <Document.Heading3>Carousel.Item</Document.Heading3>
    <Document.Paragraph mb={4}>
      개별 슬라이드 아이템을 정의합니다. 기본적으로 <InlineCode>basis-full</InlineCode> 스타일이 적용되어 뷰포트 너비만큼의 공간을
      차지합니다.
    </Document.Paragraph>

    <Document.Heading3>Carousel.PrevButton / Carousel.NextButton</Document.Heading3>
    <Document.Paragraph mb={4}>
      이전/다음 슬라이드로 이동하는 네비게이션 버튼입니다. 더 이상 이동할 수 없는 방향의 버튼은 자동으로 <InlineCode>disabled</InlineCode>{" "}
      상태가 됩니다. <InlineCode>data-disabled</InlineCode> 속성을 통해 스타일링할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Carousel.CurrentIndex / Carousel.TotalCount</Document.Heading3>
    <Document.Paragraph mb={4}>
      현재 슬라이드 인덱스와 전체 슬라이드 개수를 표시하는 컴포넌트입니다. <InlineCode>CurrentIndex</InlineCode>는 1부터 시작하는 값을
      표시합니다.
    </Document.Paragraph>

    <Document.Heading3>Carousel.IndicatorWrapper / Carousel.Indicator</Document.Heading3>
    <Document.Paragraph mb={4}>
      슬라이드 인디케이터를 표시하는 컴포넌트입니다. <InlineCode>IndicatorWrapper</InlineCode>는 인디케이터들을 감싸는 컨테이너이며,{" "}
      <InlineCode>Indicator</InlineCode>는 개별 인디케이터 버튼입니다. 현재 활성 슬라이드의 인디케이터는{" "}
      <InlineCode>data-active</InlineCode> 속성이 <InlineCode>true</InlineCode>로 설정됩니다.
    </Document.Paragraph>
  </section>
);

const anatomyItems = [
  { name: "Carousel.Root", desc: "캐러셀의 최상위 컨테이너" },
  { name: "Carousel.Container", desc: "슬라이드 뷰포트 영역" },
  { name: "Carousel.Track", desc: "슬라이드 트랙 컨테이너" },
  { name: "Carousel.Item", desc: "개별 슬라이드 아이템" },
  { name: "Carousel.PrevButton", desc: "이전 슬라이드 버튼" },
  { name: "Carousel.NextButton", desc: "다음 슬라이드 버튼" },
  { name: "Carousel.CurrentIndex", desc: "현재 슬라이드 번호" },
  { name: "Carousel.TotalCount", desc: "전체 슬라이드 개수" },
  { name: "Carousel.IndicatorWrapper", desc: "인디케이터 래퍼" },
  { name: "Carousel.Indicator", desc: "개별 인디케이터 버튼" },
];

const anatomyCode = `<Carousel.Root>
  <Carousel.Container>
    <Carousel.Track>
      <Carousel.Item>슬라이드 1</Carousel.Item>
      <Carousel.Item>슬라이드 2</Carousel.Item>
      <Carousel.Item>슬라이드 3</Carousel.Item>
    </Carousel.Track>
  </Carousel.Container>
  
  {/* 선택적 요소들 */}
  <Carousel.PrevButton>이전</Carousel.PrevButton>
  <Carousel.NextButton>다음</Carousel.NextButton>
  
  <div>
    <Carousel.CurrentIndex /> / <Carousel.TotalCount />
  </div>
  
  <Carousel.IndicatorWrapper>
    {(totalSnap) =>
      Array.from({ length: totalSnap }).map((_, index) => (
        <Carousel.Indicator key={index} index={index} />
      ))
    }
  </Carousel.IndicatorWrapper>
</Carousel.Root>`;

export { CompoundStructureSection };
