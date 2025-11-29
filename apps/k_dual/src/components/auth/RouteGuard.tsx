import { useAuthStore } from "@src/store/useAuthStore";
import { Navigate, useLocation } from "react-router";

interface RouteGuardProps {
  children: React.ReactNode;
  allowedUrls?: string[];
}
const RouteGuard = ({ children, allowedUrls = [] }: RouteGuardProps) => {
  const location = useLocation();
  const isLogin = useAuthStore((state) => state.isLogin);
  const isAllowed = allowedUrls.includes(location.pathname);

  if (!isLogin && !isAllowed) {
    const redirectUrl = location.pathname + location.search;
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirectUrl)}`} replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;
