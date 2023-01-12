import React from 'react'

interface WrapperProps {
    children: React.ReactNode;
    variant?: 'small' | 'regular';
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant = 'regular' }) => {
    return (
        <div className={`mt-8 mx-auto ${variant === 'regular' ? "max-w-3xl" : "max-w-sm"} w-full px-4`}>
            {children}
        </div>
    );
}