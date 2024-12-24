"use client";
import { config } from "@/config";
import React, { useEffect, useState } from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Boxes } from "@/components/ui/background-boxes";

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
    <div className="relative min-h-screen p-8 bg-slate-900 overflow-hidden">
      <Boxes className="z-0" />
      <h1 className="text-4xl font-bold mb-12 text-cyan-400 text-center z-10 relative">
        Job Market
      </h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  z-10  ">
        {jobs.slice(1).map((job, index) => (
          <CardContainer key={index} containerClassName="p-4">
            <CardBody>
              <CardItem className="w-80 h-60 p-2 border-2 border-cyan-500 rounded-lg bg-slate-800 shadow-lg hover:shadow-cyan-500/50 transition-all">
                <div className="grid gap-2">
                  <h2 className="text-2xl font-bold text-cyan-300">{job[0]}</h2>
                  <div className="flex gap-2 text-cyan-200 text-sm">
                    <span className="px-2 py-1 bg-cyan-900 rounded">
                      {job[1]}
                    </span>
                    <span className="px-2 py-1 bg-cyan-900 rounded">
                      {job[2]}
                    </span>
                  </div>
                  <p className="text-slate-300 mt-2">{job[3]}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-cyan-400">{job[4]}</span>
                  </div>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
}
