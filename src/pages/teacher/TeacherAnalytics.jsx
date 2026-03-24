import { classAnalytics } from '../../data/mockData';
import CGPALineChart from '../../components/CGPALineChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './TeacherPages.css';

const RISK_COLORS = { Low: '#00b894', Medium: '#fdcb6e', High: '#e17055', Critical: '#d63031' };

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

export default function TeacherAnalytics() {
    const data = classAnalytics;
    const riskBarData = Object.entries(data.riskDistribution).map(([name, value]) => ({ name, value }));

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>📈 Analytics</h1>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{data.className}</span>
            </div>

            <div className="analytics-grid" style={{ marginBottom: 'var(--space-lg)' }}>
                {/* Risk Distribution Bar Chart */}
                <div className="chart-card">
                    <div className="chart-card-header">
                        <span className="chart-card-title">Risk Distribution</span>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={riskBarData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" tick={{ fill: '#8b8fa3', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false} />
                            <YAxis tick={{ fill: '#8b8fa3', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" name="Students" radius={[6, 6, 0, 0]}>
                                {riskBarData.map((entry) => (
                                    <Cell key={entry.name} fill={RISK_COLORS[entry.name]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pass Percentage Trend */}
                <div className="chart-card">
                    <div className="chart-card-header">
                        <span className="chart-card-title">Pass Percentage Trend</span>
                    </div>
                    <CGPALineChart
                        data={data.semesterPassPercent.map(d => ({ ...d, passRate: d.rate }))}
                        dataKeys={[{ key: 'passRate', name: 'Pass %', color: '#00cec9' }]}
                        xKey="sem"
                    />
                </div>
            </div>

            {/* Topic Trend Charts */}
            <div className="chart-card">
                <div className="chart-card-header">
                    <span className="chart-card-title">Topic-wise Performance by Subject</span>
                </div>
                <div className="topic-trend-grid">
                    {data.subjectPerformance.map((sub, i) => (
                        <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', border: '1px solid var(--border-color)' }}>
                            <h4 style={{ marginBottom: 12, color: 'var(--text-primary)' }}>{sub.subject}</h4>
                            <ResponsiveContainer width="100%" height={160}>
                                <BarChart data={sub.topicTrends} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="topic" tick={{ fill: '#8b8fa3', fontSize: 10 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: '#8b8fa3', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="avg" name="Avg Score" fill="#6c5ce7" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
