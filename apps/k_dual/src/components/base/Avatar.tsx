import clsx from "clsx";
import { User } from "lucide-react";
import { ComponentPropsWithRef, forwardRef } from "react";
import { Image } from "./Image";
import { Skeleton } from "./Skeleton";

interface AvatarProps extends ComponentPropsWithRef<"div"> {
  name: string;
  profileImageUrl?: string;
  role?: string;
  loading?: boolean;
}
const Avatar = forwardRef<React.ComponentRef<"div">, AvatarProps>((props, forwardedRef) => {
  const { className, name, profileImageUrl, role, loading, ...elementProps } = props;
  return (
    <div
      className={clsx(className, "flex items-center gap-3")}
      {...elementProps}
      ref={forwardedRef}
    >
      <div className="text-right">
        {loading ? (
          <>
            <Skeleton className="mb-1 h-4 w-10 rounded-md" />
            <Skeleton className="h-3 w-8 rounded-md" />
          </>
        ) : (
          <>
            <div className="text-sm font-bold text-gray-900">{name}</div>
            {role && <div className="text-xs text-gray-500">{role}</div>}
          </>
        )}
      </div>
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-lg text-gray-500 transition-colors">
        {profileImageUrl ? (
          <Image.Root
            src={profileImageUrl}
            fallbackSrc=""
            alt={`${name}의 프로필 이미지`}
            className="h-11 w-11 overflow-hidden rounded-full"
          >
            <Image.View fit="cover" />
          </Image.Root>
        ) : (
          <User size={18} />
        )}
      </div>
    </div>
  );
});

export { Avatar };
