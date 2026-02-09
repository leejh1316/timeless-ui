const Alert = () => {
  return (
    <div className="prose prose-gray max-w-none py-8">
      <div className="mb-4 text-sm font-semibold text-blue-600">Components</div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Alert</h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">사용자에게 중요한 정보를 전달하거나 경고를 표시할 때 사용하는 컴포넌트입니다.</p>

      <div className="mt-8">
        {/* Preview Area */}
        <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50/50 p-8">
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-950 shadow-sm">
            <h5 className="mb-1 font-medium leading-none tracking-tight">Default Alert</h5>
            <div className="text-sm opacity-90">기본적인 알림 메시지입니다.</div>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900 shadow-sm">
            <h5 className="mb-1 font-medium leading-none tracking-tight">Destructive Alert</h5>
            <div className="text-sm opacity-90">주의가 필요한 경고 메시지입니다.</div>
          </div>
        </div>
      </div>

      <h2 id="installation" className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Installation
      </h2>
      <div className="mt-4 rounded-md bg-gray-900 p-4">
        <code className="text-sm text-white">npm install @timeless-ui/alert</code>
      </div>

      <h2 id="usage" className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Usage
      </h2>
      <div className="mt-4 overflow-x-auto rounded-md bg-gray-900 p-4">
        <pre className="text-sm text-white">
          {`import { Alert, AlertTitle, AlertDescription } from '@timeless-ui/alert';

export default function Demo() {
  return (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  );
}`}
        </pre>
      </div>

      <h2 id="examples" className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Examples
      </h2>

      <h3 id="default" className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Default
      </h3>
      <p>기본 스타일의 알림입니다.</p>

      <h3 id="destructive" className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Destructive
      </h3>
      <p>위험하거나 부정적인 상태를 나타낼 때 사용합니다.</p>

      <h3 id="success" className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Success
      </h3>
      <p>작업이 성공적으로 완료되었음을 알릴 때 사용합니다.</p>

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
              <td className="py-2 font-mono text-gray-500">'default' | 'destructive'</td>
              <td className="py-2 font-mono text-gray-500">'default'</td>
              <td className="py-2">알림의 스타일 변형을 설정합니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Alert;
