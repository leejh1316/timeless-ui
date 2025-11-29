import { Form, Popover, Toast } from "@timeless-ui/ui";
import { Avatar } from "../base/Avatar";
import clsx from "clsx";
import { useAuthStore } from "@src/store/useAuthStore";
import { Input } from "../base/Input";
import { LockIcon } from "lucide-react";
import { useLoginMutation } from "@src/api/login";
import { ComponentPropsWithRef, useState } from "react";
import { Button } from "../base/Button";

interface UserProps {
  name?: string;
  role?: string;
}
const User = ({ name, role }: UserProps) => {
  const isLogined = useAuthStore((state) => state.isLogined);
  return (
    <div>
      <Button className={clsx("rounded-xl px-2 py-1 transition-all hover:bg-zinc-200/30")}>
        <Avatar name={name || "ABC"} role={role} />
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
            <Popover.Content className="rounded-2xl bg-white shadow-md">
              <div className="w-sm p-4">
                <LoginForm
                  onLoginSuccess={() => {
                    setIsOpen(false);
                  }}
                />
              </div>
            </Popover.Content>
          </Popover.View>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};

export default User;
