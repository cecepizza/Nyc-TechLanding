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
        "bg-[linear-gradient(110deg,#333_0.6%,#222)] p-4 max-w-md max-h-[20rem] h-full w-full rounded-xl border border-[#eaeaea] dark:border-neutral-600",
        className
      )}
    >
      <div className="flex justify-center items-center">
        <Illustration mouseEnter={mouseEnter} />
      </div>
      <div className="px-2 pb-6">{children}</div>
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
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <GlowingStarsBackgroundCard>
        <h1 className="text-4xl font-bold mb-8 ml-10">tech hub</h1>
        <div className="flex justify-center">
          <FloatingDock
            items={dockItems}
            desktopClassName="relative"
            mobileClassName="relative"
          />
        </div>
      </GlowingStarsBackgroundCard>
    </div>
  );
}
