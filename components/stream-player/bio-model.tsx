"use client";

import React, { useRef, useState, useTransition, ElementRef } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { updateUser } from "@/modules/dashboard/actions";
import { toast } from "sonner";

interface BioModelProps {
    initialValue: string
}

const BioModel = ({ initialValue }: BioModelProps) => {
    const [value, setvalue] = useState(initialValue || '');
    const [isPending, startTransition] = useTransition();
    const CloseRef = useRef<ElementRef<"button">>(null)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateUser({ bio: value })
                .then(() => {
                    toast.success("Details updated successfully")
                    CloseRef.current?.click();
                })
                .catch(() => (toast.error("Something went wrong")))
        })
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"link"} size={"sm"} className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit user bio</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
                    <Textarea placeholder="User bio" onChange={(e) => setvalue(e.target.value)} value={value} disabled={isPending} className="resize-none">
                    </Textarea>

                    <div className="flex justify-between">
                        <DialogClose ref={CloseRef} asChild>
                            <Button disabled={isPending} className="" type="button" variant={"ghost"}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={isPending} type="submit" variant={"primary"}>
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default BioModel