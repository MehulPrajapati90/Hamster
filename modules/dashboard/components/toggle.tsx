"use client";

import { useDashboardStore } from '../store'
import Hint from '@/components/ui/hint';
import { Button } from '@/components/ui/button';
import { PanelLeft, PanelRight } from 'lucide-react';

const Toggle = () => {
    const { collapsed, onCollapse, onExpand } = useDashboardStore();
    const label = collapsed ? "Expand" : "Collapse";
    return (
        <>
            {collapsed && (
                <div className='w-full hidden lg:flex items-center justify-center pt-4 mb-4'>
                    <Hint asChild label={label} side='right'>
                        <Button className='h-auto p-2' onClick={onExpand} variant={"ghost"}>
                            <PanelRight className='h-4 w-4' />
                        </Button>
                    </Hint>
                </div>
            )}

            {!collapsed && (
                <div className='p-3 pl-6 mb-2 hidden lg:flex items-center w-full'>
                    <p className='font-semibold text-primary'>
                        Dashoboard
                    </p>
                    <Hint label={label} side='right' asChild>
                        <Button onClick={onCollapse} variant={"ghost"} className='h-auto p-2 ml-auto'>
                            <PanelLeft className='h-4 w-4' />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    )
}

export default Toggle;