"use client";

import { config } from "@/config";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import "./Jobs.css";

export default function Jobs() {
  const [jobs, setJobs] = useState<string[][]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
    .filter((job) =>
      job.some((field) =>
        field.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  return (
    <div className="jobs-page bg-slate-900 min-h-screen">
      {/* Header Section */}
      <div className="jobs-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="jobs-title"
        >
          Explore Opportunities
        </motion.h1>
        <input
          type="text"
          placeholder="Search for a job..."
          className="jobs-search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Jobs Grid */}
      <div className="jobs-grid">
        {filteredJobs.map((job, index) => (
          <motion.a
            key={index}
            href={job[3]}
            target="_blank"
            rel="noopener noreferrer"
            className="job-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="job-card-icon">
              {job[7] ? (
                <img src={job[7]} alt="Job Icon" className="job-icon" />
              ) : (
                <div className="job-placeholder-icon">
                  <ExternalLink className="w-6 h-6 text-cyan-500" />
                </div>
              )}
            </div>
            <div className="job-card-content">
              <h2 className="job-title">{job[0]}</h2>
              <p className="job-company">{job[1]}</p>
              <p className="job-date">Posted: {job[2]}</p>
              <p className="job-location">{job[4]}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
