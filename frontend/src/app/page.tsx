"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";
import { Boxes } from "@/components/ui/background-boxes";

const Home = () => {
  const [eventsPreview, setEventsPreview] = useState<any[]>([]);
  const [jobsPreview, setJobsPreview] = useState<any[]>([]);
  const [ecosystemPreview, setEcosystemPreview] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPreviews() {
      try {
        const [eventsRes, jobsRes, ecosystemRes] = await Promise.all([
          fetch(config.backendUrl + "/api/sheets/events?limit=6"),
          fetch(config.backendUrl + "/api/sheets/jobs?limit=6"),
          fetch(config.backendUrl + "/api/sheets/startups?limit=6"),
        ]);

        setEventsPreview((await eventsRes.json()).data || []);
        setJobsPreview((await jobsRes.json()).data || []);
        setEcosystemPreview((await ecosystemRes.json()).data || []);
      } catch (error) {
        console.error("Error fetching preview data:", error);
      }
    }

    fetchPreviews();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black to-slate-900 text-white overflow-hidden">
      {/* Glowing Stars Background */}
      <div className="absolute inset-0 z-0">
        <Boxes />
        <div className="absolute inset-0 bg-stars z-0"></div>
      </div>

      {/* Page Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mt-12 mb-12 z-10"
      >
        Welcome to NYC Tech Hub
      </motion.h1>

      {/* Sections */}
      <CompactGridSection
        title="Upcoming Events"
        description="Discover the latest tech events happening in NYC."
        link="/events"
        data={eventsPreview}
      />
      <CompactGridSection
        title="Featured Jobs"
        description="Explore exciting job opportunities in the tech industry."
        link="/jobs"
        data={jobsPreview}
      />
      <CompactGridSection
        title="NYC Tech Ecosystem"
        description="Learn about startups, VCs, and accelerators in NYC."
        link="/ecosystem"
        data={ecosystemPreview}
      />
    </div>
  );
};

const CompactGridSection = ({
  title,
  description,
  link,
  data,
}: {
  title: string;
  description: string;
  link: string;
  data: any[];
}) => (
  <div className="relative z-10 px-4 md:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-lg shadow-lg"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.3)", // Border for the section
        background: "rgba(10, 10, 10, 0.5)", // 50% opacity background
      }}
    >
      <div className="text-left mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-2">
          {title}
        </h2>
        <p className="text-slate-300">{description}</p>
      </div>

      {/* Compact Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <CompactPreviewCard key={index} data={item} />
        ))}
      </div>

      <div className="text-center mt-6">
        <a
          href={link}
          className="inline-block px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md font-medium text-sm transition-all"
        >
          View All →
        </a>
      </div>
    </motion.div>
  </div>
);

const CompactPreviewCard = ({ data }: { data: any }) => (
  <motion.div
    whileHover={{
      scale: 1.05,
      boxShadow: "0px 0px 15px var(--card-hover-shadow)",
    }}
    className="card flex items-center gap-4 transition-transform"
  >
    {/* Thumbnail */}
    <div
      className="w-16 h-16 bg-cover bg-center rounded-md"
      style={{
        backgroundImage: `url(${data[6] || "/previews/default.jpg"})`,
      }}
    ></div>

    {/* Content */}
    <div className="flex-1">
      <h3 className="text-cyan-300 font-bold text-sm truncate">{data[0]}</h3>
      <p className="text-slate-400 text-xs truncate">{data[1]}</p>
      {data[2] && (
        <p className="text-cyan-400 text-xs mt-1">
          <strong>Date:</strong> {data[2]}
        </p>
      )}
    </div>
  </motion.div>
);

export default Home;
