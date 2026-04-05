"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  duration?: number;
  format?: "won" | "percent" | "number";
  decimals?: number;
};

function formatValue(
  value: number,
  format: "won" | "percent" | "number",
  decimals: number
) {
  if (format === "won") {
    return `${Math.round(value).toLocaleString("ko-KR")}원`;
  }

  if (format === "percent") {
    return `${value.toFixed(decimals)}%`;
  }

  return value.toFixed(decimals);
}

export default function AnimatedNumber({
  value,
  duration = 800,
  format = "number",
  decimals = 0,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValueRef = useRef(value);

  useEffect(() => {
    const startValue = previousValueRef.current;
    const endValue = value;

    if (startValue === endValue) {
      return;
    }

    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue =
        startValue + (endValue - startValue) * easedProgress;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        previousValueRef.current = endValue;
        setDisplayValue(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration]);

  return <>{formatValue(displayValue, format, decimals)}</>;
}