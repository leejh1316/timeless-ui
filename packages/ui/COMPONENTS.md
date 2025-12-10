# UI Components Documentation

이 문서는 `packages/ui` 패키지에 포함된 컴포넌트들의 상세 명세서임.

---

## 9.1. Accordion

### 9.1.1. 목표
제한된 공간 내에서 많은 양의 콘텐츠를 효율적으로 구성하고, 사용자가 필요한 정보만 선택적으로 볼 수 있도록 지원

### 9.1.2. 기능
- **단일/다중 모드**: 한 번에 하나의 항목만 열거나(single), 여러 항목을 동시에 열 수 있음(multiple)
- **키보드 네비게이션**: 화살표 키를 사용하여 트리거 간 이동 가능
- **접근성 준수**: WAI-ARIA 패턴 준수
- **제어/비제어 모드**: `value` prop을 통해 상태를 제어하거나 내부 상태 사용 가능

### 9.1.3. 사용방법
```tsx
<Accordion.Root type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

---

## 9.2. AlertDialog

### 9.2.1. 목표
사용자의 작업 흐름을 중단하고 중요한 정보를 전달하거나 결정(예: 삭제 확인)을 요구할 때 사용

### 9.2.2. 기능
- **모달 오버레이**: 배경을 어둡게 처리하여 사용자의 주의를 집중시킴
- **포커스 트랩**: 대화 상자 내부로 포커스를 가두어 접근성 보장
- **스크롤 잠금**: 대화 상자가 열려있는 동안 배경 스크롤 방지

### 9.2.3. 사용방법
```tsx
<AlertDialog.Root>
  <AlertDialog.Trigger>Delete account</AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Overlay />
    <AlertDialog.Content>
      <AlertDialog.Title>Are you sure?</AlertDialog.Title>
      <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>Delete</AlertDialog.Action>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>
```

---

## 9.3. AspectRatio

### 9.3.1. 목표
이미지나 비디오 등의 콘텐츠를 지정된 가로세로 비율로 표시하여 레이아웃 이동(Layout Shift) 방지

### 9.3.2. 기능
- **비율 유지**: 부모 컨테이너의 너비에 맞춰 지정된 비율로 높이를 자동 계산

### 9.3.3. 사용방법
```tsx
<AspectRatio ratio={16 / 9}>
  <img src="..." alt="Image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
</AspectRatio>
```

---

## 9.4. Breakpoint

### 9.4.1. 목표
화면 크기(미디어 쿼리)에 따라 콘텐츠를 조건부로 렌더링

### 9.4.2. 기능
- **조건부 렌더링**: `up`, `down`, `only` props를 사용하여 특정 브레이크포인트 조건에서만 자식 렌더링

### 9.4.3. 사용방법
```tsx
<Breakpoint up="md">
  <div>This is visible on medium screens and up.</div>
</Breakpoint>
```

---

## 9.5. Button

### 9.5.1. 목표
사용자가 클릭이나 터치를 통해 작업을 실행할 수 있는 기본적인 인터랙티브 요소 제공

### 9.5.2. 기능
- **다양한 상태 지원**: 로딩, 비활성화 상태 지원
- **이벤트 핸들링**: 터치 및 마우스 이벤트를 통합적으로 처리

### 9.5.3. 사용방법
```tsx
<Button onClick={handleClick} loading={isLoading}>
  Click me
</Button>
```

---

## 9.6. Calendar

### 9.6.1. 목표
사용자가 날짜를 시각적으로 확인하고 선택할 수 있는 인터페이스 제공

### 9.6.2. 기능
- **날짜 네비게이션**: 월/년 단위 이동 가능
- **로케일 지원**: `date-fns`를 사용하여 다양한 언어 형식 지원
- **커스터마이징**: 헤더, 날짜 셀 등 커스터마이징 가능

### 9.6.3. 사용방법
```tsx
<Calendar.Root onMonthChange={handleMonthChange}>
  <Calendar.Header>{/* ... */}</Calendar.Header>
  <Calendar.Grid>{/* ... */}</Calendar.Grid>
