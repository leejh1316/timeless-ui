import { Card } from "@src/components/base/Card";
import { Skeleton } from "@src/components/base/Skeleton";
import { Page } from "@src/components/layout/Page";

const DashboardSkeleton = () => {
  return (
    <Page.Root className="mt-6 md:mt-8">
      {/* Greeting Section Skeleton */}
      <Page.Section className="mb-6 md:mb-8">
        <Page.Content>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-48 rounded-lg bg-gray-200 md:h-10 md:w-64" />
            <Skeleton className="h-5 w-64 rounded-md bg-gray-200 md:h-6 md:w-80" />
          </div>
        </Page.Content>
      </Page.Section>

      <Page.Section>
        <Page.Content className="grid gap-4 md:grid-cols-[6fr_4fr] md:gap-6 lg:grid-cols-[7fr_3fr]">
          {/* Left Column */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* CurrentWeekReport Skeleton */}
            <Card.Root className="h-fit w-full p-6 md:p-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-16 rounded-md bg-gray-100" />
                  <Skeleton className="h-8 w-48 rounded-md bg-gray-100" />
                  <Skeleton className="h-5 w-64 rounded-md bg-gray-100" />
                  <Skeleton className="mt-4 h-4 w-32 rounded-md bg-gray-100" />
                </div>
                <Skeleton className="h-12 w-full rounded-xl bg-gray-100 md:w-36" />
              </div>
            </Card.Root>

            {/* MyCourse Skeleton */}
            <Card.Root className="w-full py-6">
              <div className="mb-4 flex items-center justify-between px-5 md:px-8">
                <Skeleton className="h-7 w-24 rounded-md bg-gray-100" />
                <Skeleton className="h-10 w-32 rounded-md bg-gray-100" />
              </div>
              <div className="flex flex-col px-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center p-3">
                    <Skeleton className="mr-4 h-[46px] w-[46px] rounded-xl bg-gray-100" />
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <Skeleton className="h-4 w-3/4 rounded-md bg-gray-100" />
                      <Skeleton className="h-3.5 w-1/2 rounded-md bg-gray-100" />
                    </div>
                    <Skeleton className="ml-4 h-6 w-16 rounded-full bg-gray-100" />
                  </div>
                ))}
              </div>
            </Card.Root>

            {/* NoticeWidget Skeleton */}
            <Card.Root className="w-full px-5 py-5 md:px-8 md:py-6">
              <div className="mb-6 flex items-center justify-between">
                <Skeleton className="h-7 w-20 rounded-md bg-gray-100" />
                <Skeleton className="h-5 w-16 rounded-md bg-gray-100" />
              </div>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-5 w-3/4 rounded-md bg-gray-100" />
                    <Skeleton className="h-5 w-16 rounded-md bg-gray-100" />
                  </div>
                ))}
              </div>
            </Card.Root>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* UserOverview Skeleton */}
            <div className="sticky top-6 h-fit">
              <Card.Root className="h-fit w-full p-5 md:p-8">
                <Skeleton className="mb-5 h-4 w-20 rounded-md bg-gray-100" />
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <Skeleton className="mb-2 h-10 w-24 rounded-md bg-gray-100" />
                    <Skeleton className="h-4 w-20 rounded-md bg-gray-100" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-full bg-gray-100" />
                </div>
                <div className="my-5 h-px bg-gray-100"></div>
                <div>
                  <Skeleton className="mb-2 h-10 w-24 rounded-md bg-gray-100" />
                  <Skeleton className="h-4 w-24 rounded-md bg-gray-100" />
                </div>
              </Card.Root>
            </div>
          </div>
        </Page.Content>
      </Page.Section>
    </Page.Root>
  );
};

export default DashboardSkeleton;
