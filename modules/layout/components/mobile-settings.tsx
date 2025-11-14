"use client";

import { Settings2 } from "lucide-react";
import { useMobileSettings } from "../store";

const MobileSettings = () => {
    const { setIsSettings } = useMobileSettings();
  return (
    <div className='md:hidden flex p-1.5 bg-red-500/20 rounded-full' onClick={setIsSettings}>
        <Settings2 size={18} />
    </div>
  )
}

export default MobileSettings;