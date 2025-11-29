import { Popover } from "@timeless-ui/ui";
import clsx from "clsx";
import { useState } from "react";
import { Avatar } from "../base/Avatar";
import { Button } from "../base/Button";
import { useShallow } from "zustand/shallow";
import { useFetchMyInfo } from "@src/api/endpoints/my";

const User = () => {
  const { data, isLoading } = useFetchMyInfo();
  return (
    <div>
      <Button className={clsx("rounded-xl px-2 py-1 transition-all hover:bg-zinc-200/30")}>
        <Avatar
          name={data?.name || ""}
          role={data?.role}
          profileImageUrl={data?.profileImg ? `/kdual/${data.profileImg}` : undefined}
          loading={isLoading}
        />
      </Button>
    </div>
  );
};

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Popover.Root placement="bottom-end" open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <Button className={clsx("rounded-xl px-2 py-1 hover:bg-zinc-200/30")}>
            <Avatar name={"로그인"} />
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.View>
            <Popover.Content className="rounded-2xl bg-white shadow-md"></Popover.Content>
          </Popover.View>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};

export default User;
