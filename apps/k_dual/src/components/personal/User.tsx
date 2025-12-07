import { useFetchMyInfo } from "@src/api/endpoints/my";
import { Popover } from "@timeless-ui/ui";
import clsx from "clsx";
import { Avatar } from "../base/Avatar";
import { Button } from "../base/Button";
import { Image } from "../base/Image";
import { Skeleton } from "../base/Skeleton";
import { useLogoutMutation } from "@src/api/endpoints/login";
import { useNavigate } from "react-router";
import { MyInfoSchema } from "@src/api/schema/my/my-info";

const User = () => {
  const { data, isLoading } = useFetchMyInfo();
  return (
    <div>
      <Popover.Root placement="bottom-end">
        <Popover.Trigger asChild>
          <Button className={clsx("rounded-xl px-2 py-1 transition-all hover:bg-zinc-200/30")}>
            <Avatar
              name={data?.name || ""}
              role={data?.role}
              profileImageUrl={data?.profileImg ? `/kdual/${data.profileImg}` : undefined}
              loading={isLoading}
            />
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.View>
            <UserDetail userDetail={data!} loading={isLoading} />
          </Popover.View>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

interface UserDetailProps {
  userDetail: MyInfoSchema;
  loading?: boolean;
}
const UserDetail = ({ userDetail, loading }: UserDetailProps) => {
  const navigate = useNavigate();
  const { mutateAsync: logout, isPending } = useLogoutMutation();
  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };
  return (
    <Popover.Content className="rounded-2xl bg-white shadow-md">
      {loading ? (
        <UserDetailLoading />
      ) : (
        <div>
          <div className="w-sm p-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full">
                <Image.Root
                  src={userDetail?.profileImg ? `/kdual/${userDetail.profileImg}` : ""}
                  fallbackSrc=""
                  alt={`${userDetail?.name}의 프로필 이미지`}
                  className="overflow-hidden rounded-full"
                >
                  <Image.View fit="cover" />
                </Image.Root>
              </div>
              <div>
                <div className="text-sm font-medium">{userDetail?.name ?? "-"}</div>
                <div className="text-xs text-zinc-500">{userDetail?.role ?? "-"}</div>
              </div>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-x-2 gap-y-3 text-sm">
              <div className="col-span-2">
                <dt className="text-xs text-zinc-400">이메일</dt>
                <dd className="break-all text-sm text-zinc-700">{userDetail?.email ?? "-"}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-400">전화</dt>
                <dd className="text-sm text-zinc-700">{userDetail?.phone ?? "-"}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-400">학번</dt>
                <dd className="text-sm text-zinc-700">{userDetail?.studentId ?? "-"}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-400">조직</dt>
                <dd className="break-all text-sm text-zinc-700">
                  {userDetail?.organization ?? "-"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-400">부서 / 팀</dt>
                <dd className="text-sm text-zinc-700">{userDetail?.department ?? "-"}</dd>
              </div>
            </dl>

            <div className="mt-5 flex gap-2">
              <Button
                onClick={handleLogout}
                loading={isPending}
                className="flex-1 rounded-lg bg-zinc-100 px-2 py-3 text-sm hover:bg-zinc-200"
              >
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      )}
    </Popover.Content>
  );
};

const UserDetailLoading = () => {
  return (
    <div>
      <div className="w-sm p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-11 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-3 w-12 rounded" />
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-2 gap-y-3 text-sm">
          <div className="col-span-2">
            <dt className="text-xs text-zinc-400">이메일</dt>
            <dd className="mt-1">
              <Skeleton className="h-4 w-40 rounded" />
            </dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-400">전화</dt>
            <dd className="mt-1">
              <Skeleton className="h-4 w-24 rounded" />
            </dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-400">학번</dt>
            <dd className="mt-1">
              <Skeleton className="h-4 w-20 rounded" />
            </dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-400">조직</dt>
            <dd className="mt-1">
              <Skeleton className="h-4 w-32 rounded" />
            </dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-400">부서 / 팀</dt>
            <dd className="mt-1">
              <Skeleton className="h-4 w-24 rounded" />
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex gap-2">
          <Skeleton className="h-11 flex-1 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default User;
