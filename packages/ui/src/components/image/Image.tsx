import { useMergeRefs } from "../../hooks/useMergeRefs";
import { forwardRef, useEffect, useReducer, useRef } from "react";

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

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  startLoading?: boolean;
  fit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  onStatusChange?: (status: ImageStatus) => void;
}

const initialState: State = {
  status: "idle",
  renderSrc: undefined,
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    { src, alt, fallbackSrc, fit = "cover", onLoad, onError, onStatusChange, startLoading = true, style, ...props },
    ref,
  ) => {
    const [state, dispatch] = useReducer(imageReducer, initialState);
    const { status, renderSrc, renderAlt } = state;

    const imgRef = useRef<HTMLImageElement | null>(null);
    const mergedRef = useMergeRefs<HTMLImageElement | null>(imgRef, ref);

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

    return (
      <div className="_base-image" data-status={status}>
        <img
          {...props}
          alt={renderAlt}
          style={{ objectFit: fit, ...style }}
          src={renderSrc}
          ref={mergedRef}
          data-status={status}
          onLoad={(event) => {
            dispatch({ type: "LOAD_SUCCESS", payload: { alt } });
            onLoad?.(event);
          }}
          onError={(event) => {
            dispatch({ type: "LOAD_ERROR", payload: { fallbackSrc, alt } });
            onError?.(event);
          }}
        />
      </div>
    );
  },
);

Image.displayName = "Image";
