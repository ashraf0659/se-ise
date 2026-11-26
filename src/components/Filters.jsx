// Controlled form controls. All state lives in App; this component only
// shows the current values and reports changes through the setter props.
function Filters({
  classes,
  search,
  setSearch,
  selectedClass,
  setSelectedClass,
  status,
  setStatus,
  onlyAtRisk,
  setOnlyAtRisk,
  sortBy,
  setSortBy,
  onReset,
}) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search by name or ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
        <option value="All">All Classes</option>
        {classes.map((className) => (
          <option key={className} value={className}>
            {className}
          </option>
        ))}
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="All">All Status</option>
        <option value="Active">Active</option>
        <option value="On Leave">On Leave</option>
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="id">Sort: Student ID</option>
        <option value="name">Sort: Name (A-Z)</option>
        <option value="attendance">Sort: Attendance (high to low)</option>
        <option value="marks">Sort: Marks (high to low)</option>
      </select>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={onlyAtRisk}
          onChange={(e) => setOnlyAtRisk(e.target.checked)}
        />
        At-risk only
      </label>

      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default Filters;
