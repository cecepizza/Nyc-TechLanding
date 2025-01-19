"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";
import CompactGridSection from "@/components/previews/CompactGridSection";
import EngravedTag from "@/components/ui/EngravedTag";
import { Boxes } from "@/components/ui/background-boxes";

const IntroSection = () => {
  return (
    <div className="relative max-w-4xl mx-auto mt-8 mb-10 px-4 md:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-cyan-950/80 p-6 md:p-8 rounded-lg shadow-lg"
      >
        <p className="text-gray-400 text-base md:text-lg">
          Explore the heart of NYC's tech ecosystem. Whether you're here to
          connect with innovators, find exciting events, explore job
          opportunities, or learn about startups and accelerators, this is your
          hub to thrive in the vibrant tech community.
        </p>
      </motion.div>
    </div>
  );
};

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
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white overflow-hidden">
      {/* Background Boxes */}
      <Boxes className="absolute inset-0 transform" />

      {/* Engraved Tag */}
      <EngravedTag />

      {/* Page Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-4xl md:text-5xl mt-14 font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-0 z-10"
      >
        NYC FractalTech Hub
      </motion.h1>

      {/* Intro Section */}
      <IntroSection />

      {/* Sections */}
      <div className="space-y-8 px-6 md:px-12">
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
    </div>
  );
};

export default Home;
