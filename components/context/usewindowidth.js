// WindowSizeProvider component
import React, { useState, useEffect } from 'react';

import WindowSizeContext from './Usecontext';

export const WindowSizeProvider = ({ children }) => {
    const [isSmallerDevice, setIsSmallerDevice] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsSmallerDevice(width < 500);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <WindowSizeContext.Provider value={isSmallerDevice}>
            {children}
        </WindowSizeContext.Provider>
    );
};
