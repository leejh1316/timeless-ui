import { Page } from "@src/components/layout/Page";
import { Checkbox, Tooltip, useQueryString } from "@timeless-ui/ui";
import { useNavigate } from "react-router";
import LoginForm from "./components/form/LoginForm";
import { Card } from "@src/components/base/Card";
import { getMockMode, toggleMockMode } from "@src/config/mock";

const LoginPage = () => {
  const navigate = useNavigate();
  const { getQueryParam } = useQueryString();

  const onLoginSuccess = () => {
    const redirect = decodeURIComponent(getQueryParam("redirect") || "/");
    navigate(redirect as string, { replace: true, viewTransition: true });
  };

  return (
    <div className="absolute flex h-dvh w-full items-center justify-center">
      <Card.Root className="w-full max-w-sm p-8">
        <LoginForm onLoginSuccess={onLoginSuccess} />
        <Tooltip.Root>
          <Checkbox.Root
            defaultChecked={getMockMode()}
            onCheckedChange={() => {
              toggleMockMode();
            }}
          >
            <div className="mt-1 text-right">
              <Tooltip.Trigger asChild>
                <Checkbox.Trigger type="button" className="group cursor-pointer">
                  <div className="flex items-center space-x-1.5 rounded-lg px-1.5 py-1.5 transition-all hover:bg-zinc-100">
                    <span className="text-sm text-gray-600">Mock 모드</span>
                    <span className="group-data-[state=checked]:border-primary-500 group-data-[state=checked]:bg-primary-500 inline-flex h-4 w-4 items-center justify-center rounded-md border border-gray-500 transition-all group-data-[pressed=true]:scale-95">
                      <Checkbox.Icon className="text-white" />
                    </span>
                  </div>
                </Checkbox.Trigger>
              </Tooltip.Trigger>
            </div>
          </Checkbox.Root>
          <Tooltip.Portal>
            <Tooltip.Content>
              <Card.Root className="rounded-lg p-2">
                <h3 className="text-sm font-semibold">Mock 모드</h3>
                <p className="mt-0.5 text-sm text-gray-600">미리 정의된 데이터를 사용하여 앱을 테스트할 수 있습니다.</p>
              </Card.Root>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Card.Root>
    </div>
  );
};

export default LoginPage;
