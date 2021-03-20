import React from 'react';


export default function Input({
    label,
    value,
    onTextChange
}) {
    function handleChanges(e) {
        onTextChange(e.target.value);
    }

    return (
        <div>
            {label} : <input type="text" value={value} onChange={handleChanges} />
        </div>
    );
}