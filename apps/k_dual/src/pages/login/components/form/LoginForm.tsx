import { useLoginMutation } from "@src/api/endpoints/login";
import { Button } from "@src/components/base/Button";
import { Input } from "@src/components/base/Input";
import { Checkbox } from "@timeless-ui/react";
import clsx from "clsx";
import { ComponentPropsWithRef } from "react";
import { Controller, useForm } from "react-hook-form";

interface LoginFormProps extends ComponentPropsWithRef<"div"> {
  onLoginSuccess?: () => void;
}

interface LoginFormData {
  userid: string;
  password: string;
  isRememberId: boolean;
}

const LoginForm = ({ onLoginSuccess, ...props }: LoginFormProps) => {
  const { mutateAsync, isPending, isError, error } = useLoginMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      userid: localStorage.getItem("rememberId") || "",
      password: "",
      isRememberId: !!localStorage.getItem("rememberId"),
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await mutateAsync({
      login_type: "",
      userid: data.userid,
      password: data.password,
      UserType: "USRT001",
    });

    if (data.isRememberId) {
      localStorage.setItem("rememberId", data.userid);
    } else {
      localStorage.removeItem("rememberId");
    }
    onLoginSuccess?.();
  };

  return (
    <div {...props}>
      <h3 className="mb-5 text-lg font-bold">K-Dual 로그인</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div className="mb-1 flex items-baseline justify-between">
            <label htmlFor="userid" className="text-sm font-bold text-gray-900">
              아이디
            </label>
            {errors.userid && <span className="text-warning-500/80 text-sm">{errors.userid.message}</span>}
          </div>
          <Input id="userid" {...register("userid", { required: "아이디를 입력해주세요." })} />
        </div>

        <div>
          <div className="mb-1 flex items-baseline justify-between">
            <label htmlFor="password" className="text-sm font-bold text-gray-900">
              비밀번호
            </label>
            {errors.password && <span className="text-warning-500/80 text-sm">{errors.password.message}</span>}
          </div>
          <Input id="password" type="password" {...register("password", { required: "비밀번호를 입력해주세요." })} />
        </div>

        <Controller
          control={control}
          name="isRememberId"
          render={({ field: { value, onChange } }) => (
            <Checkbox.Root checked={value} onCheckedChange={onChange}>
              <Checkbox.Trigger type="button" className="group cursor-pointer">
                <div className="mt-3 flex items-center space-x-1.5 rounded-lg px-1.5 py-1.5 transition-all hover:bg-zinc-100">
                  <span className="group-data-[state=checked]:border-primary-500 group-data-[state=checked]:bg-primary-500 inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-500 transition-all group-data-[pressed=true]:scale-95">
                    <Checkbox.Icon className="text-white" />
                  </span>
                  <span className="text-sm text-gray-700">아이디 저장</span>
                </div>
              </Checkbox.Trigger>
            </Checkbox.Root>
          )}
        />

        {isError && <div className="text-warning-600 pt-3 text-sm">{error.message}</div>}
        <Button
          loading={isPending}
          type="submit"
          className={clsx(
            "border-primary-500 bg-primary-500 hover:bg-primary-600 mt-6 w-full rounded-xl border px-7 py-3 text-sm text-white",
            "data-[loading=true]:bg-transparent",
          )}
        >
          로그인
        </Button>
      </form>
    </div>
  );
};
export default LoginForm;
