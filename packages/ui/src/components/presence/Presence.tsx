import { useComposedRefs } from "../../hooks/useComposeRefs";
import { usePresence } from "../../hooks/usePresence";
import React from "react";

interface PresenceProps {
  present: boolean;
  children: React.ReactElement | ((props: { isPresent: boolean }) => React.ReactElement);
}

const Presence = ({ children, present }: PresenceProps) => {
  const presence = usePresence(present);
  const child = (
    typeof children === "function" ? children({ isPresent: presence.isPresent }) : React.Children.only(children)
  ) as React.ReactElement<{ ref?: React.Ref<HTMLElement> }>;

  const ref = useComposedRefs(presence.ref, getElementRef(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? React.cloneElement(child, { ref }) : null;
};

function getElementRef(element: React.ReactElement<{ ref?: React.Ref<unknown> }>) {
  // React <=18
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element as any).ref;
  }

  // React 19
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }

  // 프로덕션 또는 기타
  return element.props.ref || (element as any).ref;
}

export { Presence };
