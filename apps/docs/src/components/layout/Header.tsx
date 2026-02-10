import { memo } from "react";
import { Link } from "react-router";

const Header = memo(() => {
  return (
    <header className="border-line-light sticky top-0 z-40 flex items-center justify-center border-b bg-white/70 backdrop-blur-md">
      <div className="max-w-page h-header flex w-full items-center justify-between px-5">
        <Link to="/" className="text-headline-6 font-bold">
          Timeless
        </Link>
        <nav>
          <ul className="text-body-2 flex gap-x-4 font-medium">
            <li>
              <Link to="/docs/introduction" className="hover:text-ink-secondary">
                Docs
              </Link>
            </li>
            <li>
              <Link to="/docs/button" className="hover:text-ink-secondary">
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
