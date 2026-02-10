const DocDetail = () => {
  return (
    <div className="">
      <div className="mb-4 text-sm font-semibold text-blue-600">Components</div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Button</h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">사용자의 인터랙션을 유도하는 버튼 컴포넌트입니다.</p>

      <div className="mt-8">
        {/* Preview Area */}
        <div className="flex items-center justify-center gap-4 rounded-xl border border-gray-200 bg-gray-50/50 p-8">
          <button className="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">Primary</button>
          <button className="text-text-primary rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium">Secondary</button>
          <button className="rounded px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">Destructive</button>
        </div>
      </div>

      <h2 id="installation" className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Installation
      </h2>
      <div className="mt-4 rounded-md bg-gray-900 p-4">
        <code className="text-sm text-white">npm install @timeless-ui/button</code>
      </div>

      <h2 id="usage" className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Usage
      </h2>
      <div className="mt-4 overflow-x-auto rounded-md bg-gray-900 p-4">
        <pre className="text-sm text-white">
          {`import { Button } from '@timeless-ui/button';

export default function Demo() {
  return <Button>Click me</Button>;
}`}
        </pre>
      </div>

      <h2 id="props" className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Props
      </h2>
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 font-semibold">Prop</th>
              <th className="py-2 font-semibold">Type</th>
              <th className="py-2 font-semibold">Default</th>
              <th className="py-2 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-2 font-mono text-blue-600">variant</td>
              <td className="py-2 font-mono text-gray-500">'default' | 'outline' | 'ghost'</td>
              <td className="py-2 font-mono text-gray-500">'default'</td>
              <td className="py-2">버튼의 스타일 변형을 설정합니다.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 font-mono text-blue-600">size</td>
              <td className="py-2 font-mono text-gray-500">'sm' | 'md' | 'lg'</td>
              <td className="py-2 font-mono text-gray-500">'md'</td>
              <td className="py-2">버튼의 크기를 설정합니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocDetail;
