import { Page } from "@src/components/layout/Page";
import { useQueryString } from "@timeless-ui/ui";
import { useNavigate } from "react-router";
import LoginForm from "./components/form/LoginForm";
import { Card } from "@src/components/base/Card";

const LoginPage = () => {
  const navigate = useNavigate();
  const { getQueryParam } = useQueryString();

  const onLoginSuccess = () => {
    const redirect = decodeURIComponent(getQueryParam("redirect") || "/");
    navigate(redirect as string, { replace: true, viewTransition: true });
  };

  return (
    <div className="absolute flex h-dvh w-full items-center justify-center">
      <Card className="w-full max-w-sm p-8">
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </Card>
    </div>
  );
};

export default LoginPage;
