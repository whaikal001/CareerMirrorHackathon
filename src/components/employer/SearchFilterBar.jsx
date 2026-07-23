import { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";

export default function SearchFilterBar({ allCandidates, onFilterChange, blindMode }) {
  const [searchText, setSearchText] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [scoreThreshold, setScoreThreshold] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("all");

  // Get unique skills from all candidates
  const allSkills = useMemo(() => {
    const skills = new Set();
    allCandidates.forEach((c) => {
      c.skills.forEach((s) => skills.add(s));
    });
    return Array.from(skills).sort();
  }, [allCandidates]);

  // Get unique locations
  const allLocations = useMemo(() => {
    const locations = new Set();
    allCandidates.forEach((c) => {
      locations.add(c.location);
    });
    return Array.from(locations).sort();
  }, [allCandidates]);

  const handleFilterChange = () => {
    onFilterChange({
      searchText,
      selectedSkills,
      scoreThreshold,
      selectedLocation: blindMode ? "all" : selectedLocation,
    });
  };

  const handleSkillToggle = (skill) => {
    const updated = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(updated);
  };

  const handleClearFilters = () => {
    setSearchText("");
    setSelectedSkills([]);
    setScoreThreshold(0);
    setSelectedLocation("all");
    onFilterChange({ searchText: "", selectedSkills: [], scoreThreshold: 0, selectedLocation: "all" });
  };

  const hasActiveFilters = searchText || selectedSkills.length > 0 || scoreThreshold > 0 || selectedLocation !== "all";

  return (
    <div
      style={{
        padding: 16,
        backgroundColor: "var(--bg2)",
        borderRadius: 10,
        marginBottom: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Search Bar */}
      <div style={{ display: "flex", gap: 8 }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 12px",
            backgroundColor: "var(--bg)",
            borderRadius: 8,
            border: "1px solid var(--line2)",
          }}
        >
          <Search size={16} color="var(--faint)" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              handleFilterChange();
            }}
            placeholder={blindMode ? "Search by Candidate ID (e.g., cand-1)" : "Search by name, skill, university..."}
            style={{
              flex: 1,
              border: "none",
              backgroundColor: "transparent",
              color: "var(--txt)",
              fontSize: 13.5,
              outline: "none",
            }}
          />
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="ct-btn ghost"
            style={{ padding: "8px 12px", fontSize: 12.5, display: "flex", alignItems: "center", gap: 6 }}
          >
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {/* Filters Row */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        {/* Score Threshold Slider */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ fontSize: 12, color: "var(--faint)", fontWeight: 600, minWidth: 80 }}>Min Score</label>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="range"
              min="0"
              max="100"
              value={scoreThreshold}
              onChange={(e) => {
                setScoreThreshold(Number(e.target.value));
                handleFilterChange();
              }}
              style={{ width: 80, cursor: "pointer" }}
            />
            <span style={{ fontSize: 12, color: "var(--txt)", fontWeight: 600, minWidth: 30 }}>{scoreThreshold}%</span>
          </div>
        </div>

        {/* Location Filter (hidden in blind mode) */}
        {!blindMode && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <label style={{ fontSize: 12, color: "var(--faint)", fontWeight: 600 }}>Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value);
                handleFilterChange();
              }}
              style={{
                padding: "6px 8px",
                fontSize: 12.5,
                border: "1px solid var(--line2)",
                borderRadius: 6,
                backgroundColor: "var(--bg)",
                color: "var(--txt)",
                cursor: "pointer",
              }}
            >
              <option value="all">All locations</option>
              {allLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Skill Chips */}
      {allSkills.length > 0 && (
        <div>
          <div style={{ fontSize: 12, color: "var(--faint)", fontWeight: 600, marginBottom: 8 }}>Filter by Skills</div>
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              maxHeight: 60,
              overflow: "auto",
              paddingRight: 4,
            }}
          >
            {allSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`ct-chip ${selectedSkills.includes(skill) ? "sel" : ""}`}
                style={{
                  cursor: "pointer",
                  fontSize: 12,
                  padding: "6px 10px",
                  backgroundColor: selectedSkills.includes(skill) ? "var(--mint)" : "var(--bg)",
                  color: selectedSkills.includes(skill) ? "var(--on-mint)" : "var(--muted)",
                  border: `1px solid ${selectedSkills.includes(skill) ? "var(--mint)" : "var(--line2)"}`,
                  transition: "all 0.2s",
                }}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {(selectedSkills.length > 0 || scoreThreshold > 0) && (
        <div style={{ fontSize: 12, color: "var(--faint)", paddingTop: 8, borderTop: "1px solid var(--line2)" }}>
          {selectedSkills.length > 0 && <span>Skills: {selectedSkills.join(", ")} · </span>}
          {scoreThreshold > 0 && <span>Fit Score ≥ {scoreThreshold}%</span>}
        </div>
      )}
    </div>
  );
}
