import { forwardRef, useEffect, useReducer } from "react";
import { createContextScope, Scope } from "../../hooks/useCreateContext";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";

/* -------------------------------------------------------------------------------------------------
 * Image Types & Reducer
 * -----------------------------------------------------------------------------------------------*/

type ImageStatus = "idle" | "loading" | "loaded" | "fallback-loading" | "fallback-loaded" | "error";

interface State {
  status: ImageStatus;
  renderSrc?: string;
  renderAlt?: string;
}

type Action =
  | { type: "START_LOAD"; payload: { src?: string } }
  | { type: "LOAD_SUCCESS"; payload: { alt?: string } }
  | { type: "LOAD_ERROR"; payload: { fallbackSrc?: string; alt?: string } }
  | { type: "RESET" };

const imageReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "RESET":
      return { status: "idle", renderSrc: undefined, renderAlt: undefined };
    case "START_LOAD":
      if (!action.payload.src) return state;
      return { status: "loading", renderSrc: action.payload.src };
    case "LOAD_SUCCESS":
      if (state.status === "loading") {
        return { ...state, status: "loaded", renderAlt: action?.payload?.alt ?? "" };
      }
      if (state.status === "fallback-loading") {
        return { ...state, status: "fallback-loaded", renderAlt: action?.payload?.alt ?? "" };
      }
      return state;
    case "LOAD_ERROR":
      if (state.status === "loading" && action.payload.fallbackSrc) {
        return { status: "fallback-loading", renderSrc: action.payload.fallbackSrc };
      }
      return { ...state, status: "error", renderSrc: undefined, renderAlt: action?.payload?.alt ?? "" };
    default:
      return state;
  }
};

const initialState: State = {
  status: "idle",
  renderSrc: undefined,
};

/* -------------------------------------------------------------------------------------------------
 * Image Context
 * -----------------------------------------------------------------------------------------------*/

const IMAGE_NAME = "Image";
type ScopedProps<P> = P & { __scopeImage?: Scope };
const [createImageContext, createImageScope] = createContextScope(IMAGE_NAME);

type ImageContextValue = {
  status: ImageStatus;
  renderSrc?: string;
  renderAlt?: string;
  onLoad: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
};

const [ImageProvider, useImageContext] = createImageContext<ImageContextValue>(IMAGE_NAME);

/* -------------------------------------------------------------------------------------------------
 * Image.Root
 * -----------------------------------------------------------------------------------------------*/

interface ImageRootProps extends PrimitivePropsWithRef<"div"> {
  src?: string;
  alt?: string;
  fallbackSrc?: string;
  startLoading?: boolean;
  onStatusChange?: (status: ImageStatus) => void;
}

const ImageRoot = forwardRef<HTMLDivElement, ScopedProps<ImageRootProps>>((props, ref) => {
  const {
    __scopeImage,
    src,
    alt,
    fallbackSrc,
    startLoading = true,
    onStatusChange,
    children,
    className,
    ...rest
  } = props;

  const [state, dispatch] = useReducer(imageReducer, initialState);
  const { status, renderSrc, renderAlt } = state;

  useEffect(() => {
    dispatch({ type: "RESET" });
  }, [src]);

  useEffect(() => {
    if (startLoading && status === "idle") {
      dispatch({ type: "START_LOAD", payload: { src } });
    }
  }, [startLoading, status, src]);

  useEffect(() => {
    onStatusChange?.(status);
  }, [status, onStatusChange]);

  const handleLoad = () => {
    dispatch({ type: "LOAD_SUCCESS", payload: { alt } });
  };

  const handleError = () => {
    dispatch({ type: "LOAD_ERROR", payload: { fallbackSrc, alt } });
  };

  return (
    <ImageProvider
      scope={__scopeImage}
      status={status}
      renderSrc={renderSrc}
      renderAlt={renderAlt}
      onLoad={handleLoad}
      onError={handleError}
    >
      <Primitive.div ref={ref} className={`_base-image ${className || ""}`} data-status={status} {...rest}>
        {children}
      </Primitive.div>
    </ImageProvider>
  );
});

ImageRoot.displayName = "Image.Root";

/* -------------------------------------------------------------------------------------------------
 * Image.View
 * -----------------------------------------------------------------------------------------------*/

interface ImageViewProps extends PrimitivePropsWithRef<"img"> {
  fit?: "fill" | "contain" | "cover" | "none" | "scale-down";
}

const ImageView = forwardRef<HTMLImageElement, ScopedProps<ImageViewProps>>((props, ref) => {
  const { __scopeImage, fit = "cover", style, onLoad, onError, ...rest } = props;
  const context = useImageContext("ImageView", __scopeImage);

  return (
    <Primitive.img
      ref={ref}
      src={context.renderSrc}
      alt={context.renderAlt}
      data-status={context.status}
      style={{ objectFit: fit, ...style }}
      onLoad={(e) => {
        context.onLoad(e);
        onLoad?.(e);
      }}
      onError={(e) => {
        context.onError(e);
        onError?.(e);
      }}
      {...rest}
    />
  );
});

ImageView.displayName = "Image.View";

/* -------------------------------------------------------------------------------------------------
 * Export
 * -----------------------------------------------------------------------------------------------*/

export const Image = {
  Root: ImageRoot,
  View: ImageView,
};

export { createImageScope, ImageRoot, ImageView };
export type { ImageRootProps, ImageViewProps };
