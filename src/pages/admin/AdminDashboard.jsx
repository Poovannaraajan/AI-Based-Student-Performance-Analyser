import { institutionStats } from '../../data/mockData';
import StatCard from '../../components/StatCard';
import CGPALineChart from '../../components/CGPALineChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiUsers, FiAward, FiCheckCircle, FiGrid } from 'react-icons/fi';
import './AdminPages.css';

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: '#1e2132', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
            <p style={{ color: '#8b8fa3', fontSize: '0.8rem', marginBottom: 4 }}>{label}</p>
            {payload.map((entry, i) => (
                <p key={i} style={{ color: entry.color || entry.fill, fontWeight: 600, fontSize: '0.9rem' }}>{entry.name}: {entry.value}</p>
            ))}
        </div>
    );
};

export default function AdminDashboard() {
    const data = institutionStats;

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>📊 Institution Dashboard</h1>
            </div>

            <div className="page-grid page-grid-4" style={{ marginBottom: 'var(--space-lg)' }}>
                <StatCard icon={<FiUsers size={22} />} label="Total Students" value={data.totalStudents.toLocaleString()} trend="up" trendValue="+150 this year" color="#6c5ce7" />
                <StatCard icon={<FiUsers size={22} />} label="Total Teachers" value={data.totalTeachers} color="#00cec9" />
                <StatCard icon={<FiAward size={22} />} label="Average CGPA" value={data.averageCGPA.toFixed(1)} trend="up" trendValue="+0.1" color="#fdcb6e" />
                <StatCard icon={<FiCheckCircle size={22} />} label="Pass Rate" value={`${data.overallPassRate}%`} trend="up" trendValue="+1% YoY" color="#00b894" />
            </div>

            <div className="page-grid page-grid-2" style={{ marginBottom: 'var(--space-lg)' }}>
                {/* Department Comparison */}
                <div className="chart-card">
                    <div className="chart-card-header">
                        <span className="chart-card-title">Department-wise CGPA</span>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data.departments} margin={{ top: 10, right: 20, left: 0, bottom: 0 }} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis type="number" tick={{ fill: '#8b8fa3', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 10]} />
                            <YAxis dataKey="name" type="category" tick={{ fill: '#8b8fa3', fontSize: 11 }} axisLine={false} tickLine={false} width={130} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="avgCGPA" name="Avg CGPA" fill="#6c5ce7" radius={[0, 6, 6, 0]} barSize={18} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Yearly Trends */}
                <div className="chart-card">
                    <div className="chart-card-header">
                        <span className="chart-card-title">Yearly Trends</span>
                    </div>
                    <CGPALineChart
                        data={data.yearlyTrends}
                        dataKeys={[
                            { key: 'avgCGPA', name: 'Avg CGPA', color: '#6c5ce7' },
                            { key: 'passRate', name: 'Pass Rate', color: '#00b894' },
                        ]}
                        xKey="year"
                    />
                </div>
            </div>

            {/* Risk Overview */}
            <div className="chart-card">
                <div className="chart-card-header">
                    <span className="chart-card-title">Institution Risk Overview</span>
                </div>
                <div className="admin-risk-overview">
                    {Object.entries(data.riskOverview).map(([level, count]) => (
                        <div key={level} className={`admin-risk-card risk-card-${level.toLowerCase()}`}>
                            <div className="admin-risk-count">{count.toLocaleString()}</div>
                            <div className="admin-risk-label">{level} Risk</div>
                            <div className="admin-risk-percent">{((count / data.totalStudents) * 100).toFixed(1)}%</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
