import {
  getAverageMarks,
  getAssignmentPercent,
  getRiskReasons,
} from '../utils/studentUtils.js';

function StudentDetails({ student, onClose }) {
  const average = getAverageMarks(student);
  const reasons = getRiskReasons(student);

  return (
    // Clicking the dark background closes the popup...
    <div className="overlay" onClick={onClose}>
      {/* ...but clicking inside the white box must not bubble up and close it */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>{student.name}</h2>
        <p className="muted">
          {student.id} · {student.class} · {student.status}
        </p>

        <div className="detail-grid">
          <div>
            <span className="muted">Attendance</span>
            <strong>{student.attendance}%</strong>
          </div>
          <div>
            <span className="muted">Average Marks</span>
            <strong>{average.toFixed(1)}</strong>
          </div>
          <div>
            <span className="muted">Assignments</span>
            <strong>
              {student.assignments.completed}/{student.assignments.total} (
              {getAssignmentPercent(student).toFixed(0)}%)
            </strong>
          </div>
        </div>

        <h3>Subject-wise Marks</h3>
        {Object.entries(student.marks).map(([subject, mark]) => (
          <div key={subject} className="mark-row">
            <span>{subject}</span>
            <div className="bar">
              <div
                className={mark < 40 ? 'bar-fill bar-low' : 'bar-fill'}
                style={{ width: `${mark}%` }}
              />
            </div>
            <strong>{mark}</strong>
          </div>
        ))}

        {reasons.length > 0 ? (
          <div className="alert">
            <strong>Needs academic attention</strong>
            <ul>
              {reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="alert alert-ok">On track. No risk flags.</div>
        )}
      </div>
    </div>
  );
}

export default StudentDetails;
