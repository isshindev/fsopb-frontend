import React from "react";

function List({ children }) {
    return <ul>{children}</ul>;
}

List.Item = function ListItem({ children, ...restProps }) {
    return <li {...restProps}>{children}</li>;
}


export default List;