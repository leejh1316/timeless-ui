import { useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";
import { TOC } from "@timeless-ui/ui";

const DocsLayout = () => {
  const [contentRef, setContentRef] = useState<HTMLElement | null>(null);
  return (
    <TOC.Root targetElement={contentRef}>
      <TOC.Observer />
      <div className="grid grid-cols-12 gap-x-4">
        <Sidebar className="sticky top-[calc(var(--h-header)+1px)] hidden h-[calc(100dvh-var(--h-header)-1px)] overflow-auto pt-5 md:col-span-3 md:block xl:col-span-2" />
        <main className="col-span-12 pt-5 md:col-span-9 xl:col-span-8 xl:px-10" ref={setContentRef}>
          <Outlet />
        </main>
        <aside className="sticky top-[calc(var(--h-header)+1px)] hidden h-[calc(100dvh-var(--h-header)-1px)] overflow-y-auto pt-5 md:col-span-2 xl:col-span-2 xl:block">
          <div className="flex flex-col gap-4 pb-28">
            <h4 className="text-sm font-semibold text-gray-900">On This Page</h4>
            <nav className="flex flex-col gap-2">
              <TOC.Content>
                {(item, activeId) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-sm transition-colors hover:text-gray-900 ${
                      item.id === activeId ? "font-medium text-gray-900" : "text-gray-500"
                    }`}
                    style={{ paddingLeft: (item.level - 2) * 12 }}
                  >
                    {item.text}
                  </a>
                )}
              </TOC.Content>
            </nav>
          </div>
        </aside>
      </div>
    </TOC.Root>
  );
};

export default DocsLayout;
