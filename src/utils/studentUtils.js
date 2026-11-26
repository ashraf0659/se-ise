// ---------- Per-student helpers ----------

// Average of one student's subject marks
export function getAverageMarks(student) {
  const scores = Object.values(student.marks);
  const total = scores.reduce((sum, mark) => sum + mark, 0);
  return total / scores.length;
}

// A student is at risk if attendance < 75% OR average marks < 40
export function isAtRisk(student) {
  return student.attendance < 75 || getAverageMarks(student) < 40;
}

// Human-readable reasons, shown in the details popup
export function getRiskReasons(student) {
  const reasons = [];
  if (student.attendance < 75) {
    reasons.push(`Attendance is ${student.attendance}% (below 75%)`);
  }
  if (getAverageMarks(student) < 40) {
    reasons.push(`Average marks are ${getAverageMarks(student).toFixed(1)} (below 40)`);
  }
  return reasons;
}

export function getAssignmentPercent(student) {
  return (student.assignments.completed / student.assignments.total) * 100;
}

// Grade band used by the pie chart
export function getPerformanceBand(student) {
  const average = getAverageMarks(student);
  if (average >= 75) return 'Excellent';
  if (average >= 60) return 'Good';
  if (average >= 40) return 'Average';
  return 'Poor';
}

// ---------- Helpers that work on a whole list of students ----------

// Dashboard cards
export function getDashboardStats(students) {
  const total = students.length;
  if (total === 0) {
    return { total: 0, averageAttendance: 0, averageMarks: 0, atRiskCount: 0 };
  }

  const averageAttendance =
    students.reduce((sum, student) => sum + student.attendance, 0) / total;

  const averageMarks =
    students.reduce((sum, student) => sum + getAverageMarks(student), 0) / total;

  const atRiskCount = students.filter(isAtRisk).length;

  return { total, averageAttendance, averageMarks, atRiskCount };
}

// Bar chart data: [{ subject: 'Java', average: 66.4 }, ...]
export function getSubjectAverages(students) {
  if (students.length === 0) return [];

  const subjects = Object.keys(students[0].marks);

  return subjects.map((subject) => {
    const total = students.reduce((sum, student) => sum + student.marks[subject], 0);
    return { subject, average: Number((total / students.length).toFixed(1)) };
  });
}

// Pie chart data: [{ name: 'Good', value: 8 }, ...] (empty bands removed)
export function getBandCounts(students) {
  const bands = ['Excellent', 'Good', 'Average', 'Poor'];

  return bands
    .map((band) => ({
      name: band,
      value: students.filter((student) => getPerformanceBand(student) === band).length,
    }))
    .filter((band) => band.value > 0);
}

// Line chart data: one point per student
export function getTrendData(students) {
  return students.map((student) => ({
    name: student.name.split(' ')[0],
    attendance: student.attendance,
    marks: Number(getAverageMarks(student).toFixed(1)),
  }));
}

// Leaderboard: best average marks first, attendance breaks ties
export function getLeaderboard(students, limit = 5) {
  return [...students]
    .sort((a, b) => {
      const difference = getAverageMarks(b) - getAverageMarks(a);
      return difference !== 0 ? difference : b.attendance - a.attendance;
    })
    .slice(0, limit);
}