</Calendar.Root>
```

---

## 9.7. Carousel

### 9.7.1. 목표
제한된 영역 내에서 여러 콘텐츠를 슬라이드 형태로 순환하며 표시

### 9.7.2. 기능
- **Embla Carousel 기반**: 부드러운 터치 스와이프와 성능 제공
- **플러그인 지원**: 자동 재생(Autoplay), 자동 스크롤(AutoScroll) 등 지원
- **방향 지원**: 가로 및 세로 방향 슬라이드 지원

### 9.7.3. 사용방법
```tsx
<Carousel.Root>
  <Carousel.Container>
    <Carousel.Slide>Slide 1</Carousel.Slide>
    <Carousel.Slide>Slide 2</Carousel.Slide>
  </Carousel.Container>
  <Carousel.Prev />
  <Carousel.Next />
</Carousel.Root>
```

---

## 9.8. Checkbox

### 9.8.1. 목표
사용자가 이진 상태(선택/해제) 또는 혼합 상태(mixed)를 토글할 수 있는 입력 컨트롤 제공

### 9.8.2. 기능
- **3가지 상태**: Checked, Unchecked, Indeterminate(Mixed) 상태 지원
- **폼 연동**: 내부적으로 hidden input을 사용하여 폼 제출 지원

### 9.8.3. 사용방법
```tsx
<Checkbox.Root checked={checked} onCheckedChange={setChecked}>
  <Checkbox.Indicator>
    <CheckIcon />
  </Checkbox.Indicator>
</Checkbox.Root>
```

---

## 9.9. Collapsible

### 9.9.1. 목표
콘텐츠의 일부를 숨기거나 보여주어 공간을 절약하고 정보의 복잡도 감소

### 9.9.2. 기능
- **열림/닫힘 제어**: 트리거를 통해 콘텐츠 영역의 가시성 제어
- **애니메이션 지원**: 상태 변경 시 애니메이션을 적용할 수 있는 구조 제공

### 9.9.3. 사용방법
```tsx
<Collapsible.Root>
  <Collapsible.Trigger>Toggle</Collapsible.Trigger>
  <Collapsible.Content>
    Hidden content
  </Collapsible.Content>
</Collapsible.Root>
```

---

## 9.10. Counter

### 9.10.1. 목표
사용자가 숫자를 증가시키거나 감소시킬 수 있는 입력 인터페이스 제공

### 9.10.2. 기능
- **범위 제한**: 최소값(min)과 최대값(max) 설정 가능
- **단계 조절**: 증감 단위(step) 설정 가능

### 9.10.3. 사용방법
```tsx
<Counter.Root min={0} max={10}>
  <Counter.Decrement>-</Counter.Decrement>
  <Counter.Value />
  <Counter.Increment>+</Counter.Increment>
</Counter.Root>
```

---

## 9.11. DatePicker

### 9.11.1. 목표
입력 필드와 달력을 결합하여 사용자가 날짜를 직관적으로 선택할 수 있도록 지원

### 9.11.2. 기능
- **팝오버 달력**: 입력 필드 포커스 시 달력 표시
- **날짜 포맷팅**: 선택된 날짜를 지정된 형식의 문자열로 표시

### 9.11.3. 사용방법
```tsx
<DatePicker.Root>
  <DatePicker.Trigger />
  <DatePicker.Content>
    <Calendar.Root />
  </DatePicker.Content>
</DatePicker.Root>
```

---

## 9.12. Dropdown

### 9.12.1. 목표
사용자에게 선택 가능한 작업 목록이나 옵션을 오버레이 형태로 제공

### 9.12.2. 기능
- **포커스 관리**: 메뉴가 열릴 때 포커스를 관리하고 키보드 탐색 지원
- **위치 자동 조정**: 화면 경계에 따라 메뉴 위치 최적화

### 9.12.3. 사용방법
```tsx
<Dropdown.Root>
  <Dropdown.Trigger>Options</Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item>Edit</Dropdown.Item>
    <Dropdown.Item>Delete</Dropdown.Item>
  </Dropdown.Content>
