"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  MotionProps,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import React, {
  PropsWithChildren,
  useEffect,
  useState,
  useRef,
  CSSProperties,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faDiscord,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"; // Social Icons
import {
  faBuilding,
  faLink,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons"; // Office, Linktree, Email Icons
import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
  style?: CSSProperties;
  activeItem: string;
  onNavigate: (item: string) => void;
}

const DEFAULT_SIZE = 30;
const DEFAULT_MAGNIFICATION = 35;
const DEFAULT_DISTANCE = 100;

const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto flex items-center justify-center gap-1 rounded-lg border border-opacity-50 p-2 backdrop-blur-md shadow-lg"
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      style,
      activeItem,
      onNavigate,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    // Track the screen size to conditionally position the Dock
    const [isDesktop, setIsDesktop] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
      const updateScreenSize = () => setIsDesktop(window.innerWidth >= 1024);
      updateScreenSize();
      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize);
    }, []);

    const Tooltip = ({ text }: { text: string }) => (
      <div className="absolute bg-gray-800 text-white text-md rounded p-2 -translate-x bottom-full mb-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {text}
      </div>
    );

    const renderDockIcons = () => {
      return [
        {
          href: "https://linktr.ee/nyctech",
          icon: faLink,
          label: "Linktree",
          color: "hover:text-blue-600",
        },
        {
          href: "https://x.com/fractaltechnyc",
          icon: faTwitter,
          label: "Twitter",
          color: "hover:text-[#1DA1F2]",
        },
        {
          href: "https://discord.gg/VDPNm8nV",
          icon: faDiscord,
          label: "Discord",
          color: "hover:text-blue-400",
        },
        {
          href: "https://www.instagram.com/fractaltechnyc",
          icon: faInstagram,
          label: "Instagram",
          color: "hover:text-pink-400",
        },
        {
          href: "https://tally.so/r/wvBEdv",
          icon: faBuilding,
          label: "FractalTech",
          color: "hover:text-green-400",
        },
        {
          href: null,
          icon: faEnvelope,
          label: "Newsletter",
          color: "hover:text-gray-400",
        },
      ].map(({ href, icon, label, color }, index) => (
        <div className="relative group" key={index}>
          <DockIcon
            size={iconSize}
            magnification={iconMagnification}
            mouseX={mouseX}
          >
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(color)}
              >
                <FontAwesomeIcon icon={icon} size="lg" title={label} />
              </a>
            ) : (
              <div className={cn(color)}>
                <FontAwesomeIcon icon={icon} size="lg" title={label} />
              </div>
            )}
          </DockIcon>
          <Tooltip text={label} />
        </div>
      ));
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          mouseX.set(e.pageX);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
          setIsHovered(false);
        }}
        style={{
          ...style,
          opacity: isHovered ? 0.9 : 0.7,
          position: "fixed",
          padding: isDesktop ? "10px" : "5px",
          marginTop: "35px",
          marginLeft: "30px",
          zIndex: 1000,
          top: isDesktop ? "60px" : "auto",
          left: isDesktop ? "20px" : "50%",
          bottom: isDesktop ? "auto" : "10px",
          transform: isDesktop ? "none" : "translateX(-50%)",
        }}
        {...props}
        className={cn(dockVariants({ className }))}
      >
        {renderDockIcons()}
      </motion.div>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps
  extends Omit<MotionProps & React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
}

const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const padding = Math.max(6, size * 0.2);
  const defaultMouseX = useMotionValue(Infinity);

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size]
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.5,
    stiffness: 500,
    damping: 70,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center  bg-gray-900 hover:bg-gray-700 rounded-2xl transition-shadow duration-300 ease-in-out shadow-md hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
