import { useFetchHome } from "@src/api/endpoints/home";
import { useFetchLmsLearningDetail } from "@src/api/endpoints/lms";
import { useFetchMyInfo } from "@src/api/endpoints/my";
import { Page } from "@src/components/layout/Page";
import { useAuthStore } from "@src/store/useAuthStore";
import clsx from "clsx";

const DashboardPage = () => {
  const { data, isLoading } = useFetchMyInfo();

  return (
    <>
      <title>Dashboard - K-dual</title>
      <Page.Root className="mt-8">
        <Page.Section>
          <Page.Content>
            <h1 className={clsx("mb-2 text-2xl font-light text-gray-600", "md:text-4xl")}>
              안녕하세요, <span className="font-bold text-gray-900">{data?.name ?? ""}</span>님
            </h1>
            <p className={clsx("text-sm text-gray-600", "md:text-base")}>
              오늘도 힘찬 하루 되세요. 12주차 과정이 진행 중입니다.
            </p>
          </Page.Content>
        </Page.Section>
      </Page.Root>
    </>
  );
};

export default DashboardPage;
