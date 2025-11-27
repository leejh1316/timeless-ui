import clsx from "clsx";

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  radius?: string;
  style?: React.CSSProperties;
}
export const Skeleton = ({ className, height, radius, width, style }: SkeletonProps) => {
  return <div className={clsx("skeleton", className)}></div>;
};
