import './DashboardLayout.css';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const navConfig = {
    student: [
        { path: '/student/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/student/prediction', label: 'Prediction', icon: '🔮' },
        { path: '/student/improvement-plan', label: 'Improvement Plan', icon: '📋' },
        { path: '/student/reports', label: 'Reports', icon: '📄' },
    ],
    teacher: [
        { path: '/teacher/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/teacher/upload', label: 'Upload Data', icon: '📤' },
        { path: '/teacher/analytics', label: 'Analytics', icon: '📈' },
        { path: '/teacher/students', label: 'Students', icon: '👥' },
    ],
    admin: [
        { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/admin/audit', label: 'Audit Reports', icon: '📑' },
        { path: '/admin/users', label: 'Manage Users', icon: '👤' },
    ],
    sysadmin: [
        { path: '/sysadmin/monitor', label: 'System Monitor', icon: '🖥️' },
    ],
};

const roleLabels = {
    student: 'Student Portal',
    teacher: 'Faculty Portal',
    admin: 'Admin Portal',
    sysadmin: 'System Admin',
};

export default function DashboardLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const links = navConfig[user?.role] || [];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-layout">
            {/* Mobile menu toggle */}
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <span className="logo-icon">🎓</span>
                        <div>
                            <div className="logo-title">SPA</div>
                            <div className="logo-subtitle">Performance Analyser</div>
                        </div>
                    </div>
                </div>

                <div className="sidebar-role-badge">{roleLabels[user?.role]}</div>

                <nav className="sidebar-nav">
                    {links.map(link => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <span className="nav-icon">{link.icon}</span>
                            <span className="nav-label">{link.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="user-avatar">{user?.avatar}</div>
                        <div className="user-info">
                            <div className="user-name">{user?.name}</div>
                            <div className="user-id">{user?.id}</div>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <FiLogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

            {/* Main content */}
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}
