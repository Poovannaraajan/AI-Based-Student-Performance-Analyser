import './MetricsMonitor.css';
import { useState, useEffect } from 'react';
import { FiCpu, FiHardDrive, FiActivity, FiClock } from 'react-icons/fi';

function GaugeBar({ label, value, icon, color, unit = '%' }) {
    return (
        <div className="metrics-item">
            <div className="metrics-item-header">
                <span className="metrics-icon" style={{ color }}>{icon}</span>
                <span className="metrics-label">{label}</span>
                <span className="metrics-value" style={{ color }}>{value}{unit}</span>
            </div>
            <div className="metrics-bar-track">
                <div
                    className="metrics-bar-fill"
                    style={{
                        width: `${Math.min(value, 100)}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}88)`,
                        boxShadow: `0 0 10px ${color}33`,
                    }}
                />
            </div>
        </div>
    );
}

export default function MetricsMonitor({ metrics }) {
    const [liveMetrics, setLiveMetrics] = useState(metrics);

    useEffect(() => {
        const interval = setInterval(() => {
            setLiveMetrics(prev => ({
                ...prev,
                cpuUsage: Math.max(10, Math.min(95, prev.cpuUsage + (Math.random() * 10 - 5))),
                memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + (Math.random() * 6 - 3))),
                activeUsers: Math.max(50, Math.min(300, prev.activeUsers + Math.floor(Math.random() * 11 - 5))),
                requestsPerMinute: Math.max(40, Math.min(200, prev.requestsPerMinute + Math.floor(Math.random() * 21 - 10))),
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="metrics-monitor">
            <div className="metrics-gauges">
                <GaugeBar label="CPU Usage" value={Math.round(liveMetrics.cpuUsage)} icon={<FiCpu size={16} />} color="#6c5ce7" />
                <GaugeBar label="Memory" value={Math.round(liveMetrics.memoryUsage)} icon={<FiHardDrive size={16} />} color="#00cec9" />
                <GaugeBar label="Disk" value={liveMetrics.diskUsage} icon={<FiHardDrive size={16} />} color="#fdcb6e" />
            </div>

            <div className="metrics-stats">
                <div className="metrics-stat-card">
                    <FiActivity className="metrics-stat-icon" style={{ color: '#00b894' }} />
                    <div>
                        <div className="metrics-stat-value">{liveMetrics.uptime}</div>
                        <div className="metrics-stat-label">Uptime</div>
                    </div>
                </div>
                <div className="metrics-stat-card">
                    <FiClock className="metrics-stat-icon" style={{ color: '#74b9ff' }} />
                    <div>
                        <div className="metrics-stat-value">{liveMetrics.avgResponseTime}ms</div>
                        <div className="metrics-stat-label">Avg Response</div>
                    </div>
                </div>
                <div className="metrics-stat-card">
                    <FiActivity className="metrics-stat-icon" style={{ color: '#a29bfe' }} />
                    <div>
                        <div className="metrics-stat-value">{Math.round(liveMetrics.requestsPerMinute)}</div>
                        <div className="metrics-stat-label">Req/min</div>
                    </div>
                </div>
                <div className="metrics-stat-card">
                    <FiCpu className="metrics-stat-icon" style={{ color: '#e17055' }} />
                    <div>
                        <div className="metrics-stat-value">{liveMetrics.errorRate}%</div>
                        <div className="metrics-stat-label">Error Rate</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
