import { useState, useEffect } from 'react';
import SummaryCard from './components/SummaryCard.jsx';
import Filters from './components/Filters.jsx';
import StudentTable from './components/StudentTable.jsx';
import StudentDetails from './components/StudentDetails.jsx';
import SubjectBarChart from './components/SubjectBarChart.jsx';
import PerformancePieChart from './components/PerformancePieChart.jsx';
import AttendanceLineChart from './components/AttendanceLineChart.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import { getAverageMarks, isAtRisk, getDashboardStats } from './utils/studentUtils.js';

function App() {
  // ----- Data state -----
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ----- UI state (one useState per control) -----
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [status, setStatus] = useState('All');
  const [onlyAtRisk, setOnlyAtRisk] = useState(false);
  const [sortBy, setSortBy] = useState('id');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Load the JSON once, after the first render
  useEffect(() => {
    fetch('/students.json')
      .then((response) => {
        if (!response.ok) throw new Error('Request failed');
        return response.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load student data.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="message">Loading data...</p>;
  }

  if (error) {
    return <p className="message">{error}</p>;
  }

  // ----- Derived data (recalculated on every render, never stored in state) -----
  const stats = getDashboardStats(students);

  const classes = [...new Set(students.map((student) => student.class))];

  const query = search.trim().toLowerCase();

  // A pipeline: each filter() narrows the list, sort() orders what is left.
  // filter() returns a NEW array, so sort() never mutates the original state.
  const filteredStudents = students
    .filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.id.toLowerCase().includes(query)
    )
    .filter((student) => selectedClass === 'All' || student.class === selectedClass)
    .filter((student) => status === 'All' || student.status === status)
    .filter((student) => !onlyAtRisk || isAtRisk(student))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'attendance') return b.attendance - a.attendance;
      if (sortBy === 'marks') return getAverageMarks(b) - getAverageMarks(a);
      return a.id.localeCompare(b.id);
    });

  function resetFilters() {
    setSearch('');
    setSelectedClass('All');
    setStatus('All');
    setOnlyAtRisk(false);
    setSortBy('id');
  }

  return (
    <div className="container">
      <h1>Smart Campus Analytics Dashboard</h1>

      {/* 1. Summary cards: always based on ALL students */}
      <div className="cards">
        <SummaryCard title="Total Students" value={stats.total} />
        <SummaryCard title="Average Attendance" value={`${stats.averageAttendance.toFixed(1)}%`} />
        <SummaryCard title="Average Marks" value={stats.averageMarks.toFixed(1)} />
        <SummaryCard title="At-Risk Students" value={stats.atRiskCount} danger />
      </div>

      {/* 2. Charts and leaderboard: react to the current filters */}
      <h2>Analytics</h2>
      <p className="muted">Charts and leaderboard update with the filters below.</p>
      <div className="charts">
        <SubjectBarChart students={filteredStudents} />
        <PerformancePieChart students={filteredStudents} />
        <AttendanceLineChart students={filteredStudents} />
        <Leaderboard students={filteredStudents} />
      </div>

      {/* 3. Student records */}
      <h2>Student Records</h2>
      <Filters
        classes={classes}
        search={search}
        setSearch={setSearch}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        status={status}
        setStatus={setStatus}
        onlyAtRisk={onlyAtRisk}
        setOnlyAtRisk={setOnlyAtRisk}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={resetFilters}
      />

      <p className="muted">
        Showing {filteredStudents.length} of {students.length} students. Click a row for details.
      </p>

      <StudentTable students={filteredStudents} onSelect={setSelectedStudent} />

      {/* 4. Details popup: only exists while a student is selected */}
      {selectedStudent && (
        <StudentDetails
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

export default App;
