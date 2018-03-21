import React from 'react';

const RootComponent = ({children}) =>
    <div>
        {children}
    </div>

RootComponent.displayName = 'RootComponent';

export default RootComponent;