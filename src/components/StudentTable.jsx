import { getAverageMarks, isAtRisk } from '../utils/studentUtils.js';

function StudentTable({ students, onSelect }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Attendance</th>
            <th>Avg Marks</th>
            <th>Assignments</th>
            <th>Status</th>
            <th>Risk</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="8" className="no-data">
                No students match your search or filters.
              </td>
            </tr>
          ) : (
            students.map((student) => {
              const atRisk = isAtRisk(student);

              return (
                <tr
                  key={student.id}
                  className={atRisk ? 'row-risk' : ''}
                  onClick={() => onSelect(student)}
                >
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>{student.attendance}%</td>
                  <td>{getAverageMarks(student).toFixed(1)}</td>
                  <td>
                    {student.assignments.completed}/{student.assignments.total}
                  </td>
                  <td>
                    <span className={student.status === 'Active' ? 'badge badge-green' : 'badge badge-grey'}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <span className={atRisk ? 'badge badge-red' : 'badge badge-green'}>
                      {atRisk ? 'At Risk' : 'On Track'}
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
