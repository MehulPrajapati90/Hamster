"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useMobileSettings } from '../store';
import { ArrowDownToLine, Settings2, LucideIcon, LayoutDashboard, Github, BookUser } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type NavigationType = {
    name: string,
    url: string,
    Icon: LucideIcon
}

const MobileSettings = () => {
    const data = useUser();
    console.log(data)
    const { user } = data;

    const [Navigation, setNavigation] = useState<NavigationType[]>(
        [
            {
                name: "Dashboard",
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/${user?.username}`,
                Icon: LayoutDashboard
            },
            {
                name: "GitHub",
                url: "https://github.com/MehulPrajapati90/Hamster",
                Icon: Github
            },
            {
                name: "Documentation",
                url: "https://www.notion.so/Hamster-29346f5bd6b880019228cea107805e33",
                Icon: BookUser
            }
        ]
    )

    const { isSettings, setIsSettings } = useMobileSettings();
    const handleCloseForm = () => {
        setIsSettings();
    }

    // const { isSignedIn } = data;
    // const { isLoaded } = data;


    // useEffect(() => {
    //     if (!isSignedIn) {
    //         const mutate = Navigation.filter(v => v.name !== "Dashboard");
    //         setNavigation(mutate);
    //     }
    // }, [user, isLoaded])

    return (
        <Dialog open={isSettings} onOpenChange={handleCloseForm}>
            <DialogContent className='sm:max-w-[400px]'>
                <DialogHeader className='w-full flex flex-col items-start'>
                    <DialogTitle className='flex items-center justify-center gap-1 font-sans'>
                        <span className='text-[22px]'>Menu</span>
                        <div className='p-1 bg-zinc-900 rounded-full flex items-center'>
                            <Settings2 size={14} />
                        </div>
                    </DialogTitle>

                    <DialogDescription className='text-[12.5px] leading-3'>
                        Find your things here
                    </DialogDescription>
                </DialogHeader>

                <div className='gap-3 h-[200px] pt-2 bg-zinc-900 px-2 py-2 overflow-y-auto hide-scrollbar rounded-[10px]'>
                    {Navigation.map((val, idx) => (
                        <Link onClick={handleCloseForm} href={val?.url} key={idx} className='w-full h-10 rounded-[5px] bg-zinc-950 my-2 flex items-center justify-between px-3 text-[#f3f3f3] font-sans font-medium'>
                            <val.Icon size={18} className='text-yellow-500' />
                            <p className='text-[12x] tracking-tight'>{val.name}</p>
                        </Link>
                    ))}
                </div>

                <div className='flex items-center text-zinc-400 gap-1 hover:underline'>
                    <p className='text-[13px]'>scroll down</p>
                    <ArrowDownToLine size={14} />
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default MobileSettings;