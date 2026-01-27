
import React from 'react';
import Maintenance from '@/pages/Maintenance';

// Maintenance Mode Toggle
const IS_MAINTENANCE_LOGIC_ENABLED = true;

const MaintenanceGuard = ({ children }: { children: React.ReactNode }) => {
    // If maintenance logic is disabled, show the app directly
    if (!IS_MAINTENANCE_LOGIC_ENABLED) {
        return <>{children}</>;
    }

    // Security: Maintenance Mode (only allow local access)
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

    if (!isLocal) {
        return <Maintenance />;
    }

    return <>{children}</>;
};

export default MaintenanceGuard;
