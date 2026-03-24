import { useState } from 'react';
import { allUsersForAdmin } from '../../data/mockData';
import DataTable from '../../components/DataTable';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import './AdminPages.css';

export default function AdminUsers() {
    const [users, setUsers] = useState(allUsersForAdmin);
    const [showModal, setShowModal] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [form, setForm] = useState({ id: '', name: '', email: '', role: 'student', department: '' });

    const openAdd = () => {
        setEditUser(null);
        setForm({ id: '', name: '', email: '', role: 'student', department: '' });
        setShowModal(true);
    };

    const openEdit = (user) => {
        setEditUser(user);
        setForm({ id: user.id, name: user.name, email: user.email, role: user.role, department: user.department || '' });
        setShowModal(true);
    };

    const handleSave = () => {
        if (!form.id || !form.name || !form.email) return;
        if (editUser) {
            setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, ...form, avatar: form.name.split(' ').map(n => n[0]).join('') } : u));
        } else {
            setUsers(prev => [...prev, { ...form, status: 'Active', lastLogin: '—', avatar: form.name.split(' ').map(n => n[0]).join('') }]);
        }
        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (confirm('Remove this user?')) {
            setUsers(prev => prev.filter(u => u.id !== id));
        }
    };

    const columns = [
        { key: 'id', label: 'ID' },
        {
            key: 'name', label: 'Name', render: (val, row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: 'white', flexShrink: 0 }}>{row.avatar}</div>
                    {val}
                </div>
            )
        },
        { key: 'email', label: 'Email' },
        {
            key: 'role', label: 'Role', render: (val) => (
                <span className="badge" style={{ background: val === 'admin' ? 'rgba(108,92,231,0.12)' : val === 'teacher' ? 'rgba(0,206,201,0.12)' : val === 'sysadmin' ? 'rgba(253,203,110,0.12)' : 'rgba(255,255,255,0.05)', color: val === 'admin' ? '#a29bfe' : val === 'teacher' ? '#00cec9' : val === 'sysadmin' ? '#fdcb6e' : 'var(--text-secondary)', textTransform: 'capitalize' }}>
                    {val}
                </span>
            )
        },
        { key: 'department', label: 'Department' },
        {
            key: 'status', label: 'Status', render: (val) => (
                <span style={{ color: val === 'Active' ? 'var(--success)' : 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>● {val}</span>
            )
        },
        {
            key: 'id', label: 'Actions', sortable: false, render: (_, row) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => openEdit(row)} title="Edit"><FiEdit2 size={14} /></button>
                    <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(row.id)} title="Delete" style={{ color: 'var(--error)' }}><FiTrash2 size={14} /></button>
                </div>
            )
        },
    ];

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>👤 Manage Users</h1>
                <button className="btn btn-primary" onClick={openAdd}>
                    <FiPlus size={16} />
                    Add User
                </button>
            </div>

            <div className="card">
                <DataTable columns={columns} data={users} pageSize={8} />
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editUser ? 'Edit User' : 'Add New User'}</h2>
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)}><FiX size={18} /></button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                            <div className="input-group">
                                <label>University ID</label>
                                <input className="input-field" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} disabled={!!editUser} placeholder="e.g., STU006" />
                            </div>
                            <div className="input-group">
                                <label>Full Name</label>
                                <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter full name" />
                            </div>
                            <div className="input-group">
                                <label>Email</label>
                                <input className="input-field" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter email" />
                            </div>
                            <div className="input-group">
                                <label>Role</label>
                                <select className="select-field" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="admin">Admin</option>
                                    <option value="sysadmin">System Admin</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Department</label>
                                <input className="input-field" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="Enter department" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSave}>
                                {editUser ? 'Save Changes' : 'Add User'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
