import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

export default function StatCard({ icon, label, value, trend, trendValue, color = 'var(--accent-primary)' }) {
    return (
        <div className="stat-card">
            <div className="stat-card-icon" style={{ background: `${color}15`, color }}>
                {icon}
            </div>
            <div className="stat-card-content">
                <div className="stat-card-label">{label}</div>
                <div className="stat-card-value">{value}</div>
                {trend && (
                    <div className={`stat-card-trend ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
                        {trend === 'up' ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
                        {trendValue}
                    </div>
                )}
            </div>
        </div>
    );
}
