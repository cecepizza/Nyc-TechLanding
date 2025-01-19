import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, useRef } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
}

export default function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (marqueeRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = marqueeRef.current;
      if (scrollLeft > 0) {
        marqueeRef.current.scrollBy({ left: -400, behavior: "smooth" });
      } else {
        // Reset to the end to create an infinite scroll effect
        marqueeRef.current.scrollLeft = scrollWidth;
      }
    }
  };

  const scrollRight = () => {
    if (marqueeRef.current) {
      marqueeRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-0 h-full transform z-10 bg-gradient-to-b from-cyan-500 to-cyan-800 text-white p-2 rounded-lg shadow-lg hover:bg-gradient-to-b hover:from-cyan-600 hover:to-cyan-700 transition-all"
      >
        &lt;
      </button>
      <div
        {...props}
        ref={marqueeRef}
        className={cn(
          "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
          "bg-slate-900 rounded-lg border-2 border-cyan-500 shadow-lg",
          "hover:shadow-cyan-900/90 transition-all",
          {
            "flex-row": !vertical,
            "flex-col": vertical,
          },
          className
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex shrink-0 justify-around [gap:var(--gap)]",
                "text-cyan-400",
                {
                  "animate-marquee flex-row": !vertical,
                  "animate-marquee-vertical flex-col": vertical,
                  "group-hover:[animation-play-state:paused]": pauseOnHover,
                  "[animation-direction:reverse]": reverse,
                }
              )}
            >
              {children}
            </div>
          ))}
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-0 h-full transform z-10 bg-gradient-to-b from-cyan-500 to-cyan-800 text-white p-2 rounded-lg shadow-lg hover:bg-gradient-to-b hover:from-cyan-600 hover:to-cyan-700 transition-all"
      >
        &gt;
      </button>
    </div>
  );
}
