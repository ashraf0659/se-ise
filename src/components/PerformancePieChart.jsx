import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartCard from './ChartCard.jsx';
import { getBandCounts } from '../utils/studentUtils.js';

const COLORS = {
  Excellent: '#43a047',
  Good: '#4f7cff',
  Average: '#fb8c00',
  Poor: '#e53935',
};

function PerformancePieChart({ students }) {
  const data = getBandCounts(students);

  return (
    <ChartCard title="Performance Distribution" isEmpty={data.length === 0}>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={85} label>
            {data.map((band) => (
              <Cell key={band.name} fill={COLORS[band.name]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default PerformancePieChart;
