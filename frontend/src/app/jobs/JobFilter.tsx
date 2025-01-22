// JobFilter.tsx
"use client";

import React from "react";

interface FilterBarProps {
  searchQuery: string;
  selectedCategory: string;
  selectedLocation: string;
  selectedSeniority: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSeniorityChange: (value: string) => void;
  categories: string[];
  locations: string[];
  seniorityLevels: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  selectedCategory,
  selectedLocation,
  selectedSeniority,
  onSearchChange,
  onCategoryChange,
  onLocationChange,
  onSeniorityChange,
  categories,
  locations,
  seniorityLevels,
}) => {
  const containerStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #141c2b, #1a2333)",
    color: "#d1d5db",
    borderRadius: "8px",
    padding: "1rem 1.5rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.6)",
    transition: "background 0.3s ease",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const inputStyle: React.CSSProperties = {
    color: "#cbd5e1",
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "8px",
    padding: "0.65rem 1rem",
    fontSize: "0.95rem",
    transition: "all 0.3s ease-in-out",
    width: "100%",
    maxWidth: "400px",
    textAlign: "left",
    flexGrow: 2,
  };

  const selectStyle: React.CSSProperties = {
    color: "#cbd5e1",
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "8px",
    padding: "0.65rem 1rem",
    fontSize: "0.95rem",
    transition: "all 0.3s ease-in-out",
    width: "100%",
    maxWidth: "200px",
    textAlign: "left",
    flexGrow: 1,
  };

  const focusHoverStyle: React.CSSProperties = {
    backgroundColor: "#1e293b",
    borderColor: "#60a5fa",
    boxShadow: "0 0 10px rgba(96, 165, 250, 0.5)",
  };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        placeholder="Search for a job..."
        value={searchQuery}
        style={inputStyle}
        onFocus={(e) =>
          (e.currentTarget.style.boxShadow =
            "0 0 10px #60a5fa, 0 0 20px #3b82f6")
        }
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, focusHoverStyle)
        }
        onMouseLeave={(e) =>
          Object.assign(e.currentTarget.style, { boxShadow: "none" })
        }
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        value={selectedCategory}
        style={selectStyle}
        onFocus={(e) =>
          (e.currentTarget.style.boxShadow =
            "0 0 10px #60a5fa, 0 0 20px #3b82f6")
        }
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={selectedLocation}
        style={selectStyle}
        onFocus={(e) =>
          (e.currentTarget.style.boxShadow =
            "0 0 10px #60a5fa, 0 0 20px #3b82f6")
        }
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        onChange={(e) => onLocationChange(e.target.value)}
      >
        <option value="">All Locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      <select
        value={selectedSeniority}
        style={selectStyle}
        onFocus={(e) =>
          (e.currentTarget.style.boxShadow =
            "0 0 10px #60a5fa, 0 0 20px #3b82f6")
        }
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        onChange={(e) => onSeniorityChange(e.target.value)}
      >
        <option value="">All Seniority Levels</option>
        {seniorityLevels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
