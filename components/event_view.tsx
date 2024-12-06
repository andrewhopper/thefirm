import React, { useState } from 'react';

interface EventViewProps {
    event: object;
}

export default function EventView({ event }: EventViewProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div>
            {(() => {
                return isExpanded ? (
                    <div onClick={() => setIsExpanded(false)} style={{ cursor: 'pointer' }}>
                        <h1>Event Viewer: {typeof event}</h1>
                        <pre>
                            {JSON.stringify(event)}

                        </pre>

                        <div className="text-sm text-gray-500 mt-1">(Click to hide)</div>
                    </div>
                ) : (
                    <div onClick={() => setIsExpanded(true)} style={{ cursor: 'pointer' }}>
                        <h1>Event Viewer: {typeof event}</h1>

                        {JSON.stringify(event).slice(0, 50)}... (Click to expand)

                    </div>
                );
            })()}
        </div>
    );
}