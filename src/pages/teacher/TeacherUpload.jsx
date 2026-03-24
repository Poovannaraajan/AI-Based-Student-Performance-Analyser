import FileUploadZone from '../../components/FileUploadZone';
import { FiInfo } from 'react-icons/fi';
import './TeacherPages.css';

export default function TeacherUpload() {
    const handleUpload = (data) => {
        console.log('Uploaded data:', data);
    };

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>📤 Upload Academic Data</h1>
            </div>

            <div className="alert-banner alert-banner-info" style={{ marginBottom: 'var(--space-lg)' }}>
                <FiInfo size={16} />
                Upload student marks, attendance, or assessment data in CSV or Excel format. The system will automatically validate and preprocess the data.
            </div>

            <FileUploadZone onUpload={handleUpload} />

            <div className="upload-instructions">
                <h3>📋 File Format Guidelines</h3>
                <ul>
                    <li>First row must contain column headers</li>
                    <li>Required columns: <strong>Student ID, Name, Subject, Marks, Attendance</strong></li>
                    <li>Marks should be numeric (0–100)</li>
                    <li>Attendance should be numeric percentage (0–100)</li>
                    <li>Missing values will be handled automatically by the preprocessing pipeline</li>
                    <li>Maximum file size: 10 MB</li>
                    <li>Accepted formats: <strong>.csv, .xlsx, .xls</strong></li>
                </ul>
            </div>
        </div>
    );
}
