"use client";
import React, { useEffect, useState } from "react";

export default function Ecosystem() {
  const [startups, setStartups] = useState<string[][]>([]);
  const [vcs, setVcs] = useState<string[][]>([]);
  const [accelerators, setAccelerators] = useState<string[][]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Update spreadsheet IDs for each section
        const SHEET_IDS = {
          startups: "spreadsheet_id_1",
          vcs: "spreadsheet_id_2",
          accelerators: "spreadsheet_id_3",
        };

        // Update your fetch calls
        const [startupsRes, vcsRes, acceleratorsRes] = await Promise.all([
          fetch(`/api/sheets/startups?id=${SHEET_IDS.startups}`),
          fetch(`/api/sheets/vcs?id=${SHEET_IDS.vcs}`),
          fetch(`/api/sheets/accelerators?id=${SHEET_IDS.accelerators}`),
        ]);

        const startupsData = await startupsRes.json();
        const vcsData = await vcsRes.json();
        const acceleratorsData = await acceleratorsRes.json();

        setStartups(startupsData.data || []);
        setVcs(vcsData.data || []);
        setAccelerators(acceleratorsData.data || []);
      } catch (error) {
        console.error("Error fetching ecosystem data:", error);
      }
    }

    fetchData();
  }, []);

  const Section = ({ title, data }: { title: string; data: string[][] }) => (
    <div className="mb-16">
      <h2 className="text-3xl font-bold mb-6 text-cyan-300">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.slice(1).map((item, index) => (
          <div
            key={index}
            className="p-6 border-2 border-cyan-500 rounded-lg bg-slate-800 shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            <h3 className="text-xl font-bold text-cyan-200 mb-2">{item[0]}</h3>
            <p className="text-slate-300 text-sm mb-4">{item[1]}</p>
            <div className="flex justify-between items-center">
              <span className="text-cyan-400 text-sm">{item[2]}</span>
              {item[3] && (
                <a
                  href={item[3]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  Learn More →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-8 bg-slate-900">
      <h1 className="text-4xl font-bold mb-12 text-cyan-400 text-center">
        NYC Tech Ecosystem
      </h1>
      <div className="max-w-7xl mx-auto">
        <Section title="Startups" data={startups} />
        <Section title="Venture Capital" data={vcs} />
        <Section title="Accelerators & Incubators" data={accelerators} />
      </div>
    </div>
  );
}
