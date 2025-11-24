import { Button, Calendar } from "@timeless-ui/ui";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  Clock,
  FileText,
  Home,
  MessageCircle,
  PenTool,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const [date, setDate] = useState(new Date(2025, 10, 23)); // November 23, 2025
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      {/* Mobile Layout */}
      <div className="mx-auto block min-h-screen w-full max-w-[460px] bg-gray-50 pb-20 md:hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-6">
          <div className="text-lg font-bold tracking-tighter text-gray-900">K-dual</div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-500 transition-colors">
            <User size={18} />
          </div>
        </header>

        {/* Greeting Section */}
        <section className="px-6 pb-8 pt-2">
          <h1 className="mb-2 text-[26px] font-light text-gray-500">
            안녕하세요, <span className="font-bold text-gray-900">이재혁</span>님
          </h1>
          <p className="text-[15px] font-normal text-gray-500">오늘도 힘찬 하루 되세요.</p>
        </section>

        {/* Action Section */}
        <section className="px-6 pb-8">
          <div className="before:bg-linear-to-r relative flex flex-col gap-5 overflow-hidden rounded-3xl bg-white p-7 shadow-sm transition-shadow before:absolute before:left-0 before:top-0 before:h-1 before:w-full before:from-teal-600 before:to-transparent hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="mb-1.5 text-lg font-bold">12주차 학습일지</h3>
                <p className="flex items-center gap-1.5 text-sm font-medium text-teal-600">
                  <Clock size={14} /> 마감까지 2일 남음
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-xl text-teal-600">
                <PenTool size={20} />
              </div>
            </div>
            <Button
              onClick={() => navigate("/learning-log")}
              className="w-full cursor-pointer rounded-2xl border-none bg-teal-600 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-teal-700"
            >
              작성 시작하기
            </Button>
          </div>
        </section>

        {/* Status Section */}
        <section className="px-6 pb-8">
          <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Overview</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2.5 rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex justify-between">
                <span className="text-[28px] font-extrabold leading-none text-gray-900">75%</span>
                <div className="h-6 w-6 rounded-full border-[3px] border-gray-200 border-t-teal-600"></div>
              </div>
              <span className="text-[13px] font-medium text-gray-500">전체 진행률</span>
            </div>
            <div className="flex flex-col gap-2.5 rounded-2xl bg-white p-5 shadow-sm">
              <span className="text-[28px] font-extrabold leading-none text-gray-900">12 / 16</span>
              <span className="text-[13px] font-medium text-gray-500">작성 완료 (주)</span>
            </div>
          </div>
        </section>

        {/* List Section */}
        <section className="px-6">
          <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Recent Activity</div>
          <div>
            {[
              {
                week: "11주",
                title: "백엔드 API 개발 기초",
                date: "2025.08.07",
                status: "pending",
                statusText: "결재 대기중",
              },
              {
                week: "10주",
                title: "데이터베이스 설계 및 구축",
                date: "2025.07.31",
                status: "success",
                statusText: "승인 완료",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center border-b border-gray-100 py-[18px] last:border-b-0">
                <div className="mr-4 flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-gray-100 text-sm font-semibold text-gray-500">
                  {item.week}
                </div>
                <div className="flex-1">
                  <div className="mb-1 text-[15px] font-semibold">{item.title}</div>
                  <div className="text-[13px] text-gray-500">
                    {item.date} • {item.statusText}
                  </div>
                </div>
                <div
                  className={`ml-auto h-2 w-2 rounded-full ${
                    item.status === "pending"
                      ? "bg-amber-400 shadow-[0_0_0_4px_#FFFBEB]"
                      : "bg-teal-600 shadow-[0_0_0_4px_#F0FDFA]"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 flex h-[70px] w-full max-w-[460px] items-center justify-around border-t border-gray-100 bg-white/90 backdrop-blur-sm">
          <div className="cursor-pointer p-2.5 text-teal-600 transition-colors">
            <Home size={22} />
          </div>
          <div className="cursor-pointer p-2.5 text-gray-400 transition-colors hover:text-teal-600">
            <FileText size={22} />
          </div>
          <div className="cursor-pointer p-2.5 text-gray-400 transition-colors hover:text-teal-600">
            <CalendarIcon size={22} />
          </div>
          <div className="cursor-pointer p-2.5 text-gray-400 transition-colors hover:text-teal-600">
            <Settings size={22} />
          </div>
        </nav>
      </div>

      {/* PC Layout */}
      <div className="mx-auto hidden max-w-[1140px] px-10 pb-16 md:block">
        {/* Header */}
        <header className="mb-10 flex h-20 items-center justify-between pt-5">
          <div className="cursor-pointer text-2xl font-extrabold tracking-tighter text-gray-900">K-dual.</div>

          <nav className="flex gap-10 rounded-[50px] bg-white px-8 py-3 shadow-sm">
            <a
              href="#"
              className="flex items-center gap-2 text-[15px] font-semibold text-teal-600 no-underline transition-colors"
            >
              <Home size={16} /> 홈
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-[15px] font-semibold text-gray-500 no-underline transition-colors hover:text-teal-600"
            >
              <FileText size={16} /> 학습일지
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-[15px] font-semibold text-gray-500 no-underline transition-colors hover:text-teal-600"
            >
              <CalendarIcon size={16} /> 일정
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-[15px] font-semibold text-gray-500 no-underline transition-colors hover:text-teal-600"
            >
              <MessageCircle size={16} /> 커뮤니티
            </a>
          </nav>

          <div className="flex cursor-pointer items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-bold text-gray-900">이재혁</div>
              <div className="text-xs text-gray-500">학습근로자</div>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-lg text-gray-500 transition-colors">
              <User size={18} />
            </div>
          </div>
        </header>

        {/* Greeting Section */}
        <section className="mb-8">
          <h1 className="mb-2 text-[32px] font-light text-gray-500">
            안녕하세요, <span className="font-bold text-gray-900">이재혁</span>님
          </h1>
          <p className="text-base text-gray-500">오늘도 힘찬 하루 되세요. 12주차 과정이 진행 중입니다.</p>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-[7fr_3fr] gap-8">
          {/* Main Column */}
          <div className="flex flex-col gap-8">
            {/* Main Card */}
            <div className="before:bg-linear-to-b relative flex items-center justify-between overflow-hidden rounded-3xl bg-white p-10 shadow-sm transition-transform before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:from-teal-600 before:to-transparent hover:-translate-y-0.5 hover:shadow-md">
              <div>
                <h3 className="mb-2 text-[22px] font-bold">12주차 학습일지</h3>
                <p className="flex items-center gap-2 text-[15px] font-semibold text-teal-600">
                  <Clock size={16} /> 마감까지 2일 남았습니다
                </p>
                <div className="mt-4 text-sm text-gray-500">이번 주차 주제: PBL OJT 진행 및 신뢰성 검증</div>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-teal-50 text-2xl text-teal-600">
                  <PenTool size={24} />
                </div>
                <Button
                  onClick={() => navigate("/learning-log")}
                  className="cursor-pointer rounded-xl border-none bg-teal-600 px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-teal-700"
                >
                  작성 시작하기
                </Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="mb-5 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">최근 활동 내역</span>
                <span className="flex cursor-pointer items-center text-sm font-medium text-gray-500 transition-colors hover:text-teal-600">
                  전체보기 <ArrowRight size={12} className="ml-1" />
                </span>
              </div>
              <div className="rounded-3xl bg-white px-8 py-2.5 shadow-sm">
                {[
                  {
                    week: "11주",
                    title: "백엔드 API 개발 기초",
                    date: "2025.08.07 제출",
                    status: "pending",
                    statusText: "결재 대기중",
                  },
                  {
                    week: "10주",
                    title: "데이터베이스 설계 및 구축",
                    date: "2025.07.31 제출",
                    status: "success",
                    statusText: "승인 완료",
                  },
                  {
                    week: "09주",
                    title: "요구사항 분석 및 설계",
                    date: "2025.07.24 제출",
                    status: "success",
                    statusText: "승인 완료",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex cursor-pointer items-center border-b border-gray-100 py-6 transition-colors last:border-b-0 hover:text-teal-600"
                  >
                    <div className="mr-5 flex h-[50px] w-[50px] items-center justify-center rounded-xl bg-gray-50 text-base font-bold text-gray-500">
                      {item.week}
                    </div>
                    <div className="flex-1">
                      <div className="mb-1.5 text-base font-semibold transition-colors group-hover:text-teal-600">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500">{item.date}</div>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold ${
                        item.status === "pending" ? "bg-amber-50 text-amber-700" : "bg-teal-50 text-teal-700"
                      }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${item.status === "pending" ? "bg-amber-500" : "bg-teal-600"}`}
                      ></div>
                      {item.statusText}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Column */}
          <div className="flex flex-col gap-8">
            {/* Status Widget */}
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="mb-5 text-base font-bold tracking-wide text-gray-500">OVERVIEW</div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-[32px] font-extrabold text-gray-900">75%</div>
                  <div className="mt-1 text-sm text-gray-500">전체 진행률</div>
                </div>
                <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-teal-600"></div>
              </div>
              <div className="my-5 h-px bg-gray-100"></div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[32px] font-extrabold text-gray-900">12 / 16</div>
                  <div className="mt-1 text-sm text-gray-500">작성 완료 (주)</div>
                </div>
              </div>
            </div>

            {/* Calendar Widget */}
            <div className="flex-1 rounded-3xl bg-white p-8 shadow-sm">
              <div className="mb-4 text-base font-bold tracking-wide text-gray-500">NOVEMBER 2025</div>
              {/* Using Custom UI Calendar */}
              <div className="w-full">
                <Calendar.Root date={date} onMonthChange={setDate}>
                  <Calendar.Header className="mb-2">
                    {(weekdays) => (
                      <div className="grid grid-cols-7 gap-2 text-center">
                        {weekdays.map((day) => (
                          <Calendar.Day key={day.day} day={day} className="mb-1 text-xs font-semibold text-gray-500">
                            {day.day}
                          </Calendar.Day>
                        ))}
                      </div>
                    )}
                  </Calendar.Header>

                  <Calendar.Content>
                    {(calendarData) => (
                      <div className="grid grid-cols-7 gap-2 text-center">
                        {calendarData.map((dateData) => (
                          <Calendar.Date
                            key={dateData.dateObject.toISOString()}
                            data={dateData}
                            className={`mx-auto flex h-[30px] w-[30px] items-center justify-center rounded-full text-sm ${
                              dateData.isToday
                                ? "bg-teal-600 font-bold text-white shadow-lg shadow-teal-600/30"
                                : "text-gray-900"
                            } ${!dateData.isCurrentMonth ? "text-gray-300" : ""} ${
                              dateData.date === 11 && dateData.isCurrentMonth
                                ? "relative after:absolute after:bottom-1 after:h-1 after:w-1 after:rounded-full after:bg-teal-600"
                                : ""
                            }`}
                          >
                            {dateData.date}
                          </Calendar.Date>
                        ))}
                      </div>
                    )}
                  </Calendar.Content>
                </Calendar.Root>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
