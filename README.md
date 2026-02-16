# ⏳ Timeless UI

이 프로젝트는 Radix-ui 컴포넌트를 참고하여 학습용으로 개발된 React 컴포넌트 라이브러리 입니다.

#### 🔗 링크

- [문서 사이트](https://timeless-ui-docs.vercel.app/)
- [랩핑 사이트](https://timeless-ui-k-dual.vercel.app/)
- [GitHub Repository](https://github.com/leejh1316/timeless-ui)
- [NPM Package](https://www.npmjs.com/package/@timeless-ui/react)

---

<div align="center">
  <p>접근성과 합성 패턴을 기반으로 설계된 헤드리스 컴포넌트 라이브러리</p>
</div>

<br />

## ✨ 특징

### 🧩 Compound Pattern

합성 컴포넌트 패턴으로 유연한 구조를 제공합니다. 내부 상태를 자동으로 관리하면서도 외부에 깔끔한 API를 노출합니다.

### ♿️ Accessible

WAI-ARIA 표준을 준수하여 키보드 내비게이션과 스크린 리더를 지원합니다.

### 🎨 Unstyled

스타일이 포함되지 않은 헤드리스 컴포넌트입니다. Tailwind CSS, CSS Modules 등 어떤 스타일링 솔루션과도 결합할 수 있습니다.

### 📘 TypeScript

모든 컴포넌트가 TypeScript로 작성되어 완벽한 타입 안전성과 자동완성을 제공합니다.

### 🔗 Composable

각 컴포넌트를 자유롭게 조합하여 복잡한 UI를 구성할 수 있습니다. React의 합성 모델을 극대화합니다.

<br />

## 📦 설치

```bash
# npm
npm install @timeless-ui/react

```

<br />

## 🚀 빠른 시작

```tsx
import { Button } from "@timeless-ui/react";

function App() {
  return <Button>Click me</Button>;
}
```

### 합성 패턴 예시

```tsx
import { Accordion } from "@timeless-ui/react";

function App() {
  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>시작하기</Accordion.Trigger>
        <Accordion.Content>npm add @timeless-ui/react 로 설치하세요.</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
```

<br />

## 📚 컴포넌트

### UI 컴포넌트 (26개)

- **Accordion** - 접을 수 있는 콘텐츠 섹션
- **AlertDialog** - 중요한 정보를 전달하는 모달 다이얼로그
- **AspectRatio** - 비율을 유지하는 컨테이너
- **Breakpoint** - 반응형 디스플레이 제어
- **Button** - 기본 버튼 컴포넌트
- **Calendar** - 날짜 선택 캘린더
- **Carousel** - 이미지/콘텐츠 캐러셀
- **Checkbox** - 체크박스 입력
- **CheckboxGroup** - 그룹화된 체크박스
- **Collapsible** - 접고 펼칠 수 있는 콘텐츠
- **Counter** - 숫자 카운터
- **DatePicker** - 날짜 선택기
- **Dropdown** - 드롭다운 메뉴
- **FileUpload** - 파일 업로드
- **Funnel** - 다단계 폼 플로우
- **Image** - 이미지 컴포넌트
- **InView** - 뷰포트 감지
- **Input** - 텍스트 입력
- **Modal** - 모달 다이얼로그
- **Pagination** - 페이지네이션
- **Popover** - 팝오버
- **ProgressBar** - 진행 표시줄
- **RadioGroup** - 라디오 버튼 그룹
- **Select** - 선택 드롭다운
- **Slider** - 슬라이더
- **Tabs** - 탭 네비게이션
- **Textarea** - 여러 줄 텍스트 입력
- **Toast** - 토스트 알림
- **TOC** - 목차 (Table of Contents)
- **Toggle** - 토글 스위치
- **Tooltip** - 툴팁

### Hooks (2개)

- **useArrowNavigation** - 화살표 키 네비게이션
- **useSnooze** - 지연된 상태 업데이트

<br />

## 🏗️ 프로젝트 구조

```
timeless-ui/
├── packages/
│   └── ui/              # 핵심 UI 라이브러리
│       ├── src/
│       │   ├── components/
│       │   ├── hooks/
│       │   └── utils/
│       └── package.json
├── apps/
│   ├── docs/            # 문서화 사이트
│   └── k_dual/          # 예제 애플리케이션
└── tsconfig/            # 공유 TypeScript 설정
```

## 📖 문서

상세한 문서와 예제는 [공식 문서 사이트](https://timeless-ui.vercel.app)에서 확인하실 수 있습니다.

각 컴포넌트의 사용법, API 명세, 접근성 가이드를 제공합니다.

<br />

## 📝 라이센스

MIT License

---
