import { useState } from "react";
import { FileUpload, FileRejection } from "@timeless-ui/ui";
import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Example Section
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>
      FileUpload 컴포넌트의 다양한 활용 패턴을 통해 실무에서 자주 사용되는 시나리오들을 확인할 수 있습니다.
    </Document.Paragraph>

    {/* 드래그 앤 드롭 */}
    <Document.Heading2>드래그 앤 드롭 영역</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>FileUpload.DropZone</InlineCode>을 사용하여 직관적인 드래그 앤 드롭 인터페이스를 제공할 수 있습니다.{" "}
      <InlineCode>data-drag-over</InlineCode> 속성을 활용하여 드래그 중인 상태를 시각적으로 표현합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <DragDropDemo />
    </PreviewContainer>
    <CodeBlock code={dragDropCode} className="mb-10" />

    {/* 파일 타입 제한 */}
    <Document.Heading2>파일 타입 제한</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>accept</InlineCode> prop을 사용하여 특정 타입의 파일만 허용할 수 있습니다. MIME 타입 또는 파일 확장자로 지정할 수
      있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <FileTypeDemo />
    </PreviewContainer>
    <CodeBlock code={fileTypeCode} className="mb-10" />

    {/* 파일 크기 및 개수 제한 */}
    <Document.Heading2>파일 크기 및 개수 제한</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>maxSize</InlineCode>와 <InlineCode>maxFiles</InlineCode>를 사용하여 업로드 제한을 설정합니다.{" "}
      <InlineCode>maxSize</InlineCode>는 바이트 단위 숫자 또는 가독성 높은 객체 형식으로 지정할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <FileLimitDemo />
    </PreviewContainer>
    <CodeBlock code={fileLimitCode} className="mb-10" />

    {/* 검증 실패 처리 */}
    <Document.Heading2>검증 실패 처리</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>onReject</InlineCode> 콜백을 사용하여 유효성 검사에 실패한 파일과 오류 정보를 받아 사용자에게 피드백을 제공할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ValidationDemo />
    </PreviewContainer>
    <CodeBlock code={validationCode} className="mb-10" />

    {/* 단일 파일 업로드 */}
    <Document.Heading2>단일 파일 업로드</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>multiple</InlineCode>을 <InlineCode>false</InlineCode>로 설정하여 한 번에 하나의 파일만 선택하도록 제한할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <SingleFileDemo />
    </PreviewContainer>
    <CodeBlock code={singleFileCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   1. Drag & Drop Demo
   ────────────────────────────────────────────── */

const DragDropDemo = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload.Root value={files} onValueChange={setFiles} maxFiles={5}>
      <FileUpload.DropZone className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-8 transition-colors data-[drag-over]:border-neutral-500 data-[drag-over]:bg-neutral-100">
        <div className="text-4xl text-neutral-400">📁</div>
        <p className="text-sm font-medium text-neutral-700">파일을 여기에 드래그하거나</p>
        <FileUpload.Trigger className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
          파일 선택
        </FileUpload.Trigger>
      </FileUpload.DropZone>
      <FileUpload.List className="mt-4 space-y-2">
        {(files) =>
          files.map((file, index) => (
            <FileUpload.Item
              key={file.name}
              file={file}
              index={index}
              className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3"
            >
              <FileUpload.ItemPreview
                className="h-10 w-10 rounded object-cover"
                fallback={<div className="flex h-10 w-10 items-center justify-center rounded bg-neutral-100 text-xs">📄</div>}
              />
              <div className="flex-1">
                <FileUpload.ItemName className="text-sm font-medium text-neutral-900" />
                <FileUpload.ItemSize className="text-xs text-neutral-500" />
              </div>
              <FileUpload.ItemDeleteTrigger className="rounded p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600">
                ✕
              </FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))
        }
      </FileUpload.List>
    </FileUpload.Root>
  );
};

const dragDropCode = `const DragDropDemo = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload.Root value={files} onValueChange={setFiles} maxFiles={5}>
      <FileUpload.DropZone className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-8 transition-colors data-[drag-over]:border-neutral-500 data-[drag-over]:bg-neutral-100">
        <div className="text-4xl text-neutral-400">📁</div>
        <p className="text-sm font-medium text-neutral-700">파일을 여기에 드래그하거나</p>
        <FileUpload.Trigger className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
          파일 선택
        </FileUpload.Trigger>
      </FileUpload.DropZone>
      <FileUpload.List className="mt-4 space-y-2">
        {(files) =>
          files.map((file, index) => (
            <FileUpload.Item key={file.name} file={file} index={index} className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3">
              <FileUpload.ItemPreview className="h-10 w-10 rounded object-cover" fallback={<div className="flex h-10 w-10 items-center justify-center rounded bg-neutral-100 text-xs">📄</div>} />
              <div className="flex-1">
                <FileUpload.ItemName className="text-sm font-medium text-neutral-900" />
                <FileUpload.ItemSize className="text-xs text-neutral-500" />
              </div>
              <FileUpload.ItemDeleteTrigger className="rounded p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600">✕</FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))
        }
      </FileUpload.List>
    </FileUpload.Root>
  );
};`;

