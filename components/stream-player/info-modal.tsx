"use client";

import React, { useState, useTransition, useRef, ElementRef } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { updateStream } from "@/modules/dashboard/actions";
import { toast } from "sonner";
import { OurFileRouter, UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import Hint from "../ui/hint";
import { Trash } from "lucide-react";
import Image from "next/image";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

const InfoModal = ({ initialName, initialThumbnailUrl }: InfoModalProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const [thumbnail, setThumbnail] = useState(initialThumbnailUrl);
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState<string>(initialName);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success("Stream updated!");
          closeRef?.current?.click();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
    });
    closeRef?.current?.click();
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          setThumbnail("");
          toast.success("Thumbnail removed")
        })
        .catch(() => (toast.error("Something went wrong")))
    })

    closeRef.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"sm"} className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit stream info
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2">
            <Label>
              Name
            </Label>
            <Input
              onChange={onChange}
              placeholder="Stream name"
              value={name}
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Thumbnail
            </Label>
            {thumbnail ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-10">
                  <Hint asChild side="left" label="Remove thumbnail">
                    <Button type="button" disabled={isPending} onClick={onRemove} className="h-auto w-auto p-1.5">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  fill
                  alt="Thumbnail"
                  src={thumbnail}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone<OurFileRouter, "thumbnailUploader">
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#FFFFFF"
                    },
                    allowedContent: {
                      color: "#FFFFFF"
                    }
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnail(res?.[0].url);
                    router.refresh();
                  }}
                />
              </div>
            )}

            <div className="flex justify-between">
              <DialogClose ref={closeRef} asChild>
                <Button disabled={isPending} type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isPending} variant="primary" type="submit">
                Save
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InfoModal;