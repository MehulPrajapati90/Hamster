"use client";

import { Input } from "@/components/ui/input";
import CopyButton from "./copy-button";

interface UrlCardsProps {
    value?: string
}

const UrlCards = ({ value }: UrlCardsProps) => {
    return (
        <div className="rounded-xl p-6 bg-zinc-900 border">
            <div className="flex items-center gap-x-5 md:gap-x-10">
                <p className="font-semibold text-[13px] md:text-[16px] shrink-0">
                    Server URL
                </p>
                <div className="space-y-2 w-full">
                    <div className="w-full flex items-center gap-x-2">
                        <Input
                            value={value}
                            disabled
                            placeholder="Server Url"
                            className="text-[13px] md:text-[16px]"
                        />

                        <CopyButton
                            value={value}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UrlCards;