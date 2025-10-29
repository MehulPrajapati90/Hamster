"use client";

import React from 'react'
import SidebarWrapper from './sidebar-wrapper';
import Toggle from './toggle';
import Navigation from './navigation';

const Sidebar = () => {
    return (
        <SidebarWrapper>
            <Toggle />
            <Navigation />
        </SidebarWrapper>
    )
}

export default Sidebar;