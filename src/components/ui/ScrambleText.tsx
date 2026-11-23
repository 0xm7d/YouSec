import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  characters?: string;
  speed?: number; // ms per tick
  delay?: number; // initial delay ms
  triggerOnHover?: boolean;
  autoStart?: boolean;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
}

const DEFAULT_CHARS = '01#@!$%&><[]*~^/\\ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  characters = DEFAULT_CHARS,
  speed = 30,
  delay = 0,
  triggerOnHover = true,
  autoStart = true,
  as: Component = 'span',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);
  const frameRef = useRef<number | null>(null);

  const startScramble = useCallback(() => {
    if (isScrambling.current) return;
    isScrambling.current = true;

    let iteration = 0;
    const maxIterations = text.length;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - lastTime;

      if (elapsed >= speed) {
        lastTime = currentTime;

        setDisplayText(() =>
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) {
                return text[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        iteration += 1 / 2; // smooth multi-cycle per character
      }

      if (iteration < maxIterations) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        isScrambling.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [text, characters, speed]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (autoStart) {
      timer = setTimeout(() => {
        startScramble();
      }, delay);
    }
    return () => {
      if (timer) clearTimeout(timer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [autoStart, delay, startScramble]);

  const handleMouseEnter = () => {
    if (triggerOnHover && !isScrambling.current) {
      startScramble();
    }
  };

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      className={`inline-block font-mono cursor-default select-none ${className}`}
    >
      {displayText}
    </Component>
  );
};
