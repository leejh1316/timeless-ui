import { CalendarIcon, FileText, Home, LucideProps, MessageCircle } from "lucide-react";
import { Avatar } from "../base/Avatar";
import { Button } from "@timeless-ui/ui";
import { MenuItem, Navigation } from "../base/Navigation";
import { useLocation, useMatches, useNavigate } from "react-router";

const menus: (MenuItem & {
  category: string;
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
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
const Header = () => {
  const navigate = useNavigate();
  const matches = useMatches();

  //@ts-ignore
  const currentMenuIndex = menus.findIndex((menu) => matches.some((match) => match.handle?.category === menu.category));
  return (
    <header>
      <div className="mb-10 flex h-20 items-center justify-between pt-5">
        <div className="cursor-pointer text-2xl font-extrabold tracking-tighter text-gray-900">K-dual.</div>
        <Navigation.Root>
          <Navigation.List className="relative flex gap-10 rounded-[50px] bg-white px-8 py-3 shadow-sm">
            {menus.map(({ category, label, href, Icon }) => (
              <Navigation.Item key={category}>
                <Navigation.Trigger onClick={() => navigate(href)}>
                  <span className="flex items-center gap-2 text-[15px] font-semibold text-teal-600 no-underline transition-colors">
                    <Icon size={16} /> {label}
                  </span>
                </Navigation.Trigger>
              </Navigation.Item>
            ))}
            <Navigation.Indicator activeIndex={currentMenuIndex} className="inline-block h-3 w-3 bg-teal-400" />
          </Navigation.List>
        </Navigation.Root>
        <Button>
          <Avatar name="홍길동" role="학습근로자" />
        </Button>
      </div>
    </header>
  );
};
export default Header;
