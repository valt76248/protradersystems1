import { Loader2 } from "lucide-react";

export const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background text-primary">
            <Loader2 className="h-12 w-12 animate-spin" />
        </div>
    );
};
