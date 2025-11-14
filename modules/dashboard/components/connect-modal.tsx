"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";

import { IngressInput } from "livekit-server-sdk";
import { useState, useRef, useTransition, ElementRef } from "react";
import { createIngress } from "@/actions/ingress";
import { toast } from "sonner";
import { useCreateIngress } from "../hooks/dashboard";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

const ConnectModal = () => {
    const [isTransitionPending, startTransition] = useTransition();
    const [ingressType, setIngressType] = useState<IngressType>(RTMP);
    const closeRef = useRef<ElementRef<"button">>(null);
    const { mutateAsync, data, isPending } = useCreateIngress();

    const onSubmit = async () => {
        startTransition(() => {
            mutateAsync(parseInt(ingressType))
                .then(() => {
                    toast.success("Ingress Created");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Rate limit try after 10'sec"))
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"primary"}>
                    Generate connection
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Generate connection
                    </DialogTitle>
                </DialogHeader>
                <Select
                    disabled={isPending}
                    value={ingressType}
                    onValueChange={(value) => setIngressType(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP}>RTMP</SelectItem>
                        <SelectItem value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This actions will reset all active streams using the current connection
                    </AlertDescription>
                </Alert>
                <div className="flex justify-between">
                    <DialogClose ref={closeRef} asChild>
                        <Button variant={"ghost"}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button disabled={isPending} onClick={onSubmit} variant={"primary"}>
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ConnectModal;