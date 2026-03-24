import { useAuth } from '../../context/AuthContext';
import { studentRecords } from '../../data/mockData';
import StatCard from '../../components/StatCard';
import RiskBadge from '../../components/RiskBadge';
import CGPALineChart from '../../components/CGPALineChart';
import AttendanceGauge from '../../components/AttendanceGauge';
import EarlyWarningBanner from '../../components/EarlyWarningBanner';
import { FiBookOpen, FiTrendingUp, FiAward, FiCalendar } from 'react-icons/fi';
import './StudentPages.css';

export default function StudentDashboard() {
    const { user } = useAuth();
    const data = studentRecords[user?.id] || studentRecords.STU001;

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>📊 Dashboard</h1>
                <RiskBadge level={data.riskLevel} />
            </div>

            <EarlyWarningBanner cgpa={data.predictedCGPA} />

            {/* Alerts */}
            {data.alerts?.map((alert, i) => (
                <div key={i} className={`alert-banner alert-banner-${alert.type === 'danger' ? 'danger' : alert.type === 'warning' ? 'warning' : alert.type === 'success' ? 'success' : 'info'}`}>
                    {alert.message}
                    <span style={{ marginLeft: 'auto', fontSize: '0.8rem', opacity: 0.7 }}>{alert.date}</span>
                </div>
            ))}

            {/* Stat Cards */}
            <div className="page-grid page-grid-4" style={{ marginBottom: 'var(--space-lg)' }}>
                <StatCard icon={<FiAward size={22} />} label="Current CGPA" value={data.currentCGPA.toFixed(2)} trend={data.currentCGPA >= 7 ? 'up' : 'down'} trendValue={`${data.currentCGPA >= 7 ? '+' : ''}${(data.currentCGPA - data.semesters[data.semesters.length - 2]?.cgpa).toFixed(2)}`} color="#6c5ce7" />
                <StatCard icon={<FiCalendar size={22} />} label="Attendance" value={`${data.attendance}%`} trend={data.attendance >= 75 ? 'up' : 'down'} trendValue={data.attendance >= 75 ? 'On Track' : 'Below 75%'} color={data.attendance >= 75 ? '#00cec9' : '#e17055'} />
                <StatCard icon={<FiTrendingUp size={22} />} label="Predicted CGPA" value={data.predictedCGPA.toFixed(2)} color={data.predictedCGPA >= 6 ? '#00b894' : '#d63031'} />
                <StatCard icon={<FiBookOpen size={22} />} label="Semester" value={data.currentSemester} trend="up" trendValue={data.course} color="#fdcb6e" />
            </div>

            {/* Charts Row */}
            <div className="page-grid page-grid-2">
                <div className="chart-card">
                    <div className="chart-card-header">
                        <span className="chart-card-title">CGPA Trend</span>
                    </div>
                    <CGPALineChart
                        data={data.semesters}
                        dataKeys={[
                            { key: 'cgpa', name: 'CGPA', color: '#6c5ce7' },
                            { key: 'sgpa', name: 'SGPA', color: '#00cec9' },
                        ]}
                    />
                </div>

                <div className="chart-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="chart-card-header" style={{ width: '100%' }}>
                        <span className="chart-card-title">Attendance</span>
                    </div>
                    <AttendanceGauge value={data.attendance} size={180} />
                </div>
            </div>

            {/* Subject Performance */}
            <div className="chart-card" style={{ marginTop: 'var(--space-lg)' }}>
                <div className="chart-card-header">
                    <span className="chart-card-title">Subject Performance</span>
                </div>
                <div className="subject-grid">
                    {data.subjects.map((sub, i) => (
                        <div key={i} className={`subject-card subject-${sub.status.toLowerCase()}`}>
                            <div className="subject-name">{sub.name}</div>
                            <div className="subject-score">{sub.score}</div>
                            <div className="subject-grade">Grade: {sub.grade}</div>
                            <div className={`subject-status status-${sub.status.toLowerCase()}`}>{sub.status}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
