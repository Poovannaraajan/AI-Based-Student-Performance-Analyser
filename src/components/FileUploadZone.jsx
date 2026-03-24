import { useState, useRef } from 'react';
import { FiUploadCloud, FiFile, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';
import * as XLSX from 'xlsx';
import './FileUploadZone.css';

const ALLOWED_TYPES = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];
const ALLOWED_EXTENSIONS = ['.csv', '.xlsx', '.xls'];

export default function FileUploadZone({ onUpload }) {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState(null); // null | 'validating' | 'success' | 'error'
    const [message, setMessage] = useState('');
    const [preview, setPreview] = useState(null);
    const inputRef = useRef(null);

    const validateFile = (f) => {
        const ext = '.' + f.name.split('.').pop().toLowerCase();
        if (!ALLOWED_EXTENSIONS.includes(ext) && !ALLOWED_TYPES.includes(f.type)) {
            return 'Invalid Data Format — Please upload CSV or Excel file (.csv, .xlsx, .xls)';
        }
        if (f.size > 10 * 1024 * 1024) {
            return 'File too large — Maximum size is 10 MB';
        }
        return null;
    };

    const processFile = async (f) => {
        setFile(f);
        setStatus('validating');
        setMessage('Validating file format...');

        const error = validateFile(f);
        if (error) {
            setStatus('error');
            setMessage(error);
            return;
        }

        try {
            const data = await f.arrayBuffer();
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            if (jsonData.length < 2) {
                setStatus('error');
                setMessage('File is empty or has insufficient data');
                return;
            }

            setPreview({ headers: jsonData[0], rows: jsonData.slice(1, 6), totalRows: jsonData.length - 1 });
            setStatus('success');
            setMessage(`Successfully parsed ${jsonData.length - 1} records from ${f.name}`);
            if (onUpload) onUpload(jsonData);
        } catch {
            setStatus('error');
            setMessage('Failed to parse file — Please check the format');
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
    };

    const handleChange = (e) => {
        if (e.target.files?.[0]) processFile(e.target.files[0]);
    };

    const reset = () => {
        setFile(null);
        setStatus(null);
        setMessage('');
        setPreview(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <div className="upload-zone-wrapper">
            <div
                className={`upload-zone ${dragActive ? 'drag-active' : ''} ${status ? `upload-${status}` : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => !file && inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                />

                {!file ? (
                    <div className="upload-prompt">
                        <FiUploadCloud className="upload-icon" />
                        <p className="upload-text">Drag & drop your file here</p>
                        <p className="upload-subtext">or click to browse</p>
                        <p className="upload-formats">Accepted: CSV, Excel (.xlsx, .xls)</p>
                    </div>
                ) : (
                    <div className="upload-result">
                        <div className="upload-file-info">
                            <FiFile size={20} />
                            <span>{file.name}</span>
                            <span className="file-size">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                        <div className={`upload-status status-${status}`}>
                            {status === 'validating' && <div className="loading-spinner" style={{ width: 20, height: 20, borderWidth: 2 }} />}
                            {status === 'success' && <FiCheck size={18} />}
                            {status === 'error' && <FiAlertCircle size={18} />}
                            <span>{message}</span>
                        </div>
                        <button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); reset(); }}>
                            <FiX size={14} /> Upload Another
                        </button>
                    </div>
                )}
            </div>

            {preview && status === 'success' && (
                <div className="upload-preview card">
                    <h4>Preview ({preview.totalRows} total records)</h4>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="data-table">
                            <thead>
                                <tr>{preview.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
                            </thead>
                            <tbody>
                                {preview.rows.map((row, ri) => (
                                    <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell ?? '—'}</td>)}</tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {preview.totalRows > 5 && (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 8 }}>
                            Showing first 5 of {preview.totalRows} records
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
