import { useAuth } from '../../context/AuthContext';
import { studentRecords } from '../../data/mockData';
import { FiTarget, FiBookOpen } from 'react-icons/fi';
import './StudentPages.css';

export default function StudentImprovementPlan() {
    const { user } = useAuth();
    const data = studentRecords[user?.id] || studentRecords.STU001;

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>📋 Improvement Plan</h1>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {data.weakAreas.length} area{data.weakAreas.length !== 1 ? 's' : ''} identified for improvement
                </span>
            </div>

            {data.weakAreas.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">🎉</div>
                    <h3>Great Performance!</h3>
                    <p>No weak areas identified. Keep up the excellent work!</p>
                </div>
            ) : (
                <div className="plan-list">
                    {data.improvementPlan.map((plan, i) => (
                        <div key={i} className="plan-card animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="plan-card-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <FiTarget style={{ color: 'var(--accent-primary-light)' }} />
                                    <span className="plan-subject">{plan.subject}</span>
                                </div>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    {plan.topics.length} topic{plan.topics.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            <div className="plan-topics">
                                {plan.topics.map((topic, j) => (
                                    <span key={j} className="plan-topic-tag">{topic}</span>
                                ))}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
                                <FiBookOpen size={14} />
                                Recommendations
                            </div>
                            <ul className="plan-suggestions">
                                {plan.suggestions.map((sug, j) => (
                                    <li key={j}>{sug}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
