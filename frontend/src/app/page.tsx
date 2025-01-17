"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";
import CompactGridSection from "@/components/previews/CompactGridSection";
// import { Boxes } from "@/components/ui/background-boxes";

const Home = () => {
  const [eventsPreview, setEventsPreview] = useState<string[][]>([]);
  const [jobsPreview, setJobsPreview] = useState<string[][]>([]);
  const [ecosystemPreview, setEcosystemPreview] = useState<string[][]>([]);

  useEffect(() => {
    const fetchPreviews = async () => {
      try {
        const [eventsRes, jobsRes, ecosystemRes] = await Promise.all([
          fetch(`${config.backendUrl}/api/sheets/events?limit=6`),
          fetch(`${config.backendUrl}/api/sheets/jobs?limit=6`),
          fetch(`${config.backendUrl}/api/sheets/startups?limit=6`),
        ]);

        setEventsPreview((await eventsRes.json()).data.slice(1) || []);
        setJobsPreview((await jobsRes.json()).data.slice(1) || []);
        setEcosystemPreview((await ecosystemRes.json()).data || []);
      } catch (error) {
        console.error("Error fetching preview data:", error);
      }
    };

    fetchPreviews();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black to-slate-900 text-white overflow-hidden">
      {/* Glowing Stars Background */}
      <div className="absolute inset-0 z-0">
        {/* <Boxes /> */}
        <div className="absolute inset-0 bg-stars z-0"></div>
      </div>

      {/* Page Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mt-12 mb-12 z-10"
      >
        NYC Tech Hub
      </motion.h1>

      {/* Sections */}
      <CompactGridSection
        title="Upcoming Events"
        description="Discover the latest tech events happening in NYC."
        link="/events"
        data={eventsPreview}
        section="events"
      />
      <CompactGridSection
        title="Featured Jobs"
        description="Explore exciting job opportunities in the tech industry."
        link="/jobs"
        data={jobsPreview}
        section="jobs"
      />
      <CompactGridSection
        title="NYC Tech Ecosystem"
        description="Learn about startups, VCs, and accelerators in NYC."
        link="/ecosystem"
        data={ecosystemPreview}
        section="ecosystem"
      />
    </div>
  );
};

export default Home;
