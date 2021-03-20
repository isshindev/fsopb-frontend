import React from 'react';

export default function Notification({ data }) {
    return !data ? null : (
        <div className={`notification ${data.type}`}>
            {data.message}
        </div>
    );
}
