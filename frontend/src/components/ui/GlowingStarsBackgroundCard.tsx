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
        "bg-black p-4 w-full h-screen flex flex-col",
        "rounded-xl border border-[#eaeaea] dark:border-neutral-600",
        className
      )}
    >
      <div className="flex justify-center items-center h-[800px] md:h-[300px]">
        <Illustration mouseEnter={mouseEnter} />
      </div>
      <div className="flex-1 px-4 md:px-8 py-6 overflow-auto">{children}</div>
    </div>
  );
};
