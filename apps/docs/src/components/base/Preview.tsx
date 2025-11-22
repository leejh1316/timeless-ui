import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock.jsx";

/**
 * 컴포넌트의 시연(Preview)과 코드(Code)를 탭으로 보여주는 컴포넌트입니다.
 * @param {string} title - 미리보기 섹션의 제목
 * @param {string} description - 미리보기 섹션의 설명
 * @param {React.ReactNode} children - 시연할 컴포넌트
 * @param {string} code - 보여줄 소스 코드
 */
interface ComponentPreviewProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  code: string;
}
export function ComponentPreview({ title, description, children, code }: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState("preview"); // 'preview' or 'code'

  return (
    <section className="rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
        {description && <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>}
      </div>

      <div className="border-b border-gray-200 px-6 dark:border-gray-700">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("preview")}
            className={`${
              activeTab === "preview"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
            } whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium transition-colors duration-200`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`${
              activeTab === "code"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
            } whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium transition-colors duration-200`}
          >
            Code
          </button>
        </nav>
      </div>

      <div>
        {activeTab === "preview" && (
          <div className="flex min-h-[400px] items-center justify-center rounded-b-lg bg-gray-50 p-8 dark:bg-gray-900/50">
            {children}
          </div>
        )}
        {activeTab === "code" && <CodeBlock code={code} />}
      </div>
    </section>
  );
}
