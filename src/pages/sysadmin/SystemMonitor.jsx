import { systemMetrics } from '../../data/mockData';
import MetricsMonitor from '../../components/MetricsMonitor';
import StatCard from '../../components/StatCard';
import { FiUsers, FiDatabase, FiServer, FiShield, FiClock } from 'react-icons/fi';
import './SysAdminPages.css';

export default function SystemMonitor() {
    const data = systemMetrics;

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>🖥️ System Monitor</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="live-indicator" />
                    <span style={{ color: 'var(--success)', fontWeight: 500, fontSize: '0.85rem' }}>Live</span>
                </div>
            </div>

            <div className="page-grid page-grid-4" style={{ marginBottom: 'var(--space-lg)' }}>
                <StatCard icon={<FiUsers size={22} />} label="Active Users" value={data.activeUsers} color="#6c5ce7" />
                <StatCard icon={<FiServer size={22} />} label="Server Version" value={data.serverVersion} color="#00cec9" />
                <StatCard icon={<FiDatabase size={22} />} label="Database Size" value={data.databaseSize} color="#fdcb6e" />
                <StatCard icon={<FiShield size={22} />} label="Last Backup" value={data.lastBackup.split(' ')[0]} color="#00b894" />
            </div>

            {/* Metrics Monitor */}
            <div className="chart-card" style={{ marginBottom: 'var(--space-lg)' }}>
                <div className="chart-card-header">
                    <span className="chart-card-title">System Resources</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Auto-refreshing every 3s</span>
                </div>
                <MetricsMonitor metrics={data} />
            </div>

            {/* System Logs */}
            <div className="chart-card">
                <div className="chart-card-header">
                    <span className="chart-card-title">Recent System Logs</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{data.logs.length} entries</span>
                </div>
                <div className="sys-logs">
                    {data.logs.map((log, i) => (
                        <div key={i} className={`sys-log-entry log-${log.level.toLowerCase()}`}>
                            <span className="log-time">{log.time}</span>
                            <span className={`log-level level-${log.level.toLowerCase()}`}>{log.level}</span>
                            <span className="log-message">{log.message}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
