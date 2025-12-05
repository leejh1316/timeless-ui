import React, { useMemo } from "react";

interface CircularProgressProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showPercentage?: boolean;
}

const CircularProgress = ({
  percent,
  size = 120,
  strokeWidth = 10,
  color = "text-primary-500",
  showPercentage = false,
}: CircularProgressProps) => {
  const radius = useMemo(() => (size - strokeWidth) / 2, [size, strokeWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  const offset = useMemo(
    () => circumference - (percent / 100) * circumference,
    [circumference, percent],
  );

  const viewBox = `0 0 ${size} ${size}`;
  const center = size / 2;

  const safePercent = Math.max(0, Math.min(100, percent));

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="h-full w-full -rotate-90 transform" viewBox={viewBox}>
        <circle
          className="text-gray-200"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />

        <circle
          className={`${color} transition-all duration-500 ease-in-out`}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-800">{safePercent}%</span>
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
