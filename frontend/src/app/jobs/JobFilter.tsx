"use client";

import React from "react";

interface FilterBarProps {
  searchQuery: string;
  selectedCategory: string;
  selectedLocation: string;
  selectedDate: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  selectedCategory,
  selectedLocation,
  selectedDate,
  onSearchChange,
  onCategoryChange,
  onLocationChange,
  onDateChange,
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
    maxWidth: "400px", // Longer width for the search bar
    textAlign: "left",
    flexGrow: 2, // Makes it proportionally larger
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
    maxWidth: "200px", // Shorter width for dropdowns
    textAlign: "left",
    flexGrow: 1, // Proportional width
  };

  const focusHoverStyle: React.CSSProperties = {
    backgroundColor: "#1e293b",
    borderColor: "#60a5fa",
    boxShadow: "0 0 10px rgba(96, 165, 250, 0.5)",
  };

  return (
    <div style={containerStyle}>
      {/* Search Input */}
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

      {/* Category Dropdown */}
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
        <option value="Software Development">Software Development</option>
        <option value="Data Science">Data Science</option>
        <option value="DevOps">DevOps</option>
        <option value="Quality Assurance">Quality Assurance</option>
        <option value="UI/UX Design">UI/UX Design</option>
      </select>

      {/* Location Dropdown */}
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
        <option value="Manhattan">Manhattan</option>
        <option value="Brooklyn">Brooklyn</option>
        <option value="Queens">Queens</option>
        <option value="Bronx">Bronx</option>
        <option value="Staten Island">Staten Island</option>
      </select>

      {/* Date/Level Dropdown */}
      <select
        value={selectedDate}
        style={selectStyle}
        onFocus={(e) =>
          (e.currentTarget.style.boxShadow =
            "0 0 10px #60a5fa, 0 0 20px #3b82f6")
        }
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        onChange={(e) => onDateChange(e.target.value)}
      >
        <option value="">All Seniority Levels</option>
        <option value="Intern">Intern</option>
        <option value="Junior">Junior</option>
        <option value="Mid">Mid</option>
        <option value="Senior">Senior</option>
        <option value="Lead">Lead</option>
      </select>
    </div>
  );
};

export default FilterBar;
