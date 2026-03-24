import { classAnalytics } from '../../data/mockData';
import StatCard from '../../components/StatCard';
import CGPALineChart from '../../components/CGPALineChart';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FiUsers, FiTrendingUp, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import './TeacherPages.css';

const RISK_COLORS = { Low: '#00b894', Medium: '#fdcb6e', High: '#e17055', Critical: '#d63031' };

export default function TeacherDashboard() {
    const data = classAnalytics;
    const pieData = Object.entries(data.riskDistribution).map(([name, value]) => ({ name, value }));

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>📊 Class Dashboard</h1>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{data.className}</span>
            </div>

            <div className="page-grid page-grid-4" style={{ marginBottom: 'var(--space-lg)' }}>
                <StatCard icon={<FiUsers size={22} />} label="Total Students" value={data.totalStudents} color="#6c5ce7" />
                <StatCard icon={<FiTrendingUp size={22} />} label="Average CGPA" value={data.averageCGPA.toFixed(1)} trend="up" trendValue="+0.2 from last sem" color="#00cec9" />
                <StatCard icon={<FiCheckCircle size={22} />} label="Pass Rate" value={`${data.passPercentage}%`} color="#00b894" />
                <StatCard icon={<FiAlertTriangle size={22} />} label="At-Risk Students" value={data.riskDistribution.High + data.riskDistribution.Critical} trend="down" trendValue="Needs attention" color="#e17055" />
            </div>

            <div className="page-grid page-grid-2">
                <div className="chart-card">
                    <div className="chart-card-header">
                        <span className="chart-card-title">Risk Distribution</span>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} innerRadius={55} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                                {pieData.map((entry) => (
                                    <Cell key={entry.name} fill={RISK_COLORS[entry.name]} stroke="transparent" />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ background: '#1e2132', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#e8eaef' }} />
                            <Legend iconType="circle" formatter={(value) => <span style={{ color: '#8b8fa3', fontSize: '0.85rem' }}>{value}</span>} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <div className="chart-card-header">
                        <span className="chart-card-title">Pass Percentage Trend</span>
                    </div>
                    <CGPALineChart
                        data={data.semesterPassPercent.map(d => ({ ...d, passRate: d.rate }))}
                        dataKeys={[{ key: 'passRate', name: 'Pass %', color: '#00b894' }]}
                        xKey="sem"
                    />
                </div>
            </div>

            {/* Subject Performance Overview */}
            <div className="chart-card" style={{ marginTop: 'var(--space-lg)' }}>
                <div className="chart-card-header">
                    <span className="chart-card-title">Subject Performance Overview</span>
                </div>
                <div className="teacher-subject-grid">
                    {data.subjectPerformance.map((sub, i) => (
                        <div key={i} className="teacher-subject-card">
                            <div className="teacher-subject-name">{sub.subject}</div>
                            <div className="teacher-subject-stats">
                                <div><span className="stat-num">{sub.avgScore}</span><span className="stat-label">Avg Score</span></div>
                                <div><span className="stat-num" style={{ color: sub.passRate >= 80 ? 'var(--success)' : 'var(--warning)' }}>{sub.passRate}%</span><span className="stat-label">Pass Rate</span></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
