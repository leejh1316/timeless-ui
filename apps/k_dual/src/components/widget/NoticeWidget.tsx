import { Notice } from "@src/api/schema/home/home";
import { Card } from "../base/Card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { Toast } from "../base/Toast";
import { useToastStore } from "@src/store/useToastStore";

interface NoticeWidgetProps {
  noticeList: Notice[];
  viewAllLink: string;
}
const NoticeWidget = ({ noticeList, viewAllLink }: NoticeWidgetProps) => {
  const [toastOpen, setToastOpen] = useState(false);
  const addToast = useToastStore((state) => state.addToast);
  return (
    <Card.Root className="w-full px-8 py-6">
      <Card.Header className="flex items-center justify-between">
        <Card.Title className="text-lg font-bold text-gray-900">공지사항</Card.Title>
        {/* <Link
          to={viewAllLink}
          className="flex cursor-pointer items-center text-sm font-medium text-gray-500 transition-colors hover:text-teal-600"
        >
          전체보기 <ArrowRight size={12} className="ml-1" />
        </Link> */}
        <span
          onClick={() =>
            addToast({
              title: "개발 중인 기능입니다.",
              status: "info",
              description: "공지사항 전체보기 기능은 현재 개발 중에 있습니다.",
            })
          }
          className="flex cursor-pointer items-center text-sm font-medium text-gray-500 transition-colors hover:text-teal-600"
        >
          전체보기 <ArrowRight size={12} className="ml-1" />
        </span>
      </Card.Header>
      <div className="flex flex-col divide-y divide-gray-200">
        {noticeList.map((notice) => (
          <NoticeItem key={notice.link} notice={notice} />
        ))}
      </div>
    </Card.Root>
  );
};

const NoticeItem = ({ notice }: { notice: Notice }) => {
  return (
    <div className="hover:text-primary-600 flex cursor-pointer items-start gap-3 border-gray-200 py-3 text-gray-900 transition-colors">
      <div>
        <div className="text-sm leading-snug transition-colors">{notice.title}</div>
        <span className="mt-1 block text-xs text-gray-400">{notice.regDate}</span>
      </div>
    </div>
  );
};

export default NoticeWidget;
