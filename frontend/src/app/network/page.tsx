"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Boxes } from "@/components/ui/background-boxes";
import { config } from "@/config";
import Tabs from "@/app/network/NetworkTabs";
import { BorderBeam } from "@/components/ui/border-beam";

export default function Ecosystem() {
  const [startups, setStartups] = useState<string[][]>([]);
  const [vcs, setVcs] = useState<string[][]>([]);
  const [accelerators, setAccelerators] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const SHEET_IDS = {
          startups: "spreadsheet_id_1",
          vcs: "spreadsheet_id_2",
          accelerators: "spreadsheet_id_3",
        };

        const endpoints = [
          `/api/sheets/startups?id=${SHEET_IDS.startups}`,
          `/api/sheets/vcs?id=${SHEET_IDS.vcs}`,
          `/api/sheets/accelerators?id=${SHEET_IDS.accelerators}`,
        ];

        const responses = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(config.backendUrl + endpoint).then((res) => res.json())
          )
        );

        setStartups(responses[0].data || []);
        setVcs(responses[1].data || []);
        setAccelerators(responses[2].data || []);
      } catch (error) {
        console.error("Error fetching ecosystem data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white overflow-hidden">
      {/* Background Boxes */}
      <Boxes className="absolute inset-0 z-0 bg-opacity-50 pointer-events-none" />

      {/* Border Beam */}
      <BorderBeam className="absolute top-0 left-0 right-0" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            NYC Tech Network
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Explore the best startups, VCs, and accelerators in NYC.
          </p>
        </motion.div>

        {/* Tabs Component */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-xl shadow-xl p-4 md:p-8"
        >
          <Tabs startups={startups} vcs={vcs} accelerators={accelerators} />
        </motion.div>
      </div>
    </div>
  );
}