</Dropdown.Root>
```

---

## 9.13. Form

### 9.13.1. 목표
복잡한 폼 유효성 검사와 상태 관리를 단순화하고 접근성 보장

### 9.13.2. 기능
- **유효성 검사**: HTML5 Validation API를 기반으로 커스텀 유효성 검사 통합
- **에러 메시지 관리**: 필드별 에러 메시지 관리 및 표시

### 9.13.3. 사용방법
```tsx
<Form.Root>
  <Form.Field name="email">
    <Form.Label>Email</Form.Label>
    <Form.Control />
    <Form.Message match="valueMissing">Please enter your email</Form.Message>
  </Form.Field>
  <Form.Submit>Submit</Form.Submit>
</Form.Root>
```

---

## 9.14. Funnel

### 9.14.1. 목표
여러 단계로 이루어진 프로세스(예: 회원가입, 설문조사)를 관리하고 상태 유지

### 9.14.2. 기능
- **단계 관리**: 현재 단계를 추적하고 이전/다음 단계로 이동하는 기능 제공
- **데이터 유지**: 각 단계의 데이터를 수집하고 유지

### 9.14.3. 사용방법
```tsx
<Funnel.Root funnel={funnel}>
  <Funnel.Step step="step1">...</Funnel.Step>
  <Funnel.Step step="step2">...</Funnel.Step>
</Funnel.Root>
```

---

## 9.15. Image

### 9.15.1. 목표
이미지 로딩 상태(로딩 중, 에러, 로드 완료)에 따라 적절한 UI 표시

### 9.15.2. 기능
- **폴백(Fallback)**: 이미지 로드 실패 시 대체 이미지 표시
- **상태 관리**: 로딩 중, 에러 등의 상태를 내부적으로 관리

### 9.15.3. 사용방법
```tsx
<Image.Root src="image.jpg" fallbackSrc="fallback.jpg">
  <Image.Img />
  <Image.Fallback>Loading...</Image.Fallback>
</Image.Root>
```

---

## 9.16. InView

### 9.16.1. 목표
요소가 뷰포트(화면) 내에 들어왔는지 감지하여 애니메이션이나 지연 로딩 트리거

### 9.16.2. 기능
- **Intersection Observer**: 효율적인 감지를 위해 Intersection Observer API 사용
- **상태 노출**: `isVisible`, `hasEntered` 등의 상태를 자식 컴포넌트에 전달

### 9.16.3. 사용방법
```tsx
<InView>
  {({ isVisible }) => (
    <div style={{ opacity: isVisible ? 1 : 0 }}>Content</div>
  )}
</InView>
```

---

## 9.17. Input

### 9.17.1. 목표
사용자로부터 텍스트 데이터를 입력받는 기본적인 필드 제공

### 9.17.2. 기능
- **상태 관리**: 값의 변경을 관리하고 포커스 상태 추적
- **에러 표시**: 유효성 검사 실패 시 에러 상태 표시

### 9.17.3. 사용방법
```tsx
<Input.Root>
  <Input.Field placeholder="Enter text" />
</Input.Root>
```

---

## 9.18. Modal

### 9.18.1. 목표
현재 페이지의 흐름을 차단하고 사용자의 집중을 요하는 콘텐츠 표시

### 9.18.2. 기능
- **포탈 렌더링**: `body` 요소 하위에 렌더링되어 z-index 문제 해결
- **접근성**: 포커스 관리, 스크롤 잠금, ESC 키 닫기 등 지원

### 9.18.3. 사용방법
```tsx
<Modal.Root>
  <Modal.Trigger>Open Modal</Modal.Trigger>
  <Modal.Portal>
    <Modal.Overlay />
    <Modal.Content>
      <Modal.Close>Close</Modal.Close>
    </Modal.Content>
  </Modal.Portal>
