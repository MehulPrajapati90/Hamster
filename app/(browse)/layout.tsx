import Container from '@/modules/layout/components/container';
import Navbar from '@/modules/layout/components/navbar';
import Sidebar, { SideBarSkeleton } from '@/modules/layout/components/sidebar';
import React, { Suspense } from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className='flex h-full pt-20'>
                <Suspense fallback={<SideBarSkeleton />}>
                    <Sidebar />
                </Suspense>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default HomeLayout;