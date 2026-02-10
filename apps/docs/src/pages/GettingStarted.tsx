const GettingStarted = () => {
  return (
    <div className="prose prose-gray max-w-none">
      <div className="mb-4 text-sm font-semibold text-blue-600">Docs</div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Getting Started</h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">Timeless UI를 시작하는 방법에 대해 알아봅니다.</p>

      <h2 id="philosophy" className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Philosophy
      </h2>
      <p>Timeless UI는 시간이 지나도 변하지 않는 가치를 지향합니다. 불필요한 장식을 배제하고, 본질에 집중한 디자인 시스템을 제공합니다.</p>

      <h3 id="simplicity" className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Simplicity
      </h3>
      <p>간결함은 단순히 적은 것이 아닙니다. 복잡함을 정리하고, 가장 중요한 것에 집중할 수 있게 만드는 힘입니다.</p>

      <h3 id="flexibility" className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Flexibility
      </h3>
      <p>다양한 환경에서도 유연하게 적응할 수 있도록 설계되었습니다. Tailwind CSS를 기반으로 쉽게 커스터마이징할 수 있습니다.</p>

      <h2 id="installation" className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Installation
      </h2>
      <p>패키지 매니저를 통해 손쉽게 설치할 수 있습니다.</p>

      <h3 id="npm" className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        npm
      </h3>
      <div className="mt-4 rounded-md bg-gray-900 p-4">
        <code className="text-sm text-white">npm install @timeless-ui/ui</code>
      </div>

      <h3 id="pnpm" className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        pnpm
      </h3>
      <div className="mt-4 rounded-md bg-gray-900 p-4">
        <code className="text-sm text-white">pnpm add @timeless-ui/ui</code>
      </div>

      <h3 id="yarn" className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        yarn
      </h3>
      <div className="mt-4 rounded-md bg-gray-900 p-4">
        <code className="text-sm text-white">yarn add @timeless-ui/ui</code>
      </div>

      <h2 id="usage" className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Usage
      </h2>
      <p>설치 후 다음과 같이 컴포넌트를 import 하여 사용할 수 있습니다.</p>
      <div className="mt-4 overflow-x-auto rounded-md bg-gray-900 p-4">
        <pre className="text-sm text-white">
          {`import { Button } from '@timeless-ui/ui';

export default function App() {
  return (
    <Button>Hello World</Button>
  );
}`}
        </pre>
      </div>

      <h2 id="framework-guide" className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Framework Guide
      </h2>
      <p>Timeless UI는 다양한 프레임워크와 호환됩니다.</p>

      <h3 id="nextjs" className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Next.js
      </h3>
      <p>Next.js 13 이상을 사용하는 경우 App Router와 완벽하게 호환됩니다.</p>

      <h4 id="app-router" className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight">
        App Router
      </h4>
      <p>
        App Router 환경에서는 <code>"use client"</code> 지시어를 사용하여 클라이언트 컴포넌트로 사용해야 할 수도 있습니다.
      </p>

      <h4 id="pages-router" className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight">
        Pages Router
      </h4>
      <p>기존 Pages Router에서도 문제없이 동작합니다. `_app.tsx`에 스타일을 추가하세요.</p>

      <h3 id="vite" className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Vite
      </h3>
      <p>Vite React 프로젝트에서는 별도의 설정 없이 바로 사용할 수 있습니다.</p>

      <h2 id="theming" className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Theming
      </h2>
      <p>테마 시스템을 통해 브랜드 아이덴티티에 맞는 스타일을 적용할 수 있습니다.</p>

      <h3 id="customizing-colors" className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Customizing Colors
      </h3>
      <p>CSS Variables를 사용하여 기본 컬러 팔레트를 override 할 수 있습니다. `tailwind.config.js`를 수정하여 색상을 확장하세요.</p>

      <h3 id="dark-mode" className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Dark Mode
      </h3>
      <p>기본적으로 다크 모드를 지원합니다. `dark` 클래스를 html 태그나 상위 요소에 추가하세요.</p>

      <div className="mt-4 rounded-md bg-gray-900 p-4">
        <code className="text-sm text-white">{`<html class="dark">`}</code>
      </div>

      <h3 id="typography" className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Typography
      </h3>
      <p>기본 폰트는 Pretendard를 사용합니다. 폰트 변경이 필요한 경우 글로벌 스타일에서 재정의하세요.</p>

      <h2 id="advanced-topics" className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Advanced Topics
      </h2>

      <h3 id="server-components" className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Server Components
      </h3>
      <p>RSC(React Server Components)를 지원하기 위해 노력하고 있습니다. 인터랙션이 없는 컴포넌트는 서버 컴포넌트로 사용할 수 있습니다.</p>

      <h3 id="optimization" className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Optimization
      </h3>
      <p>Tree shaking을 완벽 지원하므로 사용하지 않는 컴포넌트는 번들에 포함되지 않습니다.</p>

      <h2 id="faq" className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        FAQ
      </h2>
      <p>자주 묻는 질문입니다.</p>

      <h3 id="faq-1" className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
        상업용 프로젝트에 사용 가능한가요?
      </h3>
      <p>네, MIT 라이센스로 자유롭게 사용할 수 있습니다.</p>

      <h3 id="faq-2" className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
        TypeScript를 지원하나요?
      </h3>
      <p>네, Timeless UI는 TypeScript로 작성되어 완벽한 타입 정의를 제공합니다.</p>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="flex h-[500px] items-center justify-center border border-dashed border-gray-300 text-gray-400">Scroll Space</div>
    </div>
  );
};

export default GettingStarted;
