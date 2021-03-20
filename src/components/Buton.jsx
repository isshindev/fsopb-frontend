import * as React from 'react';

export default function Button({ children, ...restProps }) {
    return (
        <button {...restProps}>{children}</button>
    );
}