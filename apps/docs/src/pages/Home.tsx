import { Link } from "react-router";

const Home = () => {
  return (
    <div className="col-span-12 py-12 md:py-24">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Timeless UI</h1>
        <p className="mt-4 max-w-2xl text-xl text-gray-500">
          시간이 지나도 변하지 않는 가치를 담은 React UI 컴포넌트 라이브러리입니다.
          <br />
          직관적이고 접근성 높은 디자인 시스템을 빠르고 쉽게 구축하세요.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            to="/docs/introduction"
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            시작하기
          </Link>
          <a
            href="https://github.com/your-repo/timeless-ui"
            target="_blank"
            rel="noreferrer"
            className="text-dis rounded-full bg-gray-100 px-6 py-3 font-bold text-gray-900 shadow-sm hover:bg-gray-200"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Accessible",
            desc: "WAI-ARIA 표준을 준수하여 모든 사용자가 접근 가능한 컴포넌트를 제공합니다.",
          },
          {
            title: "Customizable",
            desc: "Tailwind CSS를 기반으로 쉽게 스타일을 커스터마이징할 수 있습니다.",
          },
          {
            title: "Lightweight",
            desc: "필요한 컴포넌트만 가져와 사용하여 번들 사이즈를 최적화할 수 있습니다.",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-gray-200 p-8 transition-colors hover:border-gray-300">
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-2 text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
