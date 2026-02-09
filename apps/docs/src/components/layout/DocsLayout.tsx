import { useRef, useState } from "react";
import Sidebar from "./Sidebar";
import TOC from "./TOC";
import { Outlet } from "react-router";

const DocsLayout = () => {
  const [contentRef, setContentRef] = useState<HTMLElement | null>(null);
  return (
    <>
      <Sidebar />
      <TOC.Root targetElement={contentRef}>
        <main className="md:col-span-9 lg:col-span-10 xl:col-span-8" ref={setContentRef}>
          <Outlet />
          <TOC.Observer />
        </main>
        <aside className="sticky top-[calc(var(--h-header)+1px)] hidden h-[calc(100vh-var(--h-header)-1px)] overflow-y-auto py-8 pl-8 md:col-span-3 md:block lg:col-span-2 xl:col-span-2">
          <div className="flex flex-col gap-4">
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
      </TOC.Root>
    </>
  );
};

export default DocsLayout;
