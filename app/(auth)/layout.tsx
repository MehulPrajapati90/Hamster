import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-auto flex items-center justify-center bg-[#101114]'>
            {children}
        </div>
    )
}

export default AuthLayout;