import { Page } from "@src/components/layout/Page";
import { useQueryString } from "@timeless-ui/ui";
import { useNavigate } from "react-router";
import LoginForm from "./components/form/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const { getQueryParam } = useQueryString();

  const onLoginSuccess = () => {
    const redirect = decodeURIComponent(getQueryParam("redirect") || "/");
    navigate(redirect as string, { replace: true, viewTransition: true });
  };

  return (
    <Page.Root>
      <Page.Section>
        <Page.Content>
          <LoginForm onLoginSuccess={onLoginSuccess} />
        </Page.Content>
      </Page.Section>
    </Page.Root>
  );
};

export default LoginPage;
