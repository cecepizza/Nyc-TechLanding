"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { config } from "@/config";

const Home = () => {
  const [eventsPreview, setEventsPreview] = useState<any[]>([]);
  const [jobsPreview, setJobsPreview] = useState<any[]>([]);
  const [ecosystemPreview, setEcosystemPreview] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const eventsRes = await fetch(
          config.backendUrl + "/api/sheets/events?limit=3"
        );
        const jobsRes = await fetch(
          config.backendUrl + "/api/sheets/jobs?limit=3"
        );
        const ecosystemRes = await fetch(
          config.backendUrl + "/api/sheets/startups?limit=3"
        );

        const eventsData = await eventsRes.json();
        const jobsData = await jobsRes.json();
        const ecosystemData = await ecosystemRes.json();

        setEventsPreview(eventsData.data || []);
        setJobsPreview(jobsData.data || []);
        setEcosystemPreview(ecosystemData.data || []);
      } catch (error) {
        console.error("Error fetching preview data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen p-6 bg-black text-white overflow-hidden">
      {/* Glowing Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-purple-900 opacity-80"></div>
      <div className="absolute -inset-1 z-0 blur-2xl">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/30 to-transparent opacity-50 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/30 to-transparent opacity-50"></div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        className="relative z-10 text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
      >
        Welcome to NYC Tech Hub
      </motion.h1>

      <div className="space-y-16 relative z-10">
        {/* Events Section */}
        <Section
          title="Upcoming Events"
          description="Discover the latest tech events happening in NYC."
          link="/events"
          data={eventsPreview}
          backgroundImage="/previews/events-preview.jpg"
        />

        {/* Jobs Section */}
        <Section
          title="Featured Jobs"
          description="Explore exciting job opportunities in the tech industry."
          link="/jobs"
          data={jobsPreview}
          backgroundImage="/previews/jobs-preview.jpg"
        />

        {/* Ecosystem Section */}
        <Section
          title="NYC Tech Ecosystem"
          description="Learn about startups, VCs, and accelerators in NYC."
          link="/ecosystem"
          data={ecosystemPreview}
          backgroundImage="/previews/ecosystem-preview.jpg"
        />
      </div>
    </div>
  );
};

const Section = ({
  title,
  description,
  link,
  data,
  backgroundImage,
}: {
  title: string;
  description: string;
  link: string;
  data: any[];
  backgroundImage: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300"
  >
    {/* Background Glow */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-20"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    ></div>

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>

    <div className="relative z-10 p-8">
      <h2 className="text-3xl font-bold text-cyan-400 mb-4">{title}</h2>
      <p className="text-slate-300 mb-6">{description}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <PreviewCard key={index} data={item} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href={link}
          className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold text-lg transition-all duration-300"
        >
          View All →
        </Link>
      </div>
    </div>
  </motion.div>
);

const PreviewCard = ({ data }: { data: any }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-slate-800 border border-cyan-500 rounded-lg shadow-md overflow-hidden transition-all"
  >
    {/* Image Section */}
    <div
      className="h-28 bg-cover bg-center"
      style={{ backgroundImage: `url(${data[6] || "/previews/default.jpg"})` }}
    ></div>

    {/* Content Section */}
    <div className="p-4">
      <h3 className="text-cyan-300 font-bold text-sm truncate">{data[0]}</h3>
      {data[1] && (
        <p className="text-slate-400 text-xs mt-1 truncate">{data[1]}</p>
      )}
      {data[2] && (
        <p className="text-cyan-400 text-xs mt-2">
          <strong>Date:</strong> {data[2]}
        </p>
      )}
    </div>
  </motion.div>
);

export default Home;
