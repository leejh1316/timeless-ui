import React from "react";

/**
 * 컴포넌트의 Props 정보를 표 형태로 보여줍니다.
 * @param {Array<{prop: string, type: string, defaultValue: string, description: string}>} data - Props 데이터 배열
 */
interface PropsTableProps {
  data: Array<{
    prop: string;
    type: string;
    defaultValue?: string;
    description: string;
  }>;
}
export function PropsTable({ data }: PropsTableProps) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">Props</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
              >
                Prop
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
              >
                Default
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
            {data.map((prop) => (
              <tr key={prop.prop}>
                <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-red-500 dark:text-red-400">
                  {prop.prop}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-blue-600 dark:text-blue-400">
                  {prop.type}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {prop.defaultValue ? (
                    <code className="rounded bg-gray-100 p-1 text-xs dark:bg-gray-700">{prop.defaultValue}</code>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
