"use client";

import qs from "query-string"
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Search, SearchIcon, X } from "lucide-react";

const Server = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const url = qs.stringifyUrl({
            url: "/search",
            query: { term: value },
        }, { skipEmptyString: true })

        router.push(url);
    }

    const onClear = () => {
        setValue("");
    }

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, []);

    return (
        <>
            <form onSubmit={onSubmit} className="justify-center items-center border rounded-[20px] shadow-2xl hidden lg:flex">
                <div className="flex justify-center items-center pl-5 relative gap-2">
                    <Search size={18} className="text-zinc-500" />
                    <Input ref={inputRef} className="shadow-none w-60 font-sans tracking-[-0.2px] px-3 focus-visible:ring-0 focus-visible:ring-offset-0
    focus:outline-none bg-transparent rounded-[30px] border border-[#f3f3f312] hover:border-0" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter username" />
                    {value && (
                        <div onClick={onClear} className="absolute right-0 text-zinc-500 p-1 hover:text-white rounded-full mr-2">
                            <X size={18} />
                        </div>
                    )}
                </div>
                <button disabled={!value} type="submit" className="py-2 px-5 transition-all ease-in-out duration-200 hover:bg-[#f3f3f310] rounded-[30px]">
                    <p className="text-white font-medium font-sans tracking-tight">Search</p>
                </button>
            </form>

            {/* Mobile */}
            <form onSubmit={onSubmit} className="justify-between items-center border rounded-[20px] shadow-2xl flex lg:hidden">
                <div className="flex justify-center items-center relative gap-2">
                    <Input ref={inputRef} className="shadow-none w-30 md:w-60 font-sans tracking-[-0.2px] px-5 pr-8 focus-visible:ring-0 focus-visible:ring-offset-0
    focus:outline-none bg-transparent rounded-[30px] border border-[#f3f3f312] hover:border-0 text-[13px] placeholder:text-[12px]" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter username" />
                    {value && (
                        <div onClick={onClear} className="absolute right-0 text-zinc-500 p-1 hover:text-white rounded-full mr-2">
                            <X size={18} />
                        </div>
                    )}
                </div>
                <button disabled={!value} type="submit" className="py-2 px-3 md:px-5 transition-all ease-in-out duration-200 hover:bg-[#f3f3f310] rounded-[30px]">
                    <Search size={15} className="text-zinc-500" />
                </button>
            </form>
        </>
    )
}

export default Server;