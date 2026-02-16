import { useState } from "react";
import { FileUpload } from "@timeless-ui/react";
import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      FileUpload 컴포넌트는 사용자가 파일을 선택하거나 드래그 앤 드롭으로 업로드할 수 있는 인터페이스를 제공합니다. 가장 간단한 형태로 버튼
      클릭을 통해 파일을 선택할 수 있으며, <InlineCode>value</InlineCode>와 <InlineCode>onValueChange</InlineCode> props를 사용하여 업로드된
      파일을 관리합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Basic Demo Component
   ────────────────────────────────────────────── */

const BasicDemo = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload.Root value={files} onValueChange={setFiles} maxFiles={3}>
      <FileUpload.Trigger className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
        파일 선택
      </FileUpload.Trigger>
      <FileUpload.List className="mt-4 space-y-2">
        {(files) =>
          files.map((file, index) => (
            <FileUpload.Item
              key={file.name}
              file={file}
              index={index}
              className="flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 p-3"
            >
              <FileUpload.ItemPreview className="h-12 w-12 rounded border border-neutral-300 object-cover" />
              <div className="flex-1">
                <FileUpload.ItemName className="text-sm font-medium text-neutral-900" />
                <FileUpload.ItemSize className="text-xs text-neutral-500" />
              </div>
              <FileUpload.ItemDeleteTrigger className="rounded p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600">
                ✕
              </FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))
        }
      </FileUpload.List>
    </FileUpload.Root>
  );
};

/* ──────────────────────────────────────────────
   Code String
   ────────────────────────────────────────────── */

const basicCode = `const BasicDemo = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload.Root value={files} onValueChange={setFiles} maxFiles={3}>
      <FileUpload.Trigger className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
        파일 선택
      </FileUpload.Trigger>
      <FileUpload.List className="mt-4 space-y-2">
        {(files) =>
          files.map((file, index) => (
            <FileUpload.Item
              key={file.name}
              file={file}
              index={index}
              className="flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 p-3"
            >
              <FileUpload.ItemPreview className="h-12 w-12 rounded border border-neutral-300 object-cover" />
              <div className="flex-1">
                <FileUpload.ItemName className="text-sm font-medium text-neutral-900" />
                <FileUpload.ItemSize className="text-xs text-neutral-500" />
              </div>
              <FileUpload.ItemDeleteTrigger className="rounded p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600">
                ✕
              </FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))
        }
      </FileUpload.List>
    </FileUpload.Root>
  );
};`;

export { BasicUsageSection };
