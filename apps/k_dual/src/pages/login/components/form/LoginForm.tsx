import { useLoginMutation } from "@src/api/endpoints/login";
import { Button } from "@src/components/base/Button";
import { Input } from "@src/components/base/Input";
import { Checkbox, Form } from "@timeless-ui/ui";
import clsx from "clsx";
import { ComponentPropsWithRef, useState } from "react";

interface LoginFormProps extends ComponentPropsWithRef<"div"> {
  onLoginSuccess?: () => void;
}
const LoginForm = ({ onLoginSuccess, ...props }: LoginFormProps) => {
  const { mutateAsync, isPending, isError, error } = useLoginMutation();
  const [isRememberId, setIsRememberId] = useState<boolean>(!!localStorage.getItem("rememberId"));
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
    if (isRememberId) {
      localStorage.setItem("rememberId", userid as string);
    } else {
      localStorage.removeItem("rememberId");
    }
    onLoginSuccess?.();
  };
  return (
    <div {...props}>
      <h3 className="mb-5 text-lg font-bold">K-Dual 로그인</h3>
      <Form.Root onSubmit={handleSubmit}>
        <Form.Field name="userid" className="mb-4">
          <div className="mb-1 flex items-baseline justify-between">
            <Form.Label className="text-sm font-bold text-gray-900">아이디</Form.Label>
            <Form.Message match="valueMissing" className="text-sm opacity-80">
              아이디를 입력해주세요.
            </Form.Message>
          </div>
          <Form.Control asChild>
            <Input
              required
              defaultValue={isRememberId ? localStorage.getItem("rememberId") || "" : ""}
            />
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
            <Input type="password" required />
          </Form.Control>
        </Form.Field>
        <Checkbox.Root
          checked={isRememberId}
          onCheckedChange={(state) => setIsRememberId(state === true)}
        >
          <Checkbox.Trigger type="button" className="group" asChild>
            <Button>
              <div className="mt-3 flex items-center space-x-1.5 rounded-lg px-1.5 py-1.5 transition-all hover:bg-zinc-100">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-500 transition-all group-data-[state=checked]:border-teal-500 group-data-[state=checked]:bg-teal-500">
                  <Checkbox.Icon className="text-white" />
                </span>
                <span className="text-sm text-gray-700">아이디 저장</span>
              </div>
            </Button>
          </Checkbox.Trigger>
        </Checkbox.Root>
        {isError && <div className="pt-3 text-sm text-red-600">{error.message}</div>}
        <Form.Submit asChild>
          <Button
            loading={isPending}
            className={clsx(
              "mt-6 w-full rounded-xl border border-teal-500 bg-teal-500 px-7 py-3 text-sm text-white hover:bg-teal-600",
              "data-[loading=true]:bg-transparent",
            )}
          >
            로그인
          </Button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};
export default LoginForm;
