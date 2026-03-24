import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: '#1e2132',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            padding: '12px 16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}>
            <p style={{ color: '#8b8fa3', fontSize: '0.8rem', marginBottom: 4 }}>{label}</p>
            {payload.map((entry, i) => (
                <p key={i} style={{ color: entry.color, fontWeight: 600, fontSize: '0.95rem' }}>
                    {entry.name}: {entry.value}
                </p>
            ))}
        </div>
    );
};

export default function CGPALineChart({ data, dataKeys = [{ key: 'cgpa', name: 'CGPA', color: '#6c5ce7' }], xKey = 'sem', height = 280 }) {
    const formattedData = data.map(d => ({
        ...d,
        label: d[xKey]?.toString().startsWith('Sem') ? d[xKey] : `Sem ${d[xKey]}`,
    }));

    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={formattedData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                    {dataKeys.map(dk => (
                        <linearGradient key={dk.key} id={`grad-${dk.key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={dk.color} stopOpacity={0.3} />
                            <stop offset="100%" stopColor={dk.color} stopOpacity={0} />
                        </linearGradient>
                    ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="label" tick={{ fill: '#8b8fa3', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false} />
                <YAxis tick={{ fill: '#8b8fa3', fontSize: 12 }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                {dataKeys.map(dk => (
                    <Area key={dk.key} type="monotone" dataKey={dk.key} name={dk.name} stroke={dk.color} fill={`url(#grad-${dk.key})`} strokeWidth={2.5} dot={{ fill: dk.color, r: 4, strokeWidth: 2, stroke: '#1e2132' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                ))}
            </AreaChart>
        </ResponsiveContainer>
    );
}
