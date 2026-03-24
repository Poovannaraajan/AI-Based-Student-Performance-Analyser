import { useState } from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

export default function EarlyWarningBanner({ cgpa, threshold = 6.0 }) {
    const [dismissed, setDismissed] = useState(false);

    if (cgpa >= threshold || dismissed) return null;

    return (
        <div className="alert-banner alert-banner-danger animate-fade-in">
            <FiAlertTriangle size={20} />
            <div>
                <strong>Early Warning Alert:</strong> Predicted CGPA ({cgpa.toFixed(2)}) is below {threshold.toFixed(1)}.
                Immediate academic support is recommended. Please review your improvement plan and contact your advisor.
            </div>
            <button className="close-btn" onClick={() => setDismissed(true)}>
                <FiX />
            </button>
        </div>
    );
}
