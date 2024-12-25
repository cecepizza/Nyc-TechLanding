"use client";
import { config } from "@/config";
import React, { useEffect, useState } from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/ThreeDCard";
import { Boxes } from "@/components/ui/background-boxes";
import { LampContainer } from "@/components/lamp";

export default function Jobs() {
  const [jobs, setJobs] = useState<string[][]>([]);

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

  return (
    <LampContainer>
      <div className="relative min-h-screen flex flex-col items-center justify-center p-16 bg-slate-900 overflow-hidden">
        <Boxes className="z-0" />
        <h1 className="text-4xl font-bold mb-12 text-cyan-400 text-center z-10 relative">
          Job Market
        </h1>
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 z-10 relative">
          {jobs.slice(1).map((job, index) => (
            <CardContainer
              key={index}
              containerClassName="p-4 flex justify-center"
            >
              <CardBody>
                <CardItem className="w-80 h-72 p-10 border-2 border-cyan-500 rounded-lg bg-slate-800 shadow-lg hover:shadow-cyan-500/50 transition-all">
                  <div className="flex flex-col justify-between h-full">
                    <h2 className="text-2xl font-bold text-cyan-300 text-center mb-2">
                      {job[0]}
                    </h2>
                    <div className="flex justify-center gap-2 text-cyan-200 text-sm mb-2">
                      <span className="px-2 py-1 bg-cyan-900 rounded">
                        {job[1]}
                      </span>
                      <span className="px-2 py-1 bg-cyan-900 rounded">
                        {job[2]}
                      </span>
                    </div>
                    <p className="text-slate-300 text-center mb-2">{job[3]}</p>
                    <div className="text-center text-cyan-400 mb-2">
                      {job[4]}
                    </div>
                    <div className="flex justify-center">
                      <a
                        href={`https://${job[3]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </LampContainer>
  );
}
