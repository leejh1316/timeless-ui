import { memo } from "react";
import { Link } from "react-router";

const Header = memo(() => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-center border-b border-gray-200 bg-white/70 backdrop-blur-2xl">
      <div className="max-w-page h-header flex w-full items-center justify-between px-5">
        <Link to="/" className="text-lg font-bold uppercase">
          Timeless
        </Link>
        <nav>
          <ul className="flex gap-x-4 text-sm font-medium">
            <li>
              <Link to="/docs/introduction" className="hover:text-gray-600">
                Docs
              </Link>
            </li>
            <li>
              <Link to="/docs/button" className="hover:text-gray-600">
                Components
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
});

export default Header;
