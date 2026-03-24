import { useState } from 'react';
import { auditReports } from '../../data/mockData';
import { FiDownload, FiCalendar } from 'react-icons/fi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './AdminPages.css';

export default function AdminAudit() {
    const [selectedYear, setSelectedYear] = useState(auditReports[0]?.year);
    const report = auditReports.find(r => r.year === selectedYear);

    const generatePDF = () => {
        if (!report) return;
        const doc = new jsPDF();

        // Header
        doc.setFillColor(108, 92, 231);
        doc.rect(0, 0, 210, 35, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.text('Institution Audit Report', 14, 15);
        doc.setFontSize(12);
        doc.text(`Academic Year ${report.year}`, 14, 25);

        // Report Info
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text(`Generated: ${report.generated}`, 14, 45);

        // Summary Table
        doc.autoTable({
            startY: 55,
            head: [['Metric', 'Value']],
            body: [
                ['Total Students Enrolled', report.totalStudents.toLocaleString()],
                ['Overall Pass Rate', `${report.passRate}%`],
                ['Average CGPA', report.avgCGPA.toFixed(1)],
                ['At-Risk Students', report.atRiskCount.toLocaleString()],
                ['Interventions Conducted', report.interventions],
            ],
            theme: 'grid',
            headStyles: { fillColor: [108, 92, 231] },
        });

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Confidential — Generated on ${new Date().toLocaleDateString()}`, 14, doc.internal.pageSize.height - 10);

        doc.save(`Audit_Report_${report.year}.pdf`);
    };

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>📑 Audit Reports</h1>
            </div>

            <div className="audit-controls">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FiCalendar color="var(--text-secondary)" />
                    <select className="select-field" value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                        {auditReports.map(r => (
                            <option key={r.year} value={r.year}>{r.year}</option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-primary" onClick={generatePDF}>
                    <FiDownload size={16} />
                    Export PDF
                </button>
            </div>

            {report && (
                <div className="audit-report-card animate-fade-in">
                    <h2 style={{ marginBottom: 4 }}>Audit Summary — {report.year}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 'var(--space-lg)' }}>
                        Generated on {report.generated}
                    </p>
                    <div className="audit-stats-grid">
                        <div className="audit-stat">
                            <div className="audit-stat-value">{report.totalStudents.toLocaleString()}</div>
                            <div className="audit-stat-label">Total Students</div>
                        </div>
                        <div className="audit-stat">
                            <div className="audit-stat-value" style={{ color: 'var(--success)' }}>{report.passRate}%</div>
                            <div className="audit-stat-label">Pass Rate</div>
                        </div>
                        <div className="audit-stat">
                            <div className="audit-stat-value" style={{ color: 'var(--accent-primary-light)' }}>{report.avgCGPA.toFixed(1)}</div>
                            <div className="audit-stat-label">Avg CGPA</div>
                        </div>
                        <div className="audit-stat">
                            <div className="audit-stat-value" style={{ color: 'var(--risk-high)' }}>{report.atRiskCount}</div>
                            <div className="audit-stat-label">At-Risk</div>
                        </div>
                        <div className="audit-stat">
                            <div className="audit-stat-value" style={{ color: 'var(--accent-secondary)' }}>{report.interventions}</div>
                            <div className="audit-stat-label">Interventions</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Historical Table */}
            <div className="card">
                <h3 style={{ marginBottom: 'var(--space-md)' }}>Historical Reports</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Generated</th>
                            <th>Students</th>
                            <th>Pass Rate</th>
                            <th>Avg CGPA</th>
                            <th>At-Risk</th>
                            <th>Interventions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auditReports.map((r, i) => (
                            <tr key={i} style={{ cursor: 'pointer', background: r.year === selectedYear ? 'rgba(108,92,231,0.05)' : undefined }} onClick={() => setSelectedYear(r.year)}>
                                <td style={{ fontWeight: 600 }}>{r.year}</td>
                                <td style={{ color: 'var(--text-muted)' }}>{r.generated}</td>
                                <td>{r.totalStudents.toLocaleString()}</td>
                                <td style={{ color: 'var(--success)' }}>{r.passRate}%</td>
                                <td>{r.avgCGPA.toFixed(1)}</td>
                                <td style={{ color: 'var(--risk-high)' }}>{r.atRiskCount}</td>
                                <td>{r.interventions}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
