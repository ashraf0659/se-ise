// Reusable wrapper: gives every chart the same box, title and "no data" message
function ChartCard({ title, isEmpty, children }) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      {isEmpty ? <p className="no-data">No data to display.</p> : children}
    </div>
  );
}

export default ChartCard;
