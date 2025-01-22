"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import FloatingCard from "./NetworkFloatingCard";

interface TabsProps {
  startups: string[][];
  vcs: string[][];
  accelerators: string[][];
}

const Tabs: React.FC<TabsProps> = ({ startups, vcs, accelerators }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Startups", data: startups },
    { label: "Venture Capitalists", data: vcs },
    { label: "Accelerators", data: accelerators },
  ];

  return (
    <div className="relative">
      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {tabs.map((tab, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm sm:text-lg font-semibold rounded-lg transition-all duration-300 ${
              activeTab === index
                ? "bg-gradient-to-r from-cyan-500 to-cyan-700 text-black shadow-md"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-gray-900 via-black to-gray-950 shadow-xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {tabs[activeTab].data.slice(1).map((item, index) => (
            <FloatingCard
              key={index}
              title={item[0]}
              description={item[1]}
              link={item[3]}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Tabs;
