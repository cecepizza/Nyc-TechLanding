// Jobs.tsx
"use client";

import { config } from "@/config";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Boxes } from "@/components/ui/background-boxes";
import "./Jobs.css";
import FilterBar from "@/app/jobs/JobFilter";

export default function Jobs() {
  const [jobs, setJobs] = useState<string[][]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedSeniority, setSelectedSeniority] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Extract unique values from jobs data for filters
  const getUniqueValues = (columnIndex: number) => {
    if (!jobs.length) return [];
    return Array.from(new Set(jobs.slice(1).map((job) => job[columnIndex])))
      .filter(Boolean)
      .sort();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(config.backendUrl + "/api/sheets/jobs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = getUniqueValues(9);
  const locations = getUniqueValues(4);
  const seniorityLevels = getUniqueValues(10);

  const filteredJobs = jobs.slice(1).filter((job) => {
    const matchesSearch =
      !searchQuery ||
      job.some((field) =>
        field?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory = !selectedCategory || job[9] === selectedCategory;
    const matchesLocation = !selectedLocation || job[4] === selectedLocation;
    const matchesSeniority =
      !selectedSeniority || job[10] === selectedSeniority;

    return (
      matchesSearch && matchesCategory && matchesLocation && matchesSeniority
    );
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-950">
      <div className="relative z-0">
        <Boxes className="absolute inset-0 -z-10 opacity-80 pointer-events-auto" />
      </div>
      <div className="relative z-10">
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
            Find your next career move in NYC's vibrant tech ecosystem.
          </motion.p>
        </div>

        {/* Filters Section */}
        <FilterBar
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedLocation={selectedLocation}
          selectedSeniority={selectedSeniority}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onLocationChange={setSelectedLocation}
          onSeniorityChange={setSelectedSeniority}
          categories={categories}
          locations={locations}
          seniorityLevels={seniorityLevels}
        />

        {/* Jobs Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="jobs-grid"
        >
          {filteredJobs.map((job, index) => (
            <motion.a
              key={index}
              href={job[3]}
              target="_blank"
              rel="noopener noreferrer"
              className="job-card"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="job-card-icon mb-2">
                {job[7] ? (
                  <img
                    src={job[7]}
                    alt={`${job[0]} Icon`}
                    className="w-14 h-14 object-contain mx-auto"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-cyan-500" />
                  </div>
                )}
              </div>
              <div className="job-card-content">
                <h2>{job[0]}</h2>
                <p>{job[1]}</p>
                <p>Posted: {job[2]}</p>
              </div>
              <div className="job-card-footer">
                <span>{job[4]}</span>
                <a href={job[3]} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="inline-block ml-1" />
                </a>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
