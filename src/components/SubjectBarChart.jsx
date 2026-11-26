import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from './ChartCard.jsx';
import { getSubjectAverages } from '../utils/studentUtils.js';

function SubjectBarChart({ students }) {
  const data = getSubjectAverages(students);

  return (
    <ChartCard title="Average Marks by Subject" isEmpty={data.length === 0}>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="subject"
            tick={{ fontSize: 10 }}
            angle={-25}
            textAnchor="end"
            height={70}
            interval={0}
          />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="average" name="Average" fill="#4f7cff" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default SubjectBarChart;
