import { CalendarIcon, FileText, Home, LucideProps, MessageCircle } from "lucide-react";
import { Avatar } from "../base/Avatar";
import { Button } from "@timeless-ui/ui";
import { MenuItem, Navigation } from "../base/Navigation";
import { useLocation, useMatches, useNavigate } from "react-router";
import clsx from "clsx";
import { ComponentPropsWithRef, useMemo } from "react";
import User from "../personal/User";

const menus: (MenuItem & {
  category: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
})[] = [
  {
    category: "home",
    label: "홈",
    href: "/",
    Icon: Home,
  },
  {
    category: "learning-log",
    label: "학습일지",
    href: "/learning-log",
    Icon: FileText,
  },
  {
    category: "schedule",
    label: "일정",
    href: "#",
    Icon: CalendarIcon,
  },
  {
    category: "community",
    label: "커뮤니티",
    href: "#",
    Icon: MessageCircle,
  },
];
const Header = (props: ComponentPropsWithRef<"header">) => {
  const navigate = useNavigate();
  const matches = useMatches();

  // route 객체에 category(대분류) 추가 필수
  const [currentMenuIndex, matchMenu] = useMemo(() => {
    const matchedMenuIndex = menus.findIndex((menu) =>
      //@ts-ignore
      matches.some((match) => match.handle?.category === menu.category),
    );
    return [matchedMenuIndex, menus[matchedMenuIndex]];
  }, [matches]);
  return (
    <header className="px-4" {...props}>
      <div className="mx-auto w-full max-w-6xl">
        <div className="-mb-10 flex h-20 items-center justify-between pt-5">
          <div className="cursor-pointer text-2xl font-extrabold tracking-tighter text-gray-900">
            K-Dual
          </div>
          <Navigation.Root>
            <Navigation.List className="w-sm relative flex rounded-[50px] bg-white px-1 shadow-sm">
              <Navigation.Indicator
                activeIndex={currentMenuIndex}
                className="top-1/2 h-5/6 -translate-y-1/2 rounded-full bg-teal-500/10 px-3"
              />
              {menus.map(({ category, label, href, Icon }) => (
                <Navigation.Item key={category} className="z-10 min-w-0 shrink-0 grow text-center">
                  <Navigation.Trigger
                    onClick={() => navigate(href)}
                    className={"cursor-pointer py-3"}
                  >
                    <div>
                      <span
                        className={clsx(
                          "flex items-center gap-2 text-base no-underline transition-colors",
                          matchMenu?.category === category
                            ? "font-semibold text-teal-600"
                            : "text-gray-700 hover:text-teal-700",
                        )}
                      >
                        <Icon size={16} /> {label}
                      </span>
                    </div>
                  </Navigation.Trigger>
                </Navigation.Item>
              ))}
            </Navigation.List>
          </Navigation.Root>
          <User />
        </div>
      </div>
    </header>
  );
};
export default Header;
