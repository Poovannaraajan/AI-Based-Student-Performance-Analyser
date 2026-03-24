import './AttendanceGauge.css';

export default function AttendanceGauge({ value, size = 160, label = 'Attendance' }) {
    const radius = (size - 20) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / 100) * circumference;
    const isWarning = value < 75;
    const color = isWarning ? 'var(--risk-high)' : 'var(--accent-secondary)';
    const bgColor = isWarning ? 'var(--risk-high-bg)' : 'rgba(0, 206, 201, 0.1)';

    return (
        <div className="gauge-container" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="gauge-svg">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="8"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    className="gauge-progress"
                    style={{ filter: `drop-shadow(0 0 6px ${isWarning ? 'rgba(225,112,85,0.4)' : 'rgba(0,206,201,0.4)'})` }}
                />
            </svg>
            <div className="gauge-center">
                <span className="gauge-value" style={{ color }}>{value}%</span>
                <span className="gauge-label">{label}</span>
                {isWarning && <span className="gauge-warning">⚠ Below 75%</span>}
            </div>
        </div>
    );
}
