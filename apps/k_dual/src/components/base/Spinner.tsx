import React from "react"; // React.CSSProperties 타입을 위해 import

// --- 타입 및 프롭 정의 (변경 없음) ---
export type SpinnerColor = "primary" | "secondary" | "success" | "warning" | "danger" | "default";
interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  duration?: number;
  color?: SpinnerColor;
}

// --- 상수 정의 (변경 없음) ---
const colorVarMap: Record<SpinnerColor, string> = {
  primary: "var(--color-teal-600)",
  secondary: "var(--color-violet-500)",
  success: "var(--color-blue-500)",
  warning: "var(--color-yellow-500)",
  danger: "var(--color-red-500)",
  default: "var(--color-gray-500)",
};

const sizeMap = {
  xs: { viewPort: 16, strokeWidth: 2 },
  sm: { viewPort: 20, strokeWidth: 3 },
  md: { viewPort: 32, strokeWidth: 3 },
  lg: { viewPort: 42, strokeWidth: 4 },
  xl: { viewPort: 48, strokeWidth: 4 },
};

// --- Spinner 컴포넌트 (Tailwind CSS 적용) ---
export const Spinner = ({ size = "md", duration = 1500, color = "primary" }: SpinnerProps) => {
  const { viewPort, strokeWidth } = sizeMap[size];

  const cx = Math.round(viewPort / 2);
  const cy = Math.round(viewPort / 2);

  const r = Math.floor(viewPort / 2 - strokeWidth / 2);

  const spinnerStyle = {
    "--spinner-duration": `${duration}ms`,
    "--spinner-color": colorVarMap[color],
    animationDirection: `${duration}ms`,
  } as React.CSSProperties;
  return (
    <svg
      className="spinner"
      width={viewPort}
      height={viewPort}
      style={spinnerStyle}
      viewBox={`0 0 ${viewPort} ${viewPort}`}
    >
      <circle
        style={spinnerStyle}
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        strokeWidth={strokeWidth}
        pathLength={100}
        shapeRendering="geometricPrecision"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};