</Modal.Root>
```

---

## 9.19. Pagination

### 9.19.1. 목표
많은 양의 데이터를 여러 페이지로 나누어 탐색할 수 있도록 지원

### 9.19.2. 기능
- **페이지 계산**: 전체 아이템 수와 페이지당 아이템 수를 기반으로 페이지 범위 계산
- **네비게이션**: 이전, 다음, 특정 페이지로 이동하는 기능 제공

### 9.19.3. 사용방법
```tsx
<Pagination.Root totalItems={100} itemsPerPage={10}>
  <Pagination.Prev />
  <Pagination.List>
    {(page) => <Pagination.Item page={page} />}
  </Pagination.List>
  <Pagination.Next />
</Pagination.Root>
```

---

## 9.20. Popover

### 9.20.1. 목표
요소를 클릭하거나 호버했을 때 추가 정보를 담은 부동 패널 표시

### 9.20.2. 기능
- **위치 지정**: 트리거 요소를 기준으로 다양한 위치(top, bottom 등)에 표시 가능
- **외부 클릭 감지**: 팝오버 외부를 클릭하면 자동으로 닫힘

### 9.20.3. 사용방법
```tsx
<Popover.Root>
  <Popover.Trigger>More Info</Popover.Trigger>
  <Popover.Portal>
    <Popover.Content>
      Detailed information here.
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
```

---

## 9.21. Presence

### 9.21.1. 목표
React 컴포넌트가 DOM에서 제거될 때 애니메이션을 실행할 수 있도록 언마운트 지연

### 9.21.2. 기능
- **언마운트 지연**: `present` prop이 false가 되어도 애니메이션이 끝날 때까지 컴포넌트 유지

### 9.21.3. 사용방법
```tsx
<Presence present={isOpen}>
  <motion.div exit={{ opacity: 0 }} />
</Presence>
```

---

## 9.22. Primitive

### 9.22.1. 목표
모든 UI 컴포넌트의 기반이 되는 저수준 컴포넌트로, 다형성(Polymorphism)과 Slot 패턴 지원

### 9.22.2. 기능
- **asChild**: 자신의 스타일과 동작을 자식 컴포넌트에 전달하여 렌더링 (Radix UI 패턴)
- **이벤트 병합**: 이벤트 핸들러를 안전하게 병합

### 9.22.3. 사용방법
```tsx
<Primitive.button asChild>
  <a href="#">Link styled as button</a>
</Primitive.button>
```

---

## 9.23. RadioGroup

### 9.23.1. 목표
사용자가 여러 옵션 중 단 하나만 선택할 수 있는 인터페이스 제공

### 9.23.2. 기능
- **키보드 네비게이션**: 화살표 키로 옵션 간 이동 및 선택 가능
- **접근성**: 적절한 ARIA 역할 제공

### 9.23.3. 사용방법
```tsx
<RadioGroup.Root defaultValue="default">
  <RadioGroup.Item value="default">Default</RadioGroup.Item>
  <RadioGroup.Item value="comfortable">Comfortable</RadioGroup.Item>
</RadioGroup.Root>
```

---

## 9.24. Select

### 9.24.1. 목표
사용자가 목록에서 하나의 값을 선택할 수 있는 드롭다운 메뉴 제공 (네이티브 select 대체)

### 9.24.2. 기능
- **커스텀 UI**: 네이티브 select보다 유연한 스타일링 가능
- **포탈 지원**: 옵션 목록을 포탈로 렌더링하여 레이아웃 문제 방지

### 9.24.3. 사용방법
```tsx
<Select.Root>
  <Select.Trigger>
    <Select.Value placeholder="Select a fruit" />
  </Select.Trigger>
  <Select.Portal>
    <Select.Content>
      <Select.Item value="apple">Apple</Select.Item>
      <Select.Item value="banana">Banana</Select.Item>
    </Select.Content>
  </Select.Portal>
