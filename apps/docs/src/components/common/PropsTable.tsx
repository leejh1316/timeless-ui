import clsx from "clsx";
import { forwardRef } from "react";
import { InlineCode } from "../ui/InlineCode";
import { Tooltip } from "../ui/Tooltip";
import IconButton from "../ui/IconButton";
import { Table } from "../ui/Table";

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
    <Table.Root className={clsx(className)} ref={forwardedRef} {...props}>
      <Table.Header>
        <Table.Row>
          <Table.Head>Prop</Table.Head>
          <Table.Head>Type</Table.Head>
          <Table.Head>Default</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map(({ name, type, defaultValue, description }) => (
          <Table.Row key={name}>
            <Table.Cell>
              <Table.CellLabel>Prop</Table.CellLabel>
              <div className="flex items-center gap-1">
                <InlineCode>{name}</InlineCode>
                <DescriptionTooltip description={description} />
              </div>
            </Table.Cell>
            <Table.Cell className="items-start">
              <Table.CellLabel className="mt-0.5">Type</Table.CellLabel>
              <div className="font-code break-all">{type}</div>
            </Table.Cell>
            <Table.Cell>
              <Table.CellLabel>Default</Table.CellLabel>
              <div className="font-code">{defaultValue || "—"}</div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
});
PropsTable.displayName = "PropsTable";
interface DescriptionTooltipProps {
  description?: string;
}
const DescriptionTooltip = ({ description }: DescriptionTooltipProps) => {
  if (!description) {
    return null;
  }
  return (
    <Tooltip.Root placement="top">
      <Tooltip.Trigger asChild>
        <IconButton name="info" size="tiny" className="rounded-md transition-colors hover:bg-neutral-100" />
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.View className="z-50">
          <Tooltip.Content className="text-ink-secondary text-body-3 max-w-72 bg-white p-3">{description}</Tooltip.Content>
        </Tooltip.View>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};
DescriptionTooltip.displayName = "DescriptionTooltip";

export { PropsTable };
