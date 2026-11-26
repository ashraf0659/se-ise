function SummaryCard({ title, value, danger }) {
  return (
    <div className={danger ? 'card card-danger' : 'card'}>
      <p className="card-title">{title}</p>
      <h2 className="card-value">{value}</h2>
    </div>
  );
}

export default SummaryCard;