</Select.Root>
```

---

## 9.25. Slider

### 9.25.1. 목표
사용자가 트랙을 따라 썸(Thumb)을 드래그하여 범위 내의 값을 선택할 수 있도록 지원

### 9.25.2. 기능
- **다중 썸**: 하나의 트랙에 여러 개의 값을 선택 가능
- **키보드 지원**: 화살표 키로 값을 미세 조정 가능

### 9.25.3. 사용방법
```tsx
<Slider.Root defaultValue={[50]} max={100} step={1}>
  <Slider.Track>
    <Slider.Range />
  </Slider.Track>
  <Slider.Thumb />
</Slider.Root>
```

---

## 9.26. Slot

### 9.26.1. 목표
컴포넌트 합성을 위해 부모의 props를 자식 요소에 병합하여 렌더링

### 9.26.2. 기능
- **Props 병합**: `className`, `style`, 이벤트 핸들러 등을 자식 요소와 병합
- **구조 유연성**: 불필요한 래퍼 DOM 요소를 줄일 수 있음

### 9.26.3. 사용방법
```tsx
<Slot onClick={handleClick}>
  <button>Click me</button>
</Slot>
```

---

## 9.27. Tabs

### 9.27.1. 목표
콘텐츠를 여러 섹션으로 나누고 탭을 통해 전환하여 표시

### 9.27.2. 기능
- **활성 상태 관리**: 현재 선택된 탭과 콘텐츠 동기화
- **키보드 네비게이션**: 탭 리스트 내에서 키보드로 이동 가능

### 9.27.3. 사용방법
```tsx
<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs.Root>
```

---

## 9.28. Textarea

### 9.28.1. 목표
여러 줄의 텍스트를 입력받을 수 있는 필드 제공

### 9.28.2. 기능
- **자동 높이 조절**: (구현 여부에 따라) 내용에 따라 높이 조절 가능
- **상태 및 에러**: Input과 유사하게 상태 및 에러 처리 지원

### 9.28.3. 사용방법
```tsx
<Textarea.Root>
  <Textarea.Field placeholder="Type your message here." />
</Textarea.Root>
```

---

## 9.29. Toast

### 9.29.1. 목표
사용자의 작업에 대한 피드백이나 알림을 일시적으로 표시

### 9.29.2. 기능
- **자동 닫힘**: 일정 시간이 지나면 자동으로 사라짐
- **스와이프 종료**: 터치 제스처로 토스트를 닫을 수 있음
- **큐 관리**: 여러 토스트가 발생할 경우 순차적으로 또는 동시에 표시

### 9.29.3. 사용방법
```tsx
<Toast.Provider>
  <Toast.Root open={open} onOpenChange={setOpen}>
    <Toast.Title>Success</Toast.Title>
    <Toast.Description>Data saved successfully.</Toast.Description>
  </Toast.Root>
  <Toast.Viewport />
</Toast.Provider>
```

---

## 9.30. Toggle

### 9.30.1. 목표
켜짐/꺼짐(On/Off) 두 가지 상태를 전환하는 버튼 제공

### 9.30.2. 기능
- **상태 토글**: 클릭 시 상태 반전
- **접근성**: `aria-pressed` 속성을 통해 상태를 스크린 리더에 전달

### 9.30.3. 사용방법
```tsx
<Toggle pressed={isPressed} onPressedChange={setIsPressed}>
  <BoldIcon />
</Toggle>
```

---

## 9.31. Tooltip

### 9.31.1. 목표
요소에 대한 보충 설명을 팝업 형태로 제공

### 9.31.2. 기능
- **지연 표시**: 마우스를 올리고 일정 시간 후에 표시
- **접근성**: 키보드 포커스 시에도 표시

### 9.31.3. 사용방법
```tsx
<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>Hover me</Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content>Tooltip content</Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
```

---

## 9.32. VisuallyHidden

### 9.32.1. 목표
화면에는 보이지 않지만 스크린 리더와 같은 보조 기술에는 콘텐츠 노출

### 9.32.2. 기능
- **접근성 향상**: 아이콘 버튼 등 시각적 정보만 있는 요소에 텍스트 설명을 제공할 때 사용

### 9.32.3. 사용방법
```tsx
<button>
  <Icon />
  <VisuallyHidden>Close</VisuallyHidden>
</button>
```
