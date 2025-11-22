import Button from "@src/components/base/Button";
import { useNavigate } from "react-router";

interface PageNotFoundProps {
  homePath?: string; // 홈 화면으로 이동할 경로
}
const PageNotFound = ({ homePath = "/" }: PageNotFoundProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-primary mb-4 text-6xl font-bold">404</h1>
        <p className="text-default-700 mb-6 font-normal">
          페이지를 찾을 수 없습니다.
          <br />
          주소가 정확한지 확인해주세요.
        </p>
        <div className="space-x-2">
          <Button color="primary" onClick={() => navigate(homePath)}>
            홈으로 이동
          </Button>
          <Button onClick={() => navigate(-1)}>뒤로가기</Button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
