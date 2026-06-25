import { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: string; // e.g. "2,317%", "4+", "250+", "3"
  id?: string;
}

export default function Counter({ value, id }: CounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const elementRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    // Parse the value
    const match = value.match(/^([\d,]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const numberStr = match[1].replace(/,/g, "");
    const targetNumber = parseInt(numberStr, 10);
    const suffix = match[2]; // %, +, etc.

    if (isNaN(targetNumber)) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          
          let start = 0;
          const duration = 1500; // 1.5 seconds animation
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const currentVal = Math.floor(easeProgress * targetNumber);

            // Format with commas
            const formattedVal = currentVal.toLocaleString();
            setDisplayValue(`${formattedVal}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              // Ensure we show exact final value
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [value]);

  return (
    <div id={id} ref={elementRef} className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-brand-coral select-none tracking-tight">
      {displayValue}
    </div>
  );
}
