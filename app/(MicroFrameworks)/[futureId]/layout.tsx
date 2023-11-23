import React from 'react';
import MicroFrameworkWrapper from './MicroFrameworkWrapper';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <MicroFrameworkWrapper>
                {children}
            </MicroFrameworkWrapper>
        </>
    )
}

export default layout