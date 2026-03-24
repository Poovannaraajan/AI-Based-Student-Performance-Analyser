import { allStudents } from '../../data/mockData';
import DataTable from '../../components/DataTable';
import RiskBadge from '../../components/RiskBadge';
import './TeacherPages.css';

export default function TeacherStudents() {
    const columns = [
        { key: 'rollNo', label: 'Roll No' },
        { key: 'name', label: 'Student Name' },
        { key: 'course', label: 'Course' },
        { key: 'cgpa', label: 'CGPA', render: (val) => <span style={{ fontWeight: 600, color: val >= 6 ? 'var(--success)' : 'var(--error)' }}>{val.toFixed(2)}</span> },
        { key: 'attendance', label: 'Attendance', render: (val) => <span style={{ fontWeight: 500, color: val >= 75 ? 'var(--text-primary)' : 'var(--risk-high)' }}>{val}%</span> },
        { key: 'predictedCGPA', label: 'Predicted', render: (val) => <span style={{ color: val >= 6 ? 'var(--accent-secondary)' : 'var(--error)' }}>{val.toFixed(2)}</span> },
        { key: 'riskLevel', label: 'Risk', render: (val) => <RiskBadge level={val} compact /> },
    ];

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>👥 Students</h1>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {allStudents.length} students enrolled
                </span>
            </div>

            <div className="card">
                <DataTable columns={columns} data={allStudents} />
            </div>
        </div>
    );
}
