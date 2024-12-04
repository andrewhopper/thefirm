import React, { useState } from 'react';

interface EventViewProps {
    event: object;
}

export default function EventView({ event }: EventViewProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div>
            {(() => {
                const eventStr = JSON.stringify(event);
                return isExpanded ? (
                    <div onClick={() => setIsExpanded(false)} style={{ cursor: 'pointer' }}>
                        {eventStr}
                        <div className="text-sm text-gray-500 mt-1">(Click to hide)</div>
                    </div>
                ) : (
                    <div onClick={() => setIsExpanded(true)} style={{ cursor: 'pointer' }}>
                        {eventStr.slice(0, 50)}... (Click to expand)
                    </div>
                );
            })()}
        </div>
    );
}