"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Boxes } from "@/components/ui/background-boxes";
import { config } from "@/config";
import Tabs from "@/components/ui/NetworkTabs";

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

        setStartups((await startupsRes.json()).data || []);
        setVcs((await vcsRes.json()).data || []);
        setAccelerators((await acceleratorsRes.json()).data || []);
      } catch (error) {
        console.error("Error fetching ecosystem data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-800 text-white overflow-hidden">
      <Boxes className="absolute inset-0 z-0 bg-opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-6xl font-extrabold text-center bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent mb-16"
        >
          NYC Tech Ecosystem
        </motion.h1>
        <Tabs startups={startups} vcs={vcs} accelerators={accelerators} />
      </div>
    </div>
  );
}
