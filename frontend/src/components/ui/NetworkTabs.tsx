"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import FloatingCard from "@/components/ui/NetworkFloatingCard";

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
    { label: "Accelerators & Incubators", data: accelerators },
  ];

  return (
    <div className="relative">
      {/* Tabs Navigation (Manila Folder Style) */}
      <div className="flex justify-center relative mb-8">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 text-lg font-medium relative z-10 ${
              activeTab === index
                ? "bg-beige-100 text-gray-800 shadow-md rounded-t-lg"
                : "bg-beige-200 text-gray-600 hover:bg-beige-300"
            } transition-all duration-300 mx-2`}
            style={{
              borderBottom: activeTab === index ? "none" : "2px solid #e0e0e0",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs Background to Simulate Manila Folder */}
      <div className="absolute inset-x-0 top-9 h-2 bg-beige-200 rounded-t-md z-0"></div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md p-6 rounded-b-lg shadow-md"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
