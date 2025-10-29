"use client";

import qs from "query-string"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SearchIcon, X } from "lucide-react";

const Server = () => {
    const router = useRouter();
    const [value, setValue] = useState("");

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
    return (
        <form onSubmit={onSubmit} className="relative w-full lg-w-[400px] flex items-center">
            <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search" className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" />

            {value && (
                <X onClick={onClear} className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition" />
            )}

            <Button disabled={!value} type="submit" size={"sm"} variant={"secondary"} className="rounded-l-none cursor-pointer">
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </Button>
        </form>
    )
}

export default Server;