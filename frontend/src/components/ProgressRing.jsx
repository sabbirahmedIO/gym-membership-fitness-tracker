// Signature visual element: a circular gauge used across the dashboard,
// BMI result and workout streak to give the app one consistent "readout" motif.
const ProgressRing = ({ percent = 0, size = 140, stroke = 12, label, value, color = 'var(--accent)' }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(percent, 0), 100);
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="progress-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--ring-track)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="progress-ring__arc"
        />
      </svg>
      <div className="progress-ring__center">
        <span className="progress-ring__value">{value}</span>
        {label && <span className="progress-ring__label">{label}</span>}
      </div>
    </div>
  );
};

export default ProgressRing;
