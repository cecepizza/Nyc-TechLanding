"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

interface Job {
  title: string;
  company: string;
  description: string;
  location: string;
  url: string;
}

const ReviewCard = ({ title, company, description, location }: Job) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-col">
        <figcaption className="text-base font-medium dark:text-white">
          {title}
        </figcaption>
        <p className="text-sm font-medium dark:text-white/40">{company}</p>
      </div>
      <blockquote className="mt-2 text-base">{description}</blockquote>
      <p className="mt-2 text-sm text-cyan-400">{location}</p>
    </figure>
  );
};

export function MarqueeDemo() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/sheets/jobs");
        const data = await response.json();

        // Transform sheet data into Job objects
        const jobsData = data.data.slice(1).map((row: string[]) => ({
          title: row[0] || "",
          company: row[1] || "",
          description: row[2] || "",
          location: row[3] || "",
          url: row[4] || "",
        }));

        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }

    fetchJobs();
  }, []);

  const firstRow = jobs.slice(0, jobs.length / 2);
  const secondRow = jobs.slice(jobs.length / 2);

  return (
    <div className="relative flex h-[350px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((job, idx) => (
          <ReviewCard key={idx} {...job} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((job, idx) => (
          <ReviewCard key={idx} {...job} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/50 dark:from-background/50"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white/50 dark:from-background/50"></div>
    </div>
  );
}
