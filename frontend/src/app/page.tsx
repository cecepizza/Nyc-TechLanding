"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Illustration } from "@/components/illustration";
// import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBriefcase,
  IconCalendarEvent,
  IconNetwork,
} from "@tabler/icons-react";
import { MarqueeDemo } from "@/components/magicui/marqueeInfo";

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
      onMouseEnter={() => {
        setMouseEnter(true);
      }}
      onMouseLeave={() => {
        setMouseEnter(false);
      }}
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

export default function Home() {
  const dockItems = [
    {
      title: "Jobs",
      icon: <IconBriefcase />,
      href: "/jobs",
    },
    {
      title: "Events",
      icon: <IconCalendarEvent />,
      href: "/events",
    },
    {
      title: "Network",
      icon: <IconNetwork />,
      href: "/ecosystem",
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <GlowingStarsBackgroundCard>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          tech hub
        </h1>
        <div className="flex flex-col gap-8 max-w-7xl mx-auto">
          <div className="flex justify-center">
            <FloatingDock
              items={dockItems}
              desktopClassName="relative"
              mobileClassName="relative"
            />
          </div>
          <div className="w-full">
            <MarqueeDemo />
          </div>
        </div>
      </GlowingStarsBackgroundCard>
    </div>
  );
}
