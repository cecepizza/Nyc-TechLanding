"use client";
import { config } from "@/config";
import React, { useEffect, useState } from "react";
import { Boxes } from "@/components/ui/background-boxes";
// import { LampContainer } from "@/components/lamp";
import { motion } from "framer-motion";

export default function Ecosystem() {
  const [startups, setStartups] = useState<string[][]>([]);
  const [vcs, setVcs] = useState<string[][]>([]);
  const [accelerators, setAccelerators] = useState<string[][]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const SHEET_IDS = {
          startups: "spreadsheet_id_1",
          vcs: "spreadsheet_id_2",
          accelerators: "spreadsheet_id_3",
        };

        const [startupsRes, vcsRes, acceleratorsRes] = await Promise.all([
          fetch(
            config.backendUrl + `/api/sheets/startups?id=${SHEET_IDS.startups}`
          ),
          fetch(config.backendUrl + `/api/sheets/vcs?id=${SHEET_IDS.vcs}`),
          fetch(
            config.backendUrl +
              `/api/sheets/accelerators?id=${SHEET_IDS.accelerators}`
          ),
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-16"
    >
      <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.slice(1).map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(0,255,255,0.3)",
            }}
            className="p-6 border-2 border-cyan-500 rounded-lg bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 shadow-lg transition-all"
          >
            <h3 className="text-2xl font-bold text-cyan-300 mb-2">{item[0]}</h3>
            <p className="text-slate-300 text-sm mb-4 line-clamp-3">
              {item[1]}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-cyan-400 text-sm">{item[2]}</span>
              {item[3] && (
                <a
                  href={item[3]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-500 hover:text-cyan-300 text-sm transition"
                >
                  Learn More →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    // <LampContainer>
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-800 text-white overflow-hidden">
      <Boxes className="absolute inset-0 z-0 bg-opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-5xl font-bold text-center bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-12"
        >
          NYC Tech Ecosystem
        </motion.h1>
        <Section title="Startups" data={startups} />
        <Section title="Venture Capitalists" data={vcs} />
        <Section title="Accelerators & Incubators" data={accelerators} />
      </div>
    </div>
    // </LampContainer>
  );
}
