
import React from 'react';
import Maintenance from '@/pages/Maintenance';

const MaintenanceGuard = ({ children }: { children: React.ReactNode }) => {
    // Security: Maintenance Mode
    // If we are NOT on localhost (or 127.0.0.1), show the maintenance page.
    // This effectively blocks public access on the deployed domain.
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

    if (!isLocal) {
        return <Maintenance />;
    }

    return <>{children}</>;
};

export default MaintenanceGuard;