/* ──────────────────────────────────────────────
   2. File Type Demo
   ────────────────────────────────────────────── */

const FileTypeDemo = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload.Root value={files} onValueChange={setFiles} accept="image/*">
      <FileUpload.Trigger className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
        이미지 선택
      </FileUpload.Trigger>
      <p className="mt-2 text-xs text-neutral-500">이미지 파일만 업로드할 수 있습니다.</p>
      <FileUpload.List className="mt-4 grid grid-cols-3 gap-3">
        {(files) =>
          files.map((file, index) => (
            <FileUpload.Item
              key={file.name}
              file={file}
              index={index}
              className="group relative overflow-hidden rounded-lg border border-neutral-200"
            >
              <FileUpload.ItemPreview className="aspect-square w-full object-cover" />
              <FileUpload.ItemDeleteTrigger className="absolute right-1 top-1 rounded-full bg-neutral-900/70 p-1 text-xs text-white opacity-0 transition-opacity hover:bg-neutral-900 group-hover:opacity-100">
                ✕
              </FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))
        }
      </FileUpload.List>
    </FileUpload.Root>
  );
};

const fileTypeCode = `const FileTypeDemo = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload.Root value={files} onValueChange={setFiles} accept="image/*">
      <FileUpload.Trigger className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
        이미지 선택
      </FileUpload.Trigger>
      <p className="mt-2 text-xs text-neutral-500">이미지 파일만 업로드할 수 있습니다.</p>
      <FileUpload.List className="mt-4 grid grid-cols-3 gap-3">
        {(files) =>
          files.map((file, index) => (
            <FileUpload.Item key={file.name} file={file} index={index} className="group relative overflow-hidden rounded-lg border border-neutral-200">
              <FileUpload.ItemPreview className="aspect-square w-full object-cover" />
              <FileUpload.ItemDeleteTrigger className="absolute right-1 top-1 rounded-full bg-neutral-900/70 p-1 text-xs text-white opacity-0 transition-opacity hover:bg-neutral-900 group-hover:opacity-100">
                ✕
              </FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))
        }
      </FileUpload.List>
    </FileUpload.Root>
  );
};`;

/* ──────────────────────────────────────────────
   3. File Limit Demo
   ────────────────────────────────────────────── */

