import clsx from "clsx";
import { ComponentPropsWithRef, forwardRef } from "react";

const PageRoot = forwardRef<React.ComponentRef<"div">, ComponentPropsWithRef<"div">>(
  (props, forwardedRef) => {
    return <div ref={forwardedRef} {...props} />;
  },
);
PageRoot.displayName = "Page.Root";

const PageSection = forwardRef<React.ComponentRef<"section">, ComponentPropsWithRef<"section">>(
  (props, forwardedRef) => {
    const { className, ...rest } = props;
    return <section ref={forwardedRef} className={clsx(className, "w-full px-4")} {...rest} />;
  },
);
PageSection.displayName = "Page.Section";

const PageContent = forwardRef<React.ComponentRef<"div">, ComponentPropsWithRef<"div">>(
  (props, forwardedRef) => {
    const { className, ...rest } = props;
    return <div ref={forwardedRef} className={clsx(className, "mx-auto max-w-7xl")} {...rest} />;
  },
);
PageContent.displayName = "Page.Content";

export const Page = {
  Root: PageRoot,
  Section: PageSection,
  Content: PageContent,
};
