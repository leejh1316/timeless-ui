import { Card } from "@src/components/base/Card";
import CircularProgress from "@src/components/base/CircularProgress";

// 유저 학습활동 진행률
interface UserOverviewProps {}
const UserOverview = () => {
  return (
    <Card>
      <UserOverViewProgress />
    </Card>
  );
};

const UserOverViewProgress = () => {
  return (
    <div className="flex justify-between">
      <CircularProgress percent={70} />
    </div>
  );
};

const UserOverviewAbsolute = () => {};

export default UserOverview;
