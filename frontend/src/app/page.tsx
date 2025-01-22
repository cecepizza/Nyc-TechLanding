"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/config";
import CompactGridSection from "@/components/previews/CompactGridSection";
import { Boxes } from "@/components/ui/background-boxes";
import { BorderBeam } from "@/components/ui/border-beam";
import IntroSection from "@/components/ui/introSection";

const Home = () => {
  useEffect(() => {
    console.log("Rendering Home Component");
  }, []);

  const [eventsPreview, setEventsPreview] = useState<string[][]>([]);
  const [jobsPreview, setJobsPreview] = useState<string[][]>([]);
  const [networkPreview, setNetworkPreview] = useState<string[][]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [eventsRes, jobsRes, networkRes] = await Promise.all([
          fetch(`${config.backendUrl}/api/sheets/events?limit=6`),
          fetch(`${config.backendUrl}/api/sheets/jobs?limit=6`),
          fetch(`${config.backendUrl}/api/sheets/startups?limit=6`),
        ]);

        const eventsData = (await eventsRes.json()).data.slice(1) || [];
        const jobsData = (await jobsRes.json()).data.slice(1) || [];
        const networkData = (await networkRes.json()).data.slice(1) || [];

        console.log("Events Data:", eventsData);
        console.log("Jobs Data:", jobsData);
        console.log("Network Data:", networkData);

        setEventsPreview(eventsData);
        setJobsPreview(jobsData);
        setNetworkPreview(networkData);
      } catch (error) {
        console.error("Error fetching preview data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Events Preview Updated:", eventsPreview);
  }, [eventsPreview]);

  useEffect(() => {
    console.log("Jobs Preview Updated:", jobsPreview);
  }, [jobsPreview]);

  useEffect(() => {
    console.log("Network Preview Updated:", networkPreview);
  }, [networkPreview]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white overflow-hidden">
      {/* Background Boxes */}
      <Boxes className="absolute inset-0 z-6  transform" />

      {/* Page Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-4xl md:text-5xl mt-16 sm:mb-10 md:mt-14 font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-0 z-10 font-sans"
      >
        NYC Tech Hub
      </motion.h1>
      <BorderBeam className="z-0 fixed rounded-sm" />

      {/* Intro Section */}
      <IntroSection />

      {/* Sections */}
      <div className="space-y-8 px-4 md:px-12">
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
          link="/network"
          data={networkPreview}
          section="network"
        />
      </div>
    </div>
  );
};

export default Home;