const FileLimitDemo = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload.Root value={files} onValueChange={setFiles} maxSize={{ value: 2, unit: "MB" }} maxFiles={3}>
      <FileUpload.Trigger className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
        파일 선택
      </FileUpload.Trigger>
      <p className="mt-2 text-xs text-neutral-500">최대 3개, 각 파일 2MB 이하</p>
      <FileUpload.List className="mt-4 space-y-2">
        {(files) =>
          files.map((file, index) => (
            <FileUpload.Item
              key={file.name}
              file={file}
              index={index}
              className="flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 p-3"
            >
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

const fileLimitCode = `const FileLimitDemo = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload.Root value={files} onValueChange={setFiles} maxSize={{ value: 2, unit: "MB" }} maxFiles={3}>
      <FileUpload.Trigger className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
        파일 선택
      </FileUpload.Trigger>
      <p className="mt-2 text-xs text-neutral-500">최대 3개, 각 파일 2MB 이하</p>
      <FileUpload.List className="mt-4 space-y-2">
        {(files) =>
          files.map((file, index) => (
            <FileUpload.Item key={file.name} file={file} index={index} className="flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 p-3">
              <div className="flex-1">
                <FileUpload.ItemName className="text-sm font-medium text-neutral-900" />
                <FileUpload.ItemSize className="text-xs text-neutral-500" />
              </div>
              <FileUpload.ItemDeleteTrigger className="rounded p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600">✕</FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))
        }
      </FileUpload.List>
    </FileUpload.Root>
  );
};`;

/* ──────────────────────────────────────────────
   4. Validation Demo
   ────────────────────────────────────────────── */

const ValidationDemo = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleReject = (rejections: FileRejection[]) => {
    const errorMessages = rejections.flatMap((rejection) => rejection.errors.map((error) => `${rejection.file.name}: ${error.message}`));
    setErrors(errorMessages);
    setTimeout(() => setErrors([]), 5000);
  };

  return (
    <FileUpload.Root
      value={files}
      onValueChange={setFiles}
      maxSize={{ value: 1, unit: "MB" }}
      maxFiles={2}
      accept="image/*"
      onReject={handleReject}
    >
      <FileUpload.Trigger className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
        이미지 선택
      </FileUpload.Trigger>
      <p className="mt-2 text-xs text-neutral-500">이미지 파일, 최대 2개, 각 1MB 이하</p>
      {errors.length > 0 && (
        <div className="mt-3 space-y-1 rounded-lg border border-red-200 bg-red-50 p-3">
          {errors.map((error, idx) => (
            <p key={idx} className="text-xs text-red-700">
              {error}
            </p>
          ))}
        </div>
      )}
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

const validationCode = `const ValidationDemo = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleReject = (rejections: FileRejection[]) => {
    const errorMessages = rejections.flatMap((rejection) => rejection.errors.map((error) => \`\${rejection.file.name}: \${error.message}\`));
    setErrors(errorMessages);
    setTimeout(() => setErrors([]), 5000);
  };

  return (
    <FileUpload.Root value={files} onValueChange={setFiles} maxSize={{ value: 1, unit: "MB" }} maxFiles={2} accept="image/*" onReject={handleReject}>
      <FileUpload.Trigger className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
        이미지 선택
      </FileUpload.Trigger>
      <p className="mt-2 text-xs text-neutral-500">이미지 파일, 최대 2개, 각 1MB 이하</p>
      {errors.length > 0 && (
        <div className="mt-3 space-y-1 rounded-lg border border-red-200 bg-red-50 p-3">
          {errors.map((error, idx) => (
            <p key={idx} className="text-xs text-red-700">
              {error}
            </p>
          ))}
        </div>
      )}
      <FileUpload.List className="mt-4 space-y-2">
        {(files) =>
          files.map((file, index) => (
            <FileUpload.Item key={file.name} file={file} index={index} className="flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 p-3">
              <FileUpload.ItemPreview className="h-12 w-12 rounded border border-neutral-300 object-cover" />
              <div className="flex-1">
                <FileUpload.ItemName className="text-sm font-medium text-neutral-900" />
                <FileUpload.ItemSize className="text-xs text-neutral-500" />
              </div>
              <FileUpload.ItemDeleteTrigger className="rounded p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600">✕</FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))
        }
      </FileUpload.List>
    </FileUpload.Root>
  );
};`;

/* ──────────────────────────────────────────────
   5. Single File Demo
   ────────────────────────────────────────────── */

const SingleFileDemo = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload.Root value={files} onValueChange={setFiles} multiple={false}>
      <FileUpload.Trigger className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
        파일 선택
      </FileUpload.Trigger>
      <p className="mt-2 text-xs text-neutral-500">하나의 파일만 선택할 수 있습니다.</p>
      <FileUpload.List className="mt-4">
        {(files) =>
          files.map((file, index) => (
            <FileUpload.Item
              key={file.name}
              file={file}
              index={index}
              className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4"
            >
              <FileUpload.ItemPreview
                className="h-16 w-16 rounded border border-neutral-300 object-cover"
                fallback={<div className="flex h-16 w-16 items-center justify-center rounded bg-neutral-100 text-2xl">📄</div>}
              />
              <div className="flex-1">
                <FileUpload.ItemName className="text-base font-semibold text-neutral-900" />
                <FileUpload.ItemSize className="text-sm text-neutral-500" />
              </div>
              <FileUpload.ItemDeleteTrigger className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50">
                제거
              </FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))
        }
      </FileUpload.List>
    </FileUpload.Root>
  );
};

const singleFileCode = `const SingleFileDemo = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload.Root value={files} onValueChange={setFiles} multiple={false}>
      <FileUpload.Trigger className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
        파일 선택
      </FileUpload.Trigger>
      <p className="mt-2 text-xs text-neutral-500">하나의 파일만 선택할 수 있습니다.</p>
      <FileUpload.List className="mt-4">
        {(files) =>
          files.map((file, index) => (
            <FileUpload.Item key={file.name} file={file} index={index} className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <FileUpload.ItemPreview className="h-16 w-16 rounded border border-neutral-300 object-cover" fallback={<div className="flex h-16 w-16 items-center justify-center rounded bg-neutral-100 text-2xl">📄</div>} />
              <div className="flex-1">
                <FileUpload.ItemName className="text-base font-semibold text-neutral-900" />
                <FileUpload.ItemSize className="text-sm text-neutral-500" />
              </div>
              <FileUpload.ItemDeleteTrigger className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50">
                제거
              </FileUpload.ItemDeleteTrigger>
            </FileUpload.Item>
          ))
        }
      </FileUpload.List>
    </FileUpload.Root>
  );
};`;

export { ExampleSection };
