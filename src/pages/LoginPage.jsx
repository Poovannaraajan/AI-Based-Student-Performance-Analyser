import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiLock, FiLogIn, FiAlertCircle } from 'react-icons/fi';
import './LoginPage.css';

const roleHome = {
    student: '/student/dashboard',
    teacher: '/teacher/dashboard',
    admin: '/admin/dashboard',
    sysadmin: '/sysadmin/monitor',
};

export default function LoginPage() {
    const [universityId, setUniversityId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Small delay for UX
        await new Promise(r => setTimeout(r, 600));

        const result = login(universityId.trim(), password);
        setLoading(false);

        if (result.success) {
            navigate(roleHome[result.user.role] || '/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-bg-effects">
                <div className="bg-orb bg-orb-1" />
                <div className="bg-orb bg-orb-2" />
                <div className="bg-orb bg-orb-3" />
            </div>

            <div className="login-card card-glass animate-fade-in">
                <div className="login-header">
                    <span className="login-logo">🎓</span>
                    <h1>Welcome Back</h1>
                    <p>Student Performance Analyser</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="alert-banner alert-banner-danger" style={{ marginBottom: 16 }}>
                            <FiAlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <div className="input-group">
                        <label htmlFor="universityId">University ID</label>
                        <div className="input-with-icon">
                            <FiUser className="input-icon" />
                            <input
                                id="universityId"
                                className={`input-field ${error && !universityId ? 'input-error' : ''}`}
                                type="text"
                                placeholder="e.g., STU001"
                                value={universityId}
                                onChange={(e) => setUniversityId(e.target.value)}
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-with-icon">
                            <FiLock className="input-icon" />
                            <input
                                id="password"
                                className="input-field"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg login-btn" disabled={loading}>
                        {loading ? (
                            <div className="loading-spinner" style={{ width: 20, height: 20, borderWidth: 2, margin: 0 }} />
                        ) : (
                            <>
                                <FiLogIn size={18} />
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <div className="login-demo-creds">
                    <p className="demo-title">Demo Credentials</p>
                    <div className="demo-grid">
                        <button className="demo-cred" onClick={() => { setUniversityId('STU001'); setPassword('student123'); }}>
                            <span className="demo-role">Student</span>
                            <span className="demo-id">STU001</span>
                        </button>
                        <button className="demo-cred" onClick={() => { setUniversityId('STU002'); setPassword('student123'); }}>
                            <span className="demo-role">At-Risk Student</span>
                            <span className="demo-id">STU002</span>
                        </button>
                        <button className="demo-cred" onClick={() => { setUniversityId('TEA001'); setPassword('teacher123'); }}>
                            <span className="demo-role">Teacher</span>
                            <span className="demo-id">TEA001</span>
                        </button>
                        <button className="demo-cred" onClick={() => { setUniversityId('ADM001'); setPassword('admin123'); }}>
                            <span className="demo-role">Admin</span>
                            <span className="demo-id">ADM001</span>
                        </button>
                        <button className="demo-cred" onClick={() => { setUniversityId('SYS001'); setPassword('sysadmin123'); }}>
                            <span className="demo-role">Sys Admin</span>
                            <span className="demo-id">SYS001</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
