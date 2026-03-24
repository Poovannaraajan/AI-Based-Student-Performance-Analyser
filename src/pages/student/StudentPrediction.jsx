import { useAuth } from '../../context/AuthContext';
import { studentRecords } from '../../data/mockData';
import RiskBadge from '../../components/RiskBadge';
import EarlyWarningBanner from '../../components/EarlyWarningBanner';
import CGPALineChart from '../../components/CGPALineChart';
import { FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import './StudentPages.css';

export default function StudentPrediction() {
    const { user } = useAuth();
    const data = studentRecords[user?.id] || studentRecords.STU001;
    const isAtRisk = data.predictedCGPA < 6.0;
    const attendanceRisk = data.attendance < 75;
    const cgpaDropping = data.predictedCGPA < data.currentCGPA;

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>🔮 Performance Prediction</h1>
            </div>

            <EarlyWarningBanner cgpa={data.predictedCGPA} />

            <div className="prediction-grid">
                <div className="prediction-card" style={{ '--card-accent': isAtRisk ? 'var(--risk-critical)' : 'var(--accent-primary)' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: isAtRisk ? 'linear-gradient(90deg, #d63031, #e17055)' : 'var(--accent-gradient)' }} />
                    <div className="prediction-label">Projected CGPA</div>
                    <div className="prediction-cgpa-value" style={{ color: isAtRisk ? 'var(--risk-critical)' : 'var(--accent-primary-light)' }}>
                        {data.predictedCGPA.toFixed(2)}
                    </div>
                    <div className="prediction-subtitle">
                        {cgpaDropping ? `↓ ${(data.currentCGPA - data.predictedCGPA).toFixed(2)} from current` : `↑ ${(data.predictedCGPA - data.currentCGPA).toFixed(2)} from current`}
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <RiskBadge level={data.riskLevel} />
                    </div>
                </div>

                <div className="prediction-card">
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent-gradient-2)' }} />
                    <div className="prediction-label">Current CGPA</div>
                    <div className="prediction-cgpa-value" style={{ color: 'var(--accent-secondary)' }}>
                        {data.currentCGPA.toFixed(2)}
                    </div>
                    <div className="prediction-subtitle">Semester {data.currentSemester}</div>
                </div>
            </div>

            {/* Risk Flags */}
            <div className="chart-card" style={{ marginBottom: 'var(--space-lg)' }}>
                <div className="chart-card-header">
                    <span className="chart-card-title">Risk Assessment Flags</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, background: isAtRisk ? 'var(--risk-critical-bg)' : 'var(--risk-low-bg)' }}>
                        {isAtRisk ? <FiAlertTriangle color="var(--risk-critical)" /> : <FiCheckCircle color="var(--risk-low)" />}
                        <span style={{ color: isAtRisk ? 'var(--risk-critical)' : 'var(--risk-low)', fontWeight: 500 }}>
                            CGPA {isAtRisk ? 'below' : 'above'} 6.0 threshold
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, background: attendanceRisk ? 'var(--risk-high-bg)' : 'var(--risk-low-bg)' }}>
                        {attendanceRisk ? <FiAlertTriangle color="var(--risk-high)" /> : <FiCheckCircle color="var(--risk-low)" />}
                        <span style={{ color: attendanceRisk ? 'var(--risk-high)' : 'var(--risk-low)', fontWeight: 500 }}>
                            Attendance {attendanceRisk ? `below 75% (${data.attendance}%)` : `above 75% (${data.attendance}%)`}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, background: data.weakAreas.length > 2 ? 'var(--risk-high-bg)' : data.weakAreas.length > 0 ? 'var(--risk-medium-bg)' : 'var(--risk-low-bg)' }}>
                        {data.weakAreas.length > 2 ? <FiAlertTriangle color="var(--risk-high)" /> : data.weakAreas.length > 0 ? <FiAlertTriangle color="var(--risk-medium)" /> : <FiCheckCircle color="var(--risk-low)" />}
                        <span style={{ color: data.weakAreas.length > 2 ? 'var(--risk-high)' : data.weakAreas.length > 0 ? 'var(--risk-medium)' : 'var(--risk-low)', fontWeight: 500 }}>
                            {data.weakAreas.length} weak area{data.weakAreas.length !== 1 ? 's' : ''} identified
                        </span>
                    </div>
                </div>
            </div>

            {/* CGPA Trajectory */}
            <div className="chart-card">
                <div className="chart-card-header">
                    <span className="chart-card-title">CGPA Trajectory</span>
                </div>
                <CGPALineChart
                    data={[...data.semesters, { sem: data.currentSemester + 1, cgpa: data.predictedCGPA, sgpa: data.predictedCGPA }]}
                    dataKeys={[
                        { key: 'cgpa', name: 'CGPA', color: '#6c5ce7' },
                    ]}
                />
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 8 }}>
                    Semester {data.currentSemester + 1} shows predicted value
                </p>
            </div>
        </div>
    );
}
