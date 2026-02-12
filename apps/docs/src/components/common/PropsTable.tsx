import clsx from "clsx";
import { forwardRef } from "react";
import { InlineCode } from "../ui/InlineCode";

type PropsTableRow = {
  name: string;
  type: string;
  defaultValue?: string;
  description?: string;
};
interface PropsTableProps extends React.ComponentProps<"table"> {
  rows: PropsTableRow[];
}
const PropsTable = forwardRef<React.ComponentRef<"table">, PropsTableProps>(({ rows, className, ...props }, forwardedRef) => {
  return (
    <table className={clsx(className, "text-body-3 w-full text-left")} ref={forwardedRef} {...props}>
      <thead>
        <tr className="border-line-regular border-b bg-neutral-50">
          <th className="text-ink-secondary px-4 py-3 font-semibold">Prop</th>
          <th className="text-ink-secondary px-4 py-3 font-semibold">Type</th>
          <th className="text-ink-secondary px-4 py-3 font-semibold">Default</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ name, type, defaultValue, description }) => (
          <tr key={name} className="text-ink-secondary border-line-regular border-b last:border-0">
            <td className="px-4 py-3">
              <InlineCode>{name}</InlineCode>
            </td>
            <td className="px-4 py-3">{type}</td>
            <td className="font-code px-4 py-3">{defaultValue || "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
PropsTable.displayName = "PropsTable";

export { PropsTable };
