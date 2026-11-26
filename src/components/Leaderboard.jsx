import { getAverageMarks, getLeaderboard } from '../utils/studentUtils.js';

const MEDALS = ['🥇', '🥈', '🥉'];

// Additional feature: top performers within the current filters.
// Choose a class in the filters and this becomes that class's toppers.
function Leaderboard({ students }) {
  const topStudents = getLeaderboard(students, 5);

  return (
    <div className="chart-card">
      <h3>Performance Leaderboard</h3>

      {topStudents.length === 0 ? (
        <p className="no-data">No data to display.</p>
      ) : (
        <ol className="leaderboard">
          {topStudents.map((student, index) => (
            <li key={student.id}>
              <span className="medal">{MEDALS[index] || index + 1}</span>
              <span className="lb-name">
                {student.name}
                <small>{student.class}</small>
              </span>
              <strong>{getAverageMarks(student).toFixed(1)}</strong>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default Leaderboard;
