import * as React from 'react';


export default function Form({ onSubmit, children }) {
    function handleOnSubmit(e) {
        e.preventDefault();
        onSubmit();
    }
    return (
        <form onSubmit={handleOnSubmit} >
            {children}
        </form>
    );
}