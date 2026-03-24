import { useAuth } from '../../context/AuthContext';
import { studentRecords } from '../../data/mockData';
import { FiDownload, FiFileText, FiCalendar, FiAward } from 'react-icons/fi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './StudentPages.css';

export default function StudentReports() {
    const { user } = useAuth();
    const data = studentRecords[user?.id] || studentRecords.STU001;

    const generatePDF = (semIndex) => {
        const sem = semIndex !== undefined ? data.semesters[semIndex] : null;
        const doc = new jsPDF();
        const title = sem ? `Semester ${sem.sem} Report` : 'Complete Academic Report';

        // Header
        doc.setFillColor(108, 92, 231);
        doc.rect(0, 0, 210, 35, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.text('Student Performance Analyser', 14, 15);
        doc.setFontSize(11);
        doc.text(title, 14, 25);

        // Student Info
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Student: ${user.name}`, 14, 45);
        doc.text(`Roll No: ${data.rollNo}`, 14, 53);
        doc.text(`Course: ${data.course}`, 14, 61);
        doc.text(`Risk Level: ${data.riskLevel}`, 14, 69);

        if (sem) {
            // Single semester
            doc.setFontSize(14);
            doc.text(`Semester ${sem.sem} Performance`, 14, 85);

            doc.autoTable({
                startY: 92,
                head: [['Metric', 'Value']],
                body: [
                    ['SGPA', sem.sgpa.toFixed(2)],
                    ['CGPA', sem.cgpa.toFixed(2)],
                    ['Attendance', `${sem.attendance}%`],
                    ['Assignments', `${sem.assignments}%`],
                ],
                theme: 'grid',
                headStyles: { fillColor: [108, 92, 231] },
            });
        } else {
            // All semesters
            doc.setFontSize(14);
            doc.text('All Semester Performance', 14, 85);

            doc.autoTable({
                startY: 92,
                head: [['Semester', 'SGPA', 'CGPA', 'Attendance', 'Assignments']],
                body: data.semesters.map(s => [
                    `Sem ${s.sem}`, s.sgpa.toFixed(2), s.cgpa.toFixed(2), `${s.attendance}%`, `${s.assignments}%`
                ]),
                theme: 'grid',
                headStyles: { fillColor: [108, 92, 231] },
            });

            // Subject performance
            const y = doc.lastAutoTable.finalY + 15;
            doc.setFontSize(14);
            doc.text('Subject Performance', 14, y);

            doc.autoTable({
                startY: y + 7,
                head: [['Subject', 'Score', 'Grade', 'Status']],
                body: data.subjects.map(s => [s.name, s.score, s.grade, s.status]),
                theme: 'grid',
                headStyles: { fillColor: [108, 92, 231] },
            });

            // Weak areas
            if (data.weakAreas.length > 0) {
                const y2 = doc.lastAutoTable.finalY + 15;
                doc.setFontSize(14);
                doc.text('Areas for Improvement', 14, y2);
                doc.setFontSize(10);
                data.weakAreas.forEach((area, i) => {
                    doc.text(`• ${area}`, 18, y2 + 10 + (i * 7));
                });
            }
        }

        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(`Generated on ${new Date().toLocaleDateString()} | Page ${i} of ${pageCount}`, 14, doc.internal.pageSize.height - 10);
        }

        doc.save(`${data.rollNo}_${sem ? `Sem${sem.sem}` : 'Complete'}_Report.pdf`);
    };

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>📄 Reports</h1>
                <button className="btn btn-primary" onClick={() => generatePDF()}>
                    <FiDownload size={16} />
                    Download Complete Report
                </button>
            </div>

            <div className="reports-list">
                {/* Complete Report */}
                <div className="report-item">
                    <div className="report-info">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <FiFileText color="var(--accent-primary-light)" />
                            Complete Academic Report
                        </h3>
                        <div className="report-meta">
                            <span><FiCalendar size={12} /> All {data.semesters.length} Semesters</span>
                            <span><FiAward size={12} /> CGPA: {data.currentCGPA.toFixed(2)}</span>
                        </div>
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={() => generatePDF()}>
                        <FiDownload size={14} /> PDF
                    </button>
                </div>

                {/* Per-semester Reports */}
                {data.semesters.map((sem, i) => (
                    <div key={i} className="report-item">
                        <div className="report-info">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <FiFileText color="var(--text-muted)" />
                                Semester {sem.sem} Report
                            </h3>
                            <div className="report-meta">
                                <span>SGPA: {sem.sgpa.toFixed(2)}</span>
                                <span>CGPA: {sem.cgpa.toFixed(2)}</span>
                                <span>Attendance: {sem.attendance}%</span>
                            </div>
                        </div>
                        <button className="btn btn-ghost btn-sm" onClick={() => generatePDF(i)}>
                            <FiDownload size={14} /> PDF
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
