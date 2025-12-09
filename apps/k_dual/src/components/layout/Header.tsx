import { CalendarIcon, FileText, Home, LucideProps, MessageCircle } from "lucide-react";
import { Avatar } from "../base/Avatar";
import { MenuItem, Navigation } from "../base/Navigation";
import { useLocation, useMatches, useNavigate } from "react-router";
import clsx from "clsx";
import { ComponentPropsWithRef, useMemo } from "react";
import User from "../personal/User";
import { Button } from "../base/Button";
import { useToastStore } from "@src/store/useToastStore";

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
    category: "community",
    label: "커뮤니티",
    href: "#",
    Icon: MessageCircle,
  },
];
const Header = (props: ComponentPropsWithRef<"header">) => {
  const addToast = useToastStore((state) => state.addToast);
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
    <>
      <header className="px-4" {...props}>
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex h-20 items-center justify-between pt-5">
            <div className="cursor-pointer text-2xl font-extrabold tracking-tighter text-gray-900">
              K-Dual
            </div>
            <div className="hidden md:block">
              <Navigation.Root>
                <Navigation.List className="w-sm relative flex rounded-[50px] bg-white px-1 shadow-sm">
                  <Navigation.Indicator
                    activeIndex={currentMenuIndex}
                    className="top-1/2 h-5/6 -translate-y-1/2 rounded-full bg-teal-500/10 px-3"
                  />
                  {menus.map(({ category, label, href, Icon }) => (
                    <Navigation.Item key={category} className="z-10 w-full min-w-0">
                      <Navigation.Trigger
                        onClick={() => {
                          navigate(href);

                          if (category === "community") {
                            addToast({
                              title: "개발 중인 기능입니다.",
                              status: "info",
                              description: "커뮤니티 기능은 현재 개발중입니다.",
                            });
                          }
                        }}
                        className={"w-full cursor-pointer py-3"}
                      >
                        <div>
                          <span
                            className={clsx(
                              "flex items-center justify-center gap-2 text-base no-underline transition-colors",
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
            </div>
            <User />
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-gray-200 bg-white/90 px-2 py-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] backdrop-blur-md md:hidden">
        {menus.map(({ category, label, href, Icon }) => {
          const isActive = matchMenu?.category === category;
          return (
            <Button
              key={category}
              onClick={() => navigate(href)}
              className={clsx(
                "flex flex-1 select-none flex-col items-center justify-center gap-0.5 py-1.5 transition-all",
                isActive ? "text-primary-600" : "text-gray-400",
              )}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{label}</span>
            </Button>
          );
        })}
      </nav>
    </>
  );
};
export default Header;
