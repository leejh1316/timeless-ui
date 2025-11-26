import { Button, Form, Popover, Toast } from "@timeless-ui/ui";
import { Avatar } from "../base/Avatar";
import clsx from "clsx";
import { useAuthStore } from "@src/store/useAuthStore";
import { Input } from "../base/Input";
import { LockIcon } from "lucide-react";
import { useLoginMutation } from "@src/api/login";
import { useState } from "react";

interface UserProps {
  name?: string;
  role?: string;
}
const User = ({ name, role }: UserProps) => {
  const isLogined = useAuthStore((state) => state.isLogined);
  return (
    <div>
      {isLogined ? (
        <Button
          className={clsx(
            "cursor-pointer rounded-xl px-2 py-1 transition-all hover:bg-zinc-200/30",
            "data-[pressed=true]:scale-95",
          )}
        >
          <Avatar name={name} role={role} />
        </Button>
      ) : (
        <Login />
      )}
    </div>
  );
};

const Login = () => {
  const { mutateAsync, isPending, error } = useLoginMutation();

  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const userid = form.get("userid");
    const password = form.get("password");
    await mutateAsync({
      login_type: "",
      userid: userid as string,
      password: password as string,
      UserType: "USRT001",
    });
    setIsOpen(false);
  };
  return (
    <>
      <Popover.Root placement="bottom-end" open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger
          className={clsx(
            "cursor-pointer rounded-xl px-2 py-1 transition-all hover:bg-zinc-200/30",
            "data-[pressed=true]:scale-95",
          )}
        >
          <Avatar name={"로그인"} />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.View>
            <Popover.Content className="rounded-2xl bg-white shadow-md">
              <div className="w-sm p-4">
                <h3 className="mb-5 text-lg font-bold">로그인</h3>
                <Form.Root onSubmit={handleSubmit}>
                  <Form.Field name="userid" className="mb-4">
                    <div className="mb-1 flex items-baseline justify-between">
                      <Form.Label className="text-sm font-bold text-gray-900">아이디</Form.Label>
                      <Form.Message match="valueMissing" className="text-sm opacity-80">
                        아이디를 입력해주세요.
                      </Form.Message>
                    </div>
                    <Form.Control asChild>
                      <Input.Area required />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field name="password">
                    <div className="mb-1 flex items-baseline justify-between">
                      <Form.Label className="text-sm font-bold text-gray-900">비밀번호</Form.Label>
                      <Form.Message match="valueMissing" className="text-sm opacity-80">
                        비밀번호를 입력해주세요.
                      </Form.Message>
                    </div>
                    <Form.Control asChild>
                      <Input.Area type="password" required />
                    </Form.Control>
                  </Form.Field>
                  <Form.Submit asChild>
                    <Button
                      disabled={isPending}
                      className={clsx(
                        "mt-6 w-full rounded-xl bg-teal-500 px-7 py-3 text-sm text-white transition-all hover:bg-teal-600 data-[pressed=true]:scale-[98%]",
                        "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",
                      )}
                    >
                      로그인
                    </Button>
                  </Form.Submit>
                </Form.Root>
              </div>
            </Popover.Content>
          </Popover.View>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};
export default User;
