import { getSelfByUsername } from '@/modules/dashboard/actions';
import Container from '@/modules/dashboard/components/container';
// import Navbar from '@/modules/dashboard/components/navbar';
import Sidebar from '@/modules/dashboard/components/sidebar';
import MobileSettings from '@/modules/layout/components/mobile-settings-modal';
import Navbar from '@/modules/layout/components/navbar';
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
            <div style={{
                background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(236, 72, 153, 0.25), transparent 70%), #000000",
            }} className="min-h-screen w-full relative bg-black font-sans tracking-[-0.3px]">
                <Navbar />
                <div className='flex h-full pt-20'>
                    <Sidebar />
                    <Container>
                        {children}
                    </Container>
                </div>

                <MobileSettings />
            </div>
        </>
    )
}

export default DashboardLayout;