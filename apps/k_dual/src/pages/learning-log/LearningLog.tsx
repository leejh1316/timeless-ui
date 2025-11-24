import { Button } from "@timeless-ui/ui";
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Lock,
  PlayCircle,
  Plus,
  UserCircle,
} from "lucide-react";

export default function LearningLog() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
      {/* Mobile Layout */}
      <div className="mx-auto block min-h-screen w-full max-w-[480px] bg-gray-50 pb-10 md:hidden">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center gap-4 bg-gray-50/85 px-6 py-5 backdrop-blur-sm">
          <ArrowLeft className="cursor-pointer text-gray-900" size={20} />
          <span className="text-lg font-bold text-gray-900">학습 강의실</span>
        </header>

        {/* Course Info Card */}
        <div className="relative mx-6 mb-6 overflow-hidden rounded-2xl bg-white p-6 shadow-sm before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-teal-600">
          <div className="mb-1.5 flex justify-between text-[13px] font-medium text-gray-500">
            <span>2025년 2학기</span>
            <span className="font-bold text-teal-600">진행중</span>
          </div>
          <div className="mb-2 text-xl font-extrabold leading-tight">일학습병행학부</div>
          <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
            <UserCircle size={16} /> 전우치 교수님
            <span className="rounded bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-500">3학점</span>
            <span className="rounded bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-500">수강 1명</span>
          </div>

          <div className="mt-4">
            <div className="mb-2 flex justify-between text-[13px] font-semibold text-gray-900">
              <span>진도율</span>
              <span>12 / 15주차</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[80%] rounded-full bg-teal-600"></div>
            </div>
            <div className="mt-1.5 text-right text-xs font-normal text-gray-500">총 OJT 훈련시간 90hr 완료</div>
          </div>
        </div>

        {/* Notice Area */}
        <div className="mx-6 mb-5">
          <div className="mb-2.5 flex items-center justify-between text-sm font-bold uppercase tracking-wide text-gray-500">
            <span>Notice</span>
            <ChevronRight size={12} />
          </div>
          <div className="mb-2 flex items-center gap-2.5 rounded-lg border border-gray-100 bg-white px-4 py-3 text-[13px] text-gray-900">
            <span className="rounded bg-teal-50 px-1.5 py-0.5 text-[11px] font-bold text-teal-600">공지</span>
            <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              [양식] PBL 운영 시나리오 양식 다운로드
            </span>
          </div>
          <div className="mb-2 flex items-center gap-2.5 rounded-lg border border-gray-100 bg-white px-4 py-3 text-[13px] text-gray-900">
            <span className="rounded bg-teal-50 px-1.5 py-0.5 text-[11px] font-bold text-teal-600">평가</span>
            <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              [평가] 도제식현장교육훈련(OJT) 평가기준 안내
            </span>
          </div>
        </div>

        {/* Curriculum List */}
        <div className="mx-6">
          <div className="mb-2.5 text-sm font-bold uppercase tracking-wide text-gray-500">Weekly Schedule</div>

          {/* Week 1 - Completed */}
          <div className="mb-4 flex gap-4 rounded-2xl bg-white p-5 opacity-70 shadow-sm transition-all">
            <div className="flex min-w-10 flex-col items-center justify-center border-r border-gray-100 pr-4">
              <span className="text-lg font-extrabold text-gray-500">01</span>
              <CheckCircle className="mt-2 text-teal-600" size={14} />
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <div className="mb-1 text-[11px] font-medium text-gray-500">2025.09.01 ~ 09.05</div>
              <div className="mb-3 text-[15px] font-bold leading-snug text-gray-500 line-through">PBL OJT의 이해</div>
              <div className="mt-1 flex items-center justify-between">
                <div className="flex cursor-pointer items-center gap-1 text-[13px] text-gray-500 transition-colors hover:text-gray-900">
                  <Download size={14} /> 자료
                </div>
                <span className="text-xs font-semibold text-teal-600">완료됨</span>
              </div>
            </div>
          </div>

          {/* Week 7 - Completed (Eval) */}
          <div className="mb-4 flex gap-4 rounded-2xl bg-white p-5 opacity-70 shadow-sm transition-all">
            <div className="flex min-w-10 flex-col items-center justify-center border-r border-gray-100 pr-4">
              <span className="text-lg font-extrabold text-gray-500">07</span>
              <CheckCircle className="mt-2 text-teal-600" size={14} />
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <div className="mb-1 text-[11px] font-medium text-gray-500">2025.10.13 ~ 10.17</div>
              <span className="mb-1.5 inline-block w-fit rounded bg-orange-50 px-2 py-1 text-[11px] font-bold text-orange-700">
                수행평가
              </span>
              <div className="mb-3 text-[15px] font-bold leading-snug text-gray-500 line-through">
                중간(과제)평가 1 - 제안서 포트폴리오 작성
              </div>
              <div className="mt-1 flex items-center justify-between">
                <div className="flex cursor-pointer items-center gap-1 text-[13px] text-gray-500 transition-colors hover:text-gray-900">
                  <Download size={14} /> 자료
                </div>
                <span className="text-xs font-semibold text-teal-600">완료됨</span>
              </div>
            </div>
          </div>

          {/* Week 12 - Active */}
          <div className="mb-4 flex gap-4 rounded-2xl border border-teal-600 bg-white p-5 shadow-[0_4px_12px_rgba(13,148,136,0.15)] transition-all">
            <div className="flex min-w-10 flex-col items-center justify-center border-r border-gray-100 pr-4">
              <span className="text-lg font-extrabold text-teal-600">12</span>
              <PlayCircle className="mt-2 text-teal-600" size={14} />
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <div className="mb-1 text-[11px] font-medium text-gray-500">2025.11.17 ~ 11.21</div>
              <div className="mb-3 text-[15px] font-bold leading-snug text-gray-900">
                PBL OJT 진행 및 신뢰성 검증 · 기능 보완
              </div>
              <div className="mt-1 flex items-center justify-between">
                <div className="flex cursor-pointer items-center gap-1 text-[13px] text-gray-500 transition-colors hover:text-gray-900">
                  <Download size={14} /> 자료
                </div>
                <Button className="cursor-pointer rounded-lg border-none bg-teal-600 px-4 py-2 text-[13px] font-semibold text-white">
                  학습하기
                </Button>
              </div>
            </div>
          </div>

          {/* Week 13 - Locked */}
          <div className="mb-4 flex gap-4 rounded-2xl bg-white p-5 shadow-sm transition-all">
            <div className="flex min-w-10 flex-col items-center justify-center border-r border-gray-100 pr-4">
              <span className="text-lg font-extrabold text-gray-500 opacity-30">13</span>
              <Lock className="mt-2 text-gray-300" size={14} />
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <div className="mb-1 text-[11px] font-medium text-gray-500">2025.11.24 ~ 11.28</div>
              <div className="mb-3 text-[15px] font-bold leading-snug text-gray-500">
                PBL OJT 개발 마무리 및 최종평가 계획 수립
              </div>
              <div className="mt-1 flex items-center justify-between">
                <div className="flex cursor-pointer items-center gap-1 text-[13px] text-gray-500 opacity-50 transition-colors hover:text-gray-900">
                  <Download size={14} /> 자료
                </div>
                <Button
                  disabled
                  className="cursor-not-allowed rounded-lg border-none bg-gray-200 px-4 py-2 text-[13px] font-semibold text-gray-400"
                >
                  오픈예정
                </Button>
              </div>
            </div>
          </div>

          {/* Week 14 - Locked (Eval) */}
          <div className="mb-4 flex gap-4 rounded-2xl bg-white p-5 shadow-sm transition-all">
            <div className="flex min-w-10 flex-col items-center justify-center border-r border-gray-100 pr-4">
              <span className="text-lg font-extrabold text-gray-500 opacity-30">14</span>
              <Lock className="mt-2 text-gray-300" size={14} />
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <div className="mb-1 text-[11px] font-medium text-gray-500">2025.12.01 ~ 12.05</div>
              <span className="mb-1.5 inline-block w-fit rounded bg-orange-50 px-2 py-1 text-[11px] font-bold text-orange-700 opacity-70 grayscale">
                수행평가
              </span>
              <div className="mb-3 text-[15px] font-bold leading-snug text-gray-500">
                최종평가 1 - 최종결과 포트폴리오 작성
              </div>
              <div className="mt-1 flex items-center justify-between">
                <div className="flex cursor-pointer items-center gap-1 text-[13px] text-gray-500 opacity-50 transition-colors hover:text-gray-900">
                  <Download size={14} /> 자료
                </div>
                <Button
                  disabled
                  className="cursor-not-allowed rounded-lg border-none bg-gray-200 px-4 py-2 text-[13px] font-semibold text-gray-400"
                >
                  오픈예정
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PC Layout */}
      <div className="mx-auto hidden max-w-[1200px] px-10 pb-20 md:block">
        {/* Header */}
        <header className="mb-8 flex h-20 items-center justify-between pt-5">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-gray-900 hover:text-gray-900">
              <ArrowLeft size={18} />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">학습 강의실</div>
          </div>
          <div className="text-sm font-medium text-gray-500">
            홈 <span className="mx-2 text-gray-300">/</span> 내 강의실 <span className="mx-2 text-gray-300">/</span>{" "}
            <strong className="text-teal-600">일학습병행학부</strong>
          </div>
        </header>

        <div className="grid grid-cols-[1fr_360px] items-start gap-10">
          {/* Left Column (Curriculum List) */}
          <div className="flex flex-col">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-gray-900">
              <CalendarCheck className="text-teal-600" size={18} /> 주차별 학습 일정
            </h2>

            {/* Week 1 - Completed */}
            <div className="mb-4 flex items-center gap-8 rounded-2xl bg-gray-50 p-6 opacity-85 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="min-w-15 flex h-full flex-col items-center justify-center border-r border-gray-200 pr-8">
                <span className="mb-2 text-2xl font-extrabold leading-none text-gray-500">01</span>
                <CheckCircle className="text-lg text-teal-600" size={18} />
              </div>
              <div className="flex-1">
                <div className="mb-1.5 text-[13px] font-medium text-gray-500">2025.09.01 ~ 09.05</div>
                <h3 className="mb-0 text-lg font-bold text-gray-500">PBL OJT의 이해</h3>
              </div>
              <div className="ml-auto flex items-center gap-5">
                <div className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
                  <Download size={16} /> 강의자료
                </div>
                <span className="text-sm font-semibold text-teal-600">학습완료</span>
              </div>
            </div>

            {/* Week 7 - Completed (Eval) */}
            <div className="mb-4 flex items-center gap-8 rounded-2xl bg-gray-50 p-6 opacity-85 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="min-w-15 flex h-full flex-col items-center justify-center border-r border-gray-200 pr-8">
                <span className="mb-2 text-2xl font-extrabold leading-none text-gray-500">07</span>
                <CheckCircle className="text-lg text-teal-600" size={18} />
              </div>
              <div className="flex-1">
                <div className="mb-1.5 text-[13px] font-medium text-gray-500">2025.10.13 ~ 10.17</div>
                <span className="mb-2 inline-block rounded-md bg-orange-50 px-2 py-1 text-xs font-bold text-orange-700">
                  수행평가
                </span>
                <h3 className="mb-0 text-lg font-bold text-gray-500">중간(과제)평가 1 - 제안서 포트폴리오 작성</h3>
              </div>
              <div className="ml-auto flex items-center gap-5">
                <div className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
                  <Download size={16} /> 강의자료
                </div>
                <span className="text-sm font-semibold text-teal-600">제출완료</span>
              </div>
            </div>

            {/* Week 12 - Active */}
            <div className="mb-4 flex items-center gap-8 rounded-2xl border border-teal-600 bg-white p-6 shadow-[0_4px_12px_rgba(13,148,136,0.15)] transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="min-w-15 flex h-full flex-col items-center justify-center border-r border-gray-200 pr-8">
                <span className="mb-2 text-2xl font-extrabold leading-none text-teal-600">12</span>
                <PlayCircle className="text-lg text-teal-600" size={18} />
              </div>
              <div className="flex-1">
                <div className="mb-1.5 text-[13px] font-medium text-gray-500">2025.11.17 ~ 11.21</div>
                <h3 className="mb-0 text-lg font-bold text-gray-900">PBL OJT 진행 및 신뢰성 검증 · 기능 보완</h3>
                <p className="mt-1.5 text-[13px] text-gray-500">이번 주차는 시스템 테스트와 보완이 주 내용입니다.</p>
              </div>
              <div className="ml-auto flex items-center gap-5">
                <div className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
                  <Download size={16} /> 강의자료
                </div>
                <Button className="cursor-pointer rounded-xl border-none bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700">
                  학습 시작하기
                </Button>
              </div>
            </div>

            {/* Week 13 - Locked */}
            <div className="mb-4 flex items-center gap-8 rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="min-w-15 flex h-full flex-col items-center justify-center border-r border-gray-200 pr-8">
                <span className="mb-2 text-2xl font-extrabold leading-none text-gray-500 opacity-30">13</span>
                <Lock className="text-xl text-gray-300" size={20} />
              </div>
              <div className="flex-1">
                <div className="mb-1.5 text-[13px] font-medium text-gray-500">2025.11.24 ~ 11.28</div>
                <h3 className="mb-0 text-lg font-bold text-gray-500">PBL OJT 개발 마무리 및 최종평가 계획 수립</h3>
              </div>
              <div className="ml-auto flex items-center gap-5">
                <Button
                  disabled
                  className="cursor-not-allowed rounded-xl border-none bg-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-400"
                >
                  11월 24일 오픈
                </Button>
              </div>
            </div>

            {/* Week 14 - Locked (Eval) */}
            <div className="mb-4 flex items-center gap-8 rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="min-w-15 flex h-full flex-col items-center justify-center border-r border-gray-200 pr-8">
                <span className="mb-2 text-2xl font-extrabold leading-none text-gray-500 opacity-30">14</span>
                <Lock className="text-xl text-gray-300" size={20} />
              </div>
              <div className="flex-1">
                <div className="mb-1.5 text-[13px] font-medium text-gray-500">2025.12.01 ~ 12.05</div>
                <span className="mb-2 inline-block rounded-md bg-orange-50 px-2 py-1 text-xs font-bold text-orange-700 opacity-70 grayscale">
                  수행평가
                </span>
                <h3 className="mb-0 text-lg font-bold text-gray-500">최종평가 1 - 최종결과 포트폴리오 작성</h3>
              </div>
              <div className="ml-auto flex items-center gap-5">
                <Button
                  disabled
                  className="cursor-not-allowed rounded-xl border-none bg-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-400"
                >
                  12월 01일 오픈
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="sticky top-[30px] flex flex-col gap-6">
            {/* Course Info Card */}
            <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 before:bg-teal-600">
              <div className="mb-2.5 flex justify-between text-sm font-semibold text-gray-500">
                <span>2025년 2학기</span>
                <span className="font-bold text-teal-600">진행중</span>
              </div>
              <div className="mb-3 text-2xl font-extrabold leading-tight text-gray-900">일학습병행학부</div>
              <div className="mb-8 flex items-center gap-2.5 border-b border-gray-200 pb-5 text-[15px] text-gray-900">
                <UserCircle size={20} />
                <span>전우치 교수님</span>
                <span className="rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-semibold text-gray-500">3학점</span>
              </div>

              <div>
                <div className="mb-2.5 flex justify-between text-sm font-bold text-gray-900">
                  <span>진도율</span>
                  <span>12 / 15주차 (80%)</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-[80%] rounded-full bg-teal-600"></div>
                </div>
                <div className="mt-2 text-right text-[13px] font-medium text-gray-500">
                  <Clock size={14} className="mr-1 inline" /> 총 OJT 훈련 90hr 완료
                </div>
              </div>
            </div>

            {/* Notice Widget */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between text-[15px] font-bold text-gray-900">
                <span>공지사항</span>
                <Plus size={12} className="cursor-pointer text-gray-500 transition-colors hover:text-teal-600" />
              </div>

              <div className="flex cursor-pointer items-start gap-3 border-b border-gray-200 py-3 transition-colors hover:text-teal-600">
                <span className="mt-0.5 whitespace-nowrap rounded-md bg-teal-50 px-2 py-[3px] text-[11px] font-bold text-teal-600">
                  공지
                </span>
                <div>
                  <div className="text-sm leading-snug text-gray-900 transition-colors hover:text-teal-600">
                    [양식] PBL 운영 시나리오 양식 다운로드
                  </div>
                  <span className="mt-1 block text-xs text-gray-400">2025.10.09</span>
                </div>
              </div>

              <div className="flex cursor-pointer items-start gap-3 border-b border-gray-200 py-3 transition-colors hover:text-teal-600">
                <span className="mt-0.5 whitespace-nowrap rounded-md bg-orange-50 px-2 py-[3px] text-[11px] font-bold text-orange-700">
                  평가
                </span>
                <div>
                  <div className="text-sm leading-snug text-gray-900 transition-colors hover:text-teal-600">
                    [평가] 도제식현장교육훈련(OJT) 평가기준 안내
                  </div>
                  <span className="mt-1 block text-xs text-gray-400">2025.09.15</span>
                </div>
              </div>

              <div className="flex cursor-pointer items-start gap-3 py-3 pt-3 transition-colors hover:text-teal-600">
                <span className="mt-0.5 whitespace-nowrap rounded-md bg-teal-50 px-2 py-[3px] text-[11px] font-bold text-teal-600">
                  자료
                </span>
                <div>
                  <div className="text-sm leading-snug text-gray-900 transition-colors hover:text-teal-600">
                    [Sample] 훈련내용 작성 예시 파일
                  </div>
                  <span className="mt-1 block text-xs text-gray-400">2025.09.15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
