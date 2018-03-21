import React from 'react';
import {Link} from "react-router";

export function CardTitle({title, onClick}) {
    return <div className="title" title={title} onClick={onClick}>
        {title}
        <div className="fader"></div>
    </div>
}

export function CardTitleLink({title, href}) {
    return <div className="card">
        <div className="title" title={title}>
            <Link to={href}>{title}</Link>
            <div className="fader"></div>
        </div>
    </div>
}