import { Page } from "@src/components/layout/Page";
import { useQueryString } from "@timeless-ui/ui";
import LoginForm from "./components/form/LoginForm";

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
