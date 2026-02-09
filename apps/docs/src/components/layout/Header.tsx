import { memo } from "react";

const Header = memo(() => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-center border-b border-gray-200 bg-white/70 backdrop-blur-2xl">
      <div className="max-w-page h-header flex w-full items-center justify-between px-5">
        <h1 className="text-lg font-bold uppercase">Timeless</h1>
        <nav>
          <ul className="flex gap-x-4">
            <li>Docs</li>
            <li>Component</li>
          </ul>
        </nav>
      </div>
    </header>
  );
});

export default Header;
