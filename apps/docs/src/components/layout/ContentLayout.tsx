/**
 * 각 컴포넌트 문서 페이지의 전체적인 레이아웃을 담당하는 컴포넌트입니다.
 * 페이지의 제목, 설명을 표시하고 콘텐츠를 자식으로 받습니다.
 */
interface ComponentPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}
export function ComponentPageLayout({ title, description, children }: ComponentPageLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 border-b border-gray-200 pb-6 dark:border-gray-700">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">{title}</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{description}</p>
      </header>
      <main className="flex flex-col gap-12">{children}</main>
    </div>
  );
}
