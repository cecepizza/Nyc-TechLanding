"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Illustration } from "@/components/ui/illustration";

export const GlowingStarsBackgroundCard = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <div
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
      className={cn(
        "bg-[linear-gradient(110deg,#333_0.6%,#222)] p-4 w-full min-h-screen",
        "rounded-xl border border-[#eaeaea] dark:border-neutral-600",
        "flex flex-col",
        className
      )}
    >
      <div className="flex justify-center items-center h-[200px] md:h-[300px]">
        <Illustration mouseEnter={mouseEnter} />
      </div>
      <div className="flex-1 px-4 md:px-8 py-6 overflow-auto">{children}</div>
    </div>
  );
};
