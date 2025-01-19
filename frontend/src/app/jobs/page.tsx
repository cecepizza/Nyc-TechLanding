"use client";

import { config } from "@/config";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GlowingStarsBackgroundCard } from "@/components/ui/GlowingStarsBackgroundCard";

export default function Jobs() {
  const [jobs, setJobs] = useState<string[][]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch(config.backendUrl + "/api/sheets/jobs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }

    fetchJobs();
  }, []);

  const filteredJobs = jobs
    .slice(1)
    .filter(
      (job) =>
        job.some((field) =>
          field.toLowerCase().includes(searchQuery.toLowerCase())
        ) &&
        (selectedCategory ? job[1] === selectedCategory : true) &&
        (selectedLocation ? job[4] === selectedLocation : true) &&
        (selectedDate ? job[2] === selectedDate : true)
    );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-950">
      {/* Background Animation */}
      <GlowingStarsBackgroundCard className="absolute inset-0 -z-10" />

      {/* Page Header */}
      <div className="relative z-10 text-center py-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text drop-shadow-lg"
        >
          Explore Opportunities
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-400 mt-4"
        >
          Find your next career move in NYC’s vibrant tech ecosystem.
        </motion.p>
      </div>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 bg-opacity-80 rounded-xl p-8 shadow-2xl mx-6 mb-10 flex flex-col md:flex-row gap-6 items-center justify-center"
      >
        <input
          type="text"
          placeholder="Search for a job..."
          className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow hover:shadow-lg"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="jobs-filter-dropdown w-full md:w-auto px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow hover:shadow-lg"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Software Development">Software Development</option>
          <option value="Data Science">Data Science</option>
          <option value="DevOps">DevOps</option>
          <option value="Quality Assurance">Quality Assurance</option>
          <option value="UI/UX Design">UI/UX Design</option>
        </select>
        <select
          className="jobs-filter-dropdown w-full md:w-auto px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow hover:shadow-lg"
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="Manhattan">Manhattan</option>
          <option value="Brooklyn">Brooklyn</option>
          <option value="Queens">Queens</option>
          <option value="Bronx">Bronx</option>
          <option value="Staten Island">Staten Island</option>
        </select>
        <select
          className="jobs-filter-dropdown w-full md:w-auto px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow hover:shadow-lg"
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">All Seniority Levels</option>
          <option value="Intern">Intern</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
          <option value="Lead">Lead</option>
        </select>
      </motion.div>

      {/* Jobs Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-6"
      >
        {filteredJobs.map((job, index) => (
          <motion.a
            key={index}
            href={job[3]}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 bg-opacity-80 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow hover:scale-[1.02] hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-700 flex flex-col justify-between"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="mb-4 flex items-center justify-center">
              {job[7] ? (
                <img
                  src={job[7]}
                  alt="Job Icon"
                  className="w-12 h-12 object-contain"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-cyan-500" />
                </div>
              )}
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-cyan-300 mb-2">{job[0]}</h2>
              <p className="text-sm text-gray-400 mb-1">{job[1]}</p>
              <p className="text-sm text-gray-500 mb-1">Posted: {job[2]}</p>
              <p className="text-sm text-gray-400">{job[4]}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
