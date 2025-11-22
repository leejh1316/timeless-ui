import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * 구문 강조 기능이 있는 코드 블록 컴포넌트입니다.
 * react-syntax-highlighter 라이브러리를 사용합니다.
 * @param {string} code - 하이라이팅할 코드 문자열
 * @param {string} [language='tsx'] - 코드의 언어
 * @param {boolean} [showLineNumbers=false] - 라인 번호를 표시할지 여부
 * @param {number[]} [highlightLines=[]] - 강조하고 싶은 라인 번호들의 배열
 */
interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}
export function CodeBlock({ code, language = "tsx", showLineNumbers = false, highlightLines = [] }: CodeBlockProps) {
  const [copyText, setCopyText] = useState("Copy");

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim()).then(
      () => {
        setCopyText("Copied!");
        setTimeout(() => setCopyText("Copy"), 2000);
      },
      (err) => {
        console.error("Failed to copy: ", err);
        setCopyText("Failed!");
        setTimeout(() => setCopyText("Copy"), 2000);
      },
    );
  };

  return (
    <div className="group relative rounded-b-lg text-sm">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 rounded-md bg-gray-700 px-2 py-1 text-xs font-semibold text-white opacity-0 transition-all duration-200 hover:bg-gray-600 group-hover:opacity-100"
      >
        {copyText}
      </button>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        showLineNumbers={showLineNumbers}
        wrapLines={true}
        lineProps={(lineNumber) => {
          const style = {
            display: "block",
            width: "100%",
          };
          return { style };
        }}
        customStyle={{
          margin: 0,
          padding: "1.5rem",
          // 부모 컴포넌트의 하단 둥근 모서리와 맞춥니다.
          borderRadius: "0 0 0.5rem 0.5rem",
        }}
        codeTagProps={{
          style: {
            // 가독성 좋은 코딩 폰트로 변경
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            fontSize: "0.875rem",
          },
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
