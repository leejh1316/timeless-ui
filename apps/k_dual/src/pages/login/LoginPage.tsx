import { Page } from "@src/components/layout/Page";
import LoginForm from "./components/form/LoginForm";
import { useQueryString } from "@timeless-ui/ui";

const LoginPage = () => {
  const {} = useQueryString();
  const onLoginSuccess = () => {};
  return (
    <Page.Root>
      <Page.Section>
        <Page.Content>
          <LoginForm />
        </Page.Content>
      </Page.Section>
    </Page.Root>
  );
};

export default LoginPage;
