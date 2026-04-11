"use client";

import { useEffect, useState } from "react";

type FloatingHeart = {
  id: number;
  left: number;
  delay: number;
  size: number;
  duration: number;
};

type FloatingHeartsProps = {
  trigger: number;
};

export default function FloatingHearts({ trigger }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    if (!trigger || trigger <= 0) return;

    const newHearts: FloatingHeart[] = Array.from({ length: 8 }).map((_, index) => ({
      id: Date.now() + index,
      left: 20 + Math.random() * 60, // 20% ~ 80%
      delay: Math.random() * 0.4,
      size: 28 + Math.random() * 30,
      duration: 1.6 + Math.random() * 0.8,
    }));

    setHearts(newHearts);

    const timer = setTimeout(() => {
      setHearts([]);
    }, 2200);

    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart absolute bottom-8"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          💛
        </span>
      ))}
    </div>
  );
}