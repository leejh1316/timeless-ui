import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router";

interface RouteGuardProps {
  children: React.ReactNode;
  allowedUrls?: string[];
}
const RouteGuard = ({ children, allowedUrls = ["/login"] }: RouteGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectToLogin = () => {
    navigate(
      {
        pathname: "/login",
        search: `?redirect=${window.location.pathname}`,
      },
      { replace: true },
    );
  };

  useLayoutEffect(() => {
    const isAllowed = allowedUrls.includes(location.pathname);
    if (!isAllowed) {
      redirectToLogin();
    }
  }, [allowedUrls, location.pathname]);
  return <>{children}</>;
};
