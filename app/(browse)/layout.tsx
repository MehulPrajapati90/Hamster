import Container from '@/modules/layout/components/container';
import MobileSettings from '@/modules/layout/components/mobile-settings-modal';
import Navbar from '@/modules/layout/components/navbar';
import Sidebar, { SideBarSkeleton } from '@/modules/layout/components/sidebar';
import React, { Suspense } from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div style={{
                background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(236, 72, 153, 0.25), transparent 70%), #000000",
            }} className="min-h-screen w-full relative bg-black">
                <Navbar />
                <div className='flex h-full pt-20 font-sans tracking-[-0.3px]'>
                    <Suspense fallback={<SideBarSkeleton />}>
                        <Sidebar />
                    </Suspense>
                    <Container>
                        {children}
                    </Container>
                </div>


                <MobileSettings />
            </div>
        </>
    )
}

export default HomeLayout;