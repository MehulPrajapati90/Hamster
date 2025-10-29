"use client";

import { LoaderCircle } from "lucide-react";

interface LoaderCircleProps {
    label: string
}

const LoadingState = ({ label }: LoaderCircleProps) => {
    return (

        <div className="h-full flex flex-col space-y-4 justify-center items-center">
            <LoaderCircle className="h-10 w-10 text-muted-foreground animate-spin" />
            <p className="text-muted-foreground capitalize">
                {label}
            </p>
        </div>

    )
}

export default LoadingState;