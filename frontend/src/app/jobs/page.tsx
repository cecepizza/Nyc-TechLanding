"use client";
import { config } from "@/config";
import React, { useEffect, useState } from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/ThreeDCard";
import { Boxes } from "@/components/ui/background-boxes";
import { LampContainer } from "@/components/ui/lamp";
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
            <div className="jobs-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl gap-4 w-full">
              {filteredJobs.map((job, index) => (
                <CardContainer
                  key={index}
                  containerClassName="p-0 flex justify-center bg-slate-800 w-full"
                >
                  <a
                    href={job[3]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full"
                  >
                    <CardBody>
                      <CardItem className="w-full h-full border border-cyan-500 rounded-lg bg-slate-800 shadow-md hover:shadow-cyan-500/50 transition-all">
                        <div className="flex flex-col justify-between h-full p-4 bg-slate-800 rounded-lg shadow-md">
                          <div className="flex items-center mb-4">
                            {job[7] ? (
                              <img
                                src={job[7]}
                                alt="Job Icon"
                                className="w-10 h-10"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                                <ExternalLink className="w-6 h-6 text-cyan-500" />
                              </div>
                            )}
                          </div>
                          <h2 className="text-xl font-bold text-cyan-300 mb-2">
                            {job[0]}
                          </h2>
                          <div className="text-sm text-cyan-200 mb-4 flex justify-center">
                            <span className="bg-slate-700 rounded px-2 py-1">
                              {job[1]}
                            </span>
                          </div>
                          <div className="text-xs text-cyan-200 mb-0">
                            <span>Posted: {job[2]}</span>
                          </div>
                          <div className="text-sm text-cyan-400 font-medium mt-2">
                            {job[4]}
                          </div>
                        </div>
                      </CardItem>
                    </CardBody>
                  </a>
                </CardContainer>
              ))}
            </div>
          </ShineBorder>
        </div>
      </div>
    </LampContainer>
  );
}
