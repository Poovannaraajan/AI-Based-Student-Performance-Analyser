import './RiskBadge.css';

const riskConfig = {
    Low: { className: 'badge-low', label: 'Low Risk' },
    Medium: { className: 'badge-medium', label: 'Medium Risk' },
    High: { className: 'badge-high', label: 'High Risk' },
    Critical: { className: 'badge-critical', label: 'Critical' },
};

export default function RiskBadge({ level, compact = false }) {
    const config = riskConfig[level] || riskConfig.Low;
    return (
        <span className={`risk-badge ${config.className}`}>
            <span className="risk-dot" />
            {compact ? level : config.label}
        </span>
    );
}
