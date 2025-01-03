"use client";
import { config } from "@/config";
import React, { useEffect, useState } from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/ThreeDCard";
import { Boxes } from "@/components/ui/background-boxes";
import { LampContainer } from "@/components/lamp";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import ShineBorder from "@/components/ui/shine-border";

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
        console.log("Fetched data:", data);
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
    <LampContainer>
      <div className="relative bg-slate-900 min-h-screen p-4">
        <Boxes className="absolute inset-2 z-0" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              className="text-4xl font-semibold text-center mt-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text transition-transform duration-300"
            >
              Job Market
            </motion.h1>
            <input
              type="text"
              placeholder="Search job types..."
              className="p-2 border border-cyan-500 rounded-md text-black"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ShineBorder
            borderRadius={25}
            borderWidth={412}
            color="rgba(0, 255, 255, 0.1)"
          >
            <div className="jobs-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {filteredJobs.map((job, index) => (
                <CardContainer
                  key={index}
                  containerClassName="p-0 flex justify-center bg-slate-800 w-full"
                >
                  <CardBody>
                    <CardItem className="w-full h-full p-3 border border-cyan-500 rounded-lg bg-slate-800 shadow-md hover:shadow-cyan-500/50 transition-all">
                      <div className="flex flex-col justify-between h-full p-4 bg-slate-800 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-cyan-100 rounded-full">
                            <ExternalLink className="w-6 h-6 text-cyan-500" />
                          </div>
                        </div>
                        <h2 className="text-xl font-bold text-cyan-300 mb-2">
                          {job[0]}
                        </h2>
                        <div className="text-sm text-cyan-200 mb-4">
                          <span className="bg-slate-700 px-2 py-1 rounded">
                            Job Title: {job[1]}
                          </span>
                          <div className="text-sm text-cyan-200 mb-1">
                            <span className="bg-slate-700 px-2 py-1 rounded">
                              Date Posted: {job[2]}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-cyan-400 font-medium">
                          {job[4]}
                        </div>
                        <div className="flex justify-end mt-4">
                          <a
                            href={`https://${job[3]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 
                                       bg-cyan-500 hover:bg-cyan-600 text-white rounded-md 
                                       font-medium text-sm transition-all duration-200
                                       hover:translate-y-[-1px] active:translate-y-0"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              ))}
            </div>
          </ShineBorder>
        </div>
      </div>
    </LampContainer>
  );
}
