import { Button } from "@src/components/base/Button";
import { Card } from "@src/components/base/Card";
import { Tooltip, useQueryString } from "@timeless-ui/ui";
import { useNavigate } from "react-router";
import LoginForm from "./components/form/LoginForm";
import { setMockMode } from "@src/config/mock";

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
          <div className="mt-1 text-right">
            <Tooltip.Trigger asChild>
              <Button
                className="group cursor-pointer"
                onClick={() => {
                  setMockMode(true);
                  onLoginSuccess();
                  window.location.reload();
                }}
              >
                <div className="flex items-center space-x-1.5 rounded-lg px-1.5 py-1.5 transition-all hover:bg-zinc-100">
                  <span className="text-sm text-gray-600">체험 모드로 시작하기</span>
                </div>
              </Button>
            </Tooltip.Trigger>
          </div>
          <Tooltip.Portal>
            <Tooltip.Content>
              <Card.Root className="rounded-lg p-3">
                <h3 className="font-semibold">체험 모드 (Mock)</h3>
                <p className="mt-0.5 text-sm text-gray-600">미리 구성된 데이터로 서비스를 둘러볼 수 있습니다.</p>
                <div className="mt-2 text-sm font-semibold text-rose-500">※ 기능이 제한됩니다.</div>
              </Card.Root>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Card.Root>
    </div>
  );
};

export default LoginPage;
