import React from 'react';


function Header({grade, children}) {
    switch (grade) {
        case "1":
            return <h1>{children}</h1>;
        case "2":
            return <h2>{children}</h2>;
        default:
            return <h3>{children}</h3>;

    }
}

export default Header;