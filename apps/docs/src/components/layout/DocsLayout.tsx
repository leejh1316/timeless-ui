import { memo, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { NavLink, Outlet } from "react-router";
import { TOC, TOCItem } from "@timeless-ui/ui";

const DocsLayout = () => {
  const [contentRef, setContentRef] = useState<HTMLElement | null>(null);
  const tocContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="grid grid-cols-12 gap-x-4">
      <Sidebar className="sticky top-[calc(var(--h-header)+1px)] hidden h-[calc(100dvh-var(--h-header)-1px)] overflow-auto pt-5 md:col-span-3 md:block xl:col-span-2" />
      <main className="col-span-12 pt-5 md:col-span-9 xl:col-span-8 xl:px-10" ref={setContentRef}>
        <Outlet />
      </main>
      <TOC.Root
        targetElement={contentRef}
        onActiveItemChange={(item) => {
          if (!tocContainerRef.current) return;
          const linkElement = tocContainerRef.current.querySelector<HTMLAnchorElement>(`a[href="#${item.id}"]`);
          if (linkElement) {
            const containerHeight = tocContainerRef.current.clientHeight;
            const linkTop = linkElement.offsetTop;
            const linkHeight = linkElement.clientHeight;
            tocContainerRef.current.scrollTo({ top: linkTop - linkHeight - containerHeight / 3, behavior: "smooth" });
          }
        }}
      >
        <TOC.Observer />
        <aside
          className="sticky top-[calc(var(--h-header)+1px)] hidden h-[calc(100dvh-var(--h-header)-1px)] overflow-y-auto pt-5 md:col-span-2 xl:col-span-2 xl:block"
          ref={tocContainerRef}
        >
          <div className="flex flex-col gap-4 pb-28">
            <h4 className="text-sm font-semibold text-gray-900">On This Page</h4>
            <nav className="flex flex-col gap-2">
              <TOC.Content>{(item, activeId) => <TocItem key={item.id} {...item} isActive={item.id === activeId} />}</TOC.Content>
            </nav>
          </div>
        </aside>
      </TOC.Root>
    </div>
  );
};
interface TocItemProps {
  id: string;
  text: string;
  level: number;
  isActive: boolean;
}
const TocItem = memo(({ id, text, level, isActive }: TocItemProps) => {
  return (
    <a
      href={`#${id}`}
      className={`block text-sm transition-colors hover:text-gray-900 ${isActive ? "font-medium text-gray-900" : "text-gray-500"}`}
      style={{ paddingLeft: (level - 2) * 12 }}
    >
      {text}
    </a>
  );
});
TocItem.displayName = "TocItem";

export default DocsLayout;
