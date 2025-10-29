import { getSelfByUsername } from '@/modules/dashboard/actions';
import Container from '@/modules/dashboard/components/container';
import Navbar from '@/modules/dashboard/components/navbar';
import Sidebar from '@/modules/dashboard/components/sidebar';
import { redirect } from 'next/navigation';
import React from 'react'

interface DashboardLayoutProps {
    params: Promise<{
        username: string;
    }>
    children: React.ReactNode;
}

const DashboardLayout = async ({ children, params }: DashboardLayoutProps) => {
    const { username } = await params;

    const self = await getSelfByUsername(username);

    if (!self) {
        redirect('/');
    }

    return (
        <>
            <Navbar />
            <div className='flex h-full pt-20'>
                <Sidebar />
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default DashboardLayout;