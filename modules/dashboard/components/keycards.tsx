"use client";

import { Input } from "@/components/ui/input";
import CopyButton from "./copy-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface KeyCardsProps {
    value: string
}

const KeyCards = ({ value }: KeyCardsProps) => {
    const [show, setShow] = useState(false);
    return (
        <div className="rounded-xl bg-muted p-6 bg-zinc-900 border">
            <div className="flex items-start gap-x-4 md:gap-x-10">
                <p className="font-semibold text-[13px] md:text-[16px] shrink-0">
                    Stream Key
                </p>

                <div className="space-y-0.5 md:space-y-2 w-full">
                    <div className="w-full flex items-center gap-x-2">
                        <Input value={value || ""} type={show ? "text" : "password"} disabled placeholder="Stream Key"
                        className="text-[13px] md:text-[16px]"
                        />
                        <CopyButton value={value} />
                    </div>

                    <Button size={"sm"} onClick={() => setShow(!show)} variant={"link"} className="text-[11px] md:text-[13px]">
                        {show ? "Hide" : "Show"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default KeyCards;