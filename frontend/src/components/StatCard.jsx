const StatCard = ({ icon, label, value, accent }) => (
  <div className="stat-card">
    <div className="stat-card__icon" style={accent ? { color: accent } : undefined}>
      {icon}
    </div>
    <div>
      <p className="stat-card__value">{value}</p>
      <p className="stat-card__label">{label}</p>
    </div>
  </div>
);

export default StatCard;
