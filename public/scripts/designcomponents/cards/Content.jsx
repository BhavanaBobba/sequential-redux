import React from 'react';

const Content = props => {

    return (
        <div className="content">
            <div className="name">{props.name}</div>
            <div className="value">{props.value}</div>
        </div>
    )
};

export default Content