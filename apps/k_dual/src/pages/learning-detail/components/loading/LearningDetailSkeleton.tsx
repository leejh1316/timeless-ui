import { Card } from "@src/components/base/Card";
import { Skeleton } from "@src/components/base/Skeleton";
import { Page } from "@src/components/layout/Page";

const LearningDetailSkeleton = () => {
  return (
    <Page.Root className="mt-10 space-y-6">
      <Page.Section>
        <Page.Content className="grid grid-cols-[7fr_3fr] gap-x-6">
          <div className="flex min-w-0 items-center">
            {/* Back Button Skeleton */}
            <Skeleton className="h-10 w-10 rounded-full" />
            {/* Title Skeleton */}
            <Skeleton className="ml-3 h-8 w-48 rounded-lg" />
          </div>
          <div className="w-full min-w-0">
            {/* CurriculumSelect Skeleton */}
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </Page.Content>
      </Page.Section>

      <Page.Section>
        <Page.Content className="grid grid-cols-[7fr_3fr] gap-x-6">
          {/* Left Column */}
          <div className="flex min-w-0 flex-col gap-y-6">
            <Card.Root className="w-full p-6">
              <Card.Header>
                <Skeleton className="h-7 w-32 rounded-md" />
              </Card.Header>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-5 w-16 rounded-md" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-16 rounded-md" />
                    <Skeleton className="h-4 w-10 rounded-md" />
                  </div>
                  <Skeleton className="h-[450px] w-full rounded-lg" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-16 rounded-md" />
                    <Skeleton className="h-4 w-10 rounded-md" />
                  </div>
                  <Skeleton className="h-[130px] w-full rounded-lg" />
                </div>
                <div className="flex justify-end">
                  <Skeleton className="h-9 w-16 rounded-lg" />
                </div>
              </div>
            </Card.Root>
          </div>

          {/* Right Column */}
          <div className="flex min-w-0 flex-col gap-y-6">
            {/* TrainingInfo Skeleton */}
            <Card.Root className="p-6">
              <Card.Header>
                <Skeleton className="h-6 w-24 rounded-md" />
              </Card.Header>
              <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                <div className="col-span-2 space-y-1">
                  <Skeleton className="h-3 w-12 rounded-sm" />
                  <Skeleton className="h-5 w-full rounded-md" />
                </div>
                <div className="col-span-2 space-y-1">
                  <Skeleton className="h-3 w-20 rounded-sm" />
                  <Skeleton className="h-5 w-full rounded-md" />
                </div>
                <div className="col-span-2 space-y-1">
                  <Skeleton className="h-3 w-24 rounded-sm" />
                  <Skeleton className="h-5 w-full rounded-md" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-12 rounded-sm" />
                  <Skeleton className="h-5 w-full rounded-md" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-8 rounded-sm" />
                  <Skeleton className="h-5 w-full rounded-md" />
                </div>
              </div>
            </Card.Root>

            {/* TaskFeedback Skeleton */}
            <Card.Root className="p-6">
              <Card.Header>
                <Skeleton className="h-6 w-16 rounded-md" />
              </Card.Header>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-sm" />
                <Skeleton className="h-4 w-3/4 rounded-sm" />
              </div>
            </Card.Root>

            {/* Feedback Skeleton */}
            <Card.Root className="p-6">
              <Card.Header>
                <Skeleton className="h-6 w-16 rounded-md" />
              </Card.Header>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16 rounded-sm" />
                  <Skeleton className="h-4 w-full rounded-sm" />
                </div>
                <div className="h-px bg-gray-100" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16 rounded-sm" />
                  <Skeleton className="h-4 w-full rounded-sm" />
                </div>
              </div>
            </Card.Root>
          </div>
        </Page.Content>
      </Page.Section>
    </Page.Root>
  );
};

export default LearningDetailSkeleton;
