"use client";
import React, { useEffect, useState } from "react";

export default function Jobs() {
  const [jobs, setJobs] = useState<string[][]>([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/sheets/jobs");
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
    <div className="min-h-screen p-8 bg-slate-900">
      <h1 className="text-4xl font-bold mb-8 text-cyan-400 text-center">
        Job Market
      </h1>
      <div className="max-w-4xl mx-auto">
        <ul className="space-y-6">
          {jobs.slice(1).map((job, index) => (
            <li
              key={index}
              className="p-6 border-2 border-cyan-500 rounded-lg bg-slate-800 shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
