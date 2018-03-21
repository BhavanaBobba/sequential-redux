import React from 'react';

const Header = ({children}) => (
    <div className="header-container">
        <div className="header">
            {children}
        </div>
    </div>
);

Header.Title = ({children}) => (
    <h2>{children}</h2>
);

Header.Toolbar = ({children}) => (
    <div className="toolbar">{children}</div>
);

export default Header;


