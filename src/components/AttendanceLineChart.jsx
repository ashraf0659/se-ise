import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from './ChartCard.jsx';
import { getTrendData } from '../utils/studentUtils.js';

function AttendanceLineChart({ students }) {
  const data = getTrendData(students);

  return (
    <ChartCard title="Attendance vs Average Marks" isEmpty={data.length === 0}>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
          />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line type="monotone" dataKey="attendance" name="Attendance %" stroke="#4f7cff" />
          <Line type="monotone" dataKey="marks" name="Average Marks" stroke="#e53935" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default AttendanceLineChart;
