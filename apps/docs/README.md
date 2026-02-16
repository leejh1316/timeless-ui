# Timeless UI 문서

Timeless UI 컴포넌트 라이브러리의 문서화 사이트입니다.

현재 작성된 문서

- Component: 26
- Hook: 2

## 📁 프로젝트 구조

```
apps/docs/
├── src/
│   ├── pages/              # 문서 페이지
│   │   ├── docs/          # 컴포넌트별 문서
│   │   │   ├── accordion/
│   │   │   ├── button/
│   │   │   ├── modal/
│   │   │   └── ...
│   │   └── errors/        # 에러 페이지
│   ├── components/        # 공통 컴포넌트
│   │   ├── common/
│   │   ├── layout/
│   │   └── ui/
│   ├── router/           # 라우팅 설정
│   ├── styles/           # 글로벌 스타일
│   └── utils/            # 유틸리티 함수
└── public/               # 정적 파일
```

## 📝 문서 추가하기

새로운 컴포넌트 문서를 추가하려면:

1. `src/pages/docs/` 아래에 컴포넌트명 폴더 생성
2. `ComponentPage.tsx` 파일 생성
3. `components/sections/` 폴더에 섹션 컴포넌트 추가:
   - `BasicUsageSection.tsx` - 기본 사용법
   - `ApiSpecSection.tsx` - API 명세
   - `ExampleSection.tsx` - 예제
   - `CompoundStructureSection.tsx` - 합성 구조 (필요시)
4. 라우터에 경로 추가

## 🔗 관련 링크

- [메인 프로젝트](../../README.md)
- [UI 패키지](../../packages/ui)
- [Timeless UI 저장소](https://github.com/leejh1316/timeless-ui)
